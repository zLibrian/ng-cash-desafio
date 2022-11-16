import { Jwt } from 'jsonwebtoken';

export default interface IJwtPayload extends Jwt {
  payload: {
    id: number,
    role: string,
    email: string,
  }
}
