import { Request, Response } from 'express';
import userService from '../services/userService';
import HandleToken from '../utils/handleToken';

import { getUserBalanceSchema, UserRegister, UserRegisterSchema } from '../interfaces/IUser';
import {
  getTransactionSchema, IGetTransactionBody, IMakeTransactionBody, transactionBodySchema,
} from '../interfaces/ITransaction';

const userController = {
  register: async (req: Request, res: Response): Promise<Response> => {
    const { username, password }: UserRegister = req.body;
    await UserRegisterSchema.parseAsync({ username, password });
    const newUser = await userService.register({ username, password });
    const token = HandleToken.encode(newUser);
    return res.status(201).json({ token });
  },

  login: async (req: Request, res: Response): Promise<Response> => {
    const { username, password }: UserRegister = req.body;
    await UserRegisterSchema.parseAsync({ username, password });
    const token = await userService.login({ username, password });
    return res.status(200).json({ token });
  },

  getUserBalance: async (req: Request, res: Response): Promise<Response> => {
    const { accountId, username } = req.user;
    await getUserBalanceSchema.parseAsync({ accountId, username });
    const balance = await userService.getUserBalance(username, accountId);
    return res.status(200).json({ balance });
  },

  getUserByAccountId: async (req: Request, res: Response): Promise<Response> => {
    const { accountId } = req.user;
    const user = await userService.getUserByAccountId(accountId);
    return res.status(200).json({ user });
  },

  makeTransaction: async (req: Request, res: Response): Promise<Response> => {
    const { accountId, username } = req.user;
    const { value, targetUsername }: IMakeTransactionBody = req.body;
    await transactionBodySchema.parseAsync({ username, accountId, value, targetUsername });
    const transaction = await userService
      .makeTransaction({ username, targetUsername, value, accountId });
    return res.status(200).json(transaction);
  },

  getTransactions: async (req: Request, res: Response): Promise<Response> => {
    const { accountId, username } = req.user;
    const { type, date }: IGetTransactionBody = req.body;
    await getTransactionSchema.parseAsync({ type, date });
    const transactions = await userService.getTransactions({ username, accountId, type, date });
    return res.status(200).json(transactions);
  },
};

export default userController;
