import express from 'express';
import userController from '../controllers/userController';
import { ReqUser } from '../interfaces/IUser';
import HandleAuth from '../middleware/HandleAuth';

const userRouter = express.Router();

declare module 'express-serve-static-core' {
  interface Request {
    user: ReqUser
  }
}

userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);

userRouter.get('/user/balance', HandleAuth, userController.getUserBalance);
userRouter.post('/user/transactions', HandleAuth, userController.getTransactions);

userRouter.post('/user/transaction', HandleAuth, userController.makeTransaction);

export default userRouter;
