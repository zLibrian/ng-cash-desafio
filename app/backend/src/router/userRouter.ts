import express from 'express';
import userController from '../controllers/userController';
import HandleAuth from '../middleware/HandleAuth';

const userRouter = express.Router();

userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.get('/user/balance', HandleAuth.handleAuthorization, userController.getUserBalance);

export default userRouter;
