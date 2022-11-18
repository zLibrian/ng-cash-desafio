import { Op, Sequelize } from 'sequelize';
import * as config from '../database/config/config';
import Account from '../database/models/Account';
import TransactionModel from '../database/models/Transaction';

import { IAccountCreateTransaction, IAccountTransaction } from '../interfaces/IAccount';
import { AccTransaction, ITransactionType } from '../interfaces/ITransaction';

const sequelize = new Sequelize(config);

const accountService = {
  getBalance: async (accountId: number) => {
    const account = await Account.findByPk(accountId);
    if (!account) throw new Error('accountNotFound');
    return account;
  },

  createTransaction: async (
    { creditedAccountId, debitedAccountId, value, t }: IAccountCreateTransaction,
  ): Promise<TransactionModel> => TransactionModel.create(
    {
      creditedAccountId,
      debitedAccountId,
      value,
    },
    { transaction: t },
  ),

  makeTransaction: async ({ accountId, targetId, value }: IAccountTransaction): AccTransaction =>
    sequelize.transaction(async (t) => {
      const [userAccount, targetUserAccount] = await Promise.all([
        accountService.getBalance(accountId),
        accountService.getBalance(targetId),
      ]);
      await Promise.all([
        userAccount.decrement('balance', { by: value, transaction: t }),
        targetUserAccount.increment('balance', { by: value, transaction: t }),
      ]);
      const newTransaction = await accountService.createTransaction({
        creditedAccountId: targetId,
        debitedAccountId: accountId,
        value,
        t,
      });
      const { id: _, ...transactionWithoutId } = newTransaction.toJSON();
      return transactionWithoutId;
    }),

  getAllTransactions: async (accountId: number) => {
    const allTransactions = await TransactionModel.findAll({
      where: {
        [Op.or]: [
          { creditedAccountId: accountId },
          { debitedAccountId: accountId },
        ],
      },
    });
    return allTransactions;
  },

  getTransactionByType: async (accountId: number, type: ITransactionType) => {
    if (type === 'all') {
      return accountService.getAllTransactions(accountId);
    }
    const transactionType = {
      cashIn: 'creditedAccountId',
      cashOut: 'debitedAccountId',
    };
    const transactions = await TransactionModel.findAll({
      where: {
        [transactionType[type]]: accountId,
      },
    });
    return transactions;
  },
};

export default accountService;
