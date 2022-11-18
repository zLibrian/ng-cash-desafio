import { Jwt } from 'jsonwebtoken';
import { UserCreateResponse } from './IUser';

export default interface IJwtPayload extends Jwt {
  payload: UserCreateResponse
}
