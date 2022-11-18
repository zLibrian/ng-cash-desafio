import { NextFunction, Request, Response } from 'express';
import IJwtPayload from '../interfaces/IJwtPayload';
import HandleToken from '../utils/handleToken';

const HandleAuth = async (req: Request, _res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) throw new Error('tokenNotFound');
  const { payload }: IJwtPayload = HandleToken.decode(authorization);
  if (!payload) throw new Error('invalidToken');
  req.user = payload;
  next();
};

export default HandleAuth;
