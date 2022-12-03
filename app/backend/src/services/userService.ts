import { Sequelize } from 'sequelize';
import * as config from '../database/config/config';
import Account from '../database/models/Account';
import User from '../database/models/User';
import { IGetTransaction, ITransactionBody } from '../interfaces/ITransaction';
import { User as IUser, UserCreateResponse, UserRegister } from '../interfaces/IUser';
import handleEncrypt from '../utils/handleEncrypt';
import HandleToken from '../utils/handleToken';
import accountService from './Account';

const sequelize = new Sequelize(config);

const userService = {
  usernameExists: async (username: string): Promise<void> => {
    const user = await User.findOne({ where: { username } });
    if (user) throw new Error('usernameAlreadyInUse');
  },

  userExists: async (username: string): Promise<User> => {
    const user = await User.findOne({ where: { username } });
    if (!user) throw new Error('userNotFound');
    return user;
  },

  verifyCredentials: async (username: string, password: string): Promise<User> => {
    const user = await userService.userExists(username);
    if (!user) throw new Error('invalidCredentials');
    const { password: encryptedPassword } = user;
    const isPasswordCorrect = await handleEncrypt.compare(password, encryptedPassword);
    if (!isPasswordCorrect) throw new Error('invalidCredentials');
    return user;
  },

  register: async ({ username, password }: UserRegister): Promise<UserCreateResponse> => {
    await userService.usernameExists(username);
    const newUser = await sequelize.transaction(async (t): Promise<UserCreateResponse> => {
      const { id: accountId } = await Account.create({}, { transaction: t });
      const hashedPassword = await handleEncrypt.encrypt(password);
      const user = await User.create(
        { username, password: hashedPassword, accountId },
        { transaction: t, raw: true },
      );
      const { password: _, ...userWithoutPassword }: IUser = user.toJSON();
      return userWithoutPassword;
    });
    return newUser;
  },

  login: async ({ username, password }: UserRegister) => {
    const user = await userService.verifyCredentials(username, password);
    const { password: _, ...userWithoutPassword }: IUser = user.toJSON();
    const token = HandleToken.encode(userWithoutPassword);
    return token;
  },

  isUserAllowed: async (username: string, accountId: number): Promise<void> => {
    const user = await userService.userExists(username);
    if (user.accountId !== accountId) throw new Error('permissionDenied');
  },

  getUserBalance: async (username: string, accountId: number): Promise<number> => {
    await userService.isUserAllowed(username, accountId);
    const account = await accountService.getBalance(accountId);
    const { balance } = account;
    return +balance;
  },

  getUserByAccountId: async (accountId: number): Promise<User> => {
    const user = await User.findOne({ where: { accountId } });
    if (!user) throw new Error('userNotFound');
    return user;
  },

  makeTransaction: async ({ username, targetUsername, value, accountId }: ITransactionBody) => {
    if (username === targetUsername) throw new Error('invalidTarget');
    const [user, { accountId: targetId }] = await Promise.all([
      userService.userExists(username),
      userService.userExists(targetUsername),
    ]);
    if (user.accountId !== accountId) throw new Error('permissionDenied');
    const transaction = await accountService.makeTransaction({ accountId, targetId, value });

    return transaction;
  },

  getTransactions: async ({ username, accountId, type, date }: IGetTransaction) => {
    await userService.isUserAllowed(username, accountId);
    const transactions = await accountService.getTransactionByType(accountId, type);
    const filteredTransactions = date ? transactions.filter((transaction) =>
      transaction.createdAt.toISOString().includes(date)) : transactions;

    const formattedTransactions = filteredTransactions.map(async (transaction) => {
      const { creditedAccountId, debitedAccountId } = transaction;
      const targetUser = await userService.getUserByAccountId(creditedAccountId);
      const user = await userService.getUserByAccountId(debitedAccountId);
      return {
        data: transaction.createdAt.toLocaleDateString('pt-BR'),
        contaCreditada: targetUser.username,
        contaDebitada: user.username,
        valor: +transaction.value,
        id: transaction.id,
      };
    });

    return Promise.all(formattedTransactions);
  },
};

export default userService;
