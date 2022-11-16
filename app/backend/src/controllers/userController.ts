import { Request, Response } from 'express';
import { UserRegister, UserRegisterSchema } from '../interfaces/IUser';
import userService from '../services/userService';

const userController = {
  register: async (req: Request, res: Response): Promise<Response> => {
    const { username, password }: UserRegister = req.body;
    await UserRegisterSchema.parseAsync({ username, password });
    const newUser = await userService.register({ username, password });
    return res.status(201).json(newUser);
  },
};

export default userController;
