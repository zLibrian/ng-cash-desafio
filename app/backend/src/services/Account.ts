import { Op, Sequelize } from 'sequelize';
import * as config from '../database/config/config';
import Account from '../database/models/Account';
import TransactionModel from '../database/models/Transaction';

const sequelize = new Sequelize(config);
const accountService = {
  getBalance: async (accountId: number) => {
    const account = await Account.findByPk(accountId);
    if (!account) throw new Error('accountNotFound');
    return account;
  },

};

export default accountService;
