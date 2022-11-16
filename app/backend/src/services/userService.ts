import { Sequelize } from 'sequelize';
import * as config from '../database/config/config';
import Account from '../database/models/Account';
import User from '../database/models/User';
import { User as IUser, UserCreateResponse, UserRegister } from '../interfaces/IUser';
import handleEncrypt from '../utils/handleEncrypt';
import HandleToken from '../utils/handleToken';

const sequelize = new Sequelize(config);

const userService = {
  usernameExists: async (username: string): Promise<void> => {
    const user = await User.findOne({ where: { username } });
    if (user) throw new Error('usernameAlreadyInUse');
  },

  userExists: async (username: string): Promise<User | null> => {
    const user = await User.findOne({ where: { username } });
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
      const { id: accountId } = await Account.create({ balance: 700.09 }, { transaction: t });
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

  getUserBalance: async (username: string, accountId: number): Promise<number> => {
    const user = await userService.userExists(username);
    if (!user || user.accountId !== accountId) throw new Error('permissionDenied');
    const account = await Account.findOne({ where: { id: accountId } });
    if (!account) throw new Error('userNotFound');
    const { balance } = account;
    return balance;
  },
};

export default userService;
