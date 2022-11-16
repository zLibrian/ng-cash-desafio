import * as jwt from 'jsonwebtoken';
import IJwtPayload from '../interfaces/IJwtPayload';

const HandleToken = {
  encode: (data: jwt.JwtPayload): string => {
    const options: jwt.SignOptions = {
      expiresIn: '1d',
      algorithm: 'HS256',
    };
    const encoded = jwt.sign({ payload: data }, process.env.JWT_SECRET || 'jwt_secret', options);
    return encoded;
  },

  decode: (hash: string): IJwtPayload => {
    const encoded = jwt.verify(hash, process.env.JWT_SECRET || 'jwt_secret');
    return encoded as IJwtPayload;
  },
};

export default HandleToken;
