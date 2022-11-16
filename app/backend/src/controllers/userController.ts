import { Request, Response } from 'express';
import { getUserBalanceSchema, UserRegister, UserRegisterSchema } from '../interfaces/IUser';
import userService from '../services/userService';

const userController = {
  register: async (req: Request, res: Response): Promise<Response> => {
    const { username, password }: UserRegister = req.body;
    await UserRegisterSchema.parseAsync({ username, password });
    const newUser = await userService.register({ username, password });
    return res.status(201).json(newUser);
  },
  login: async (req: Request, res: Response): Promise<Response> => {
    const { username, password }: UserRegister = req.body;
    await UserRegisterSchema.parseAsync({ username, password });
    const token = await userService.login({ username, password });
    return res.status(200).json({ token });
  },

  getUserBalance: async (req: Request, res: Response): Promise<Response> => {
    const { accountId, username } = req.body;
    await getUserBalanceSchema.parseAsync({ accountId, username });
    const balance = await userService.getUserBalance(username, accountId);
    return res.status(200).json({ balance });
  },
};

export default userController;
