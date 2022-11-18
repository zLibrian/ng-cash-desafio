export interface IError {
  [key: string]: { message: string, code: number }
}

const errorMap: IError = {
  usernameAlreadyInUse: { message: 'Username already in use', code: 409 },
  permissionDenied: { message: 'Permission denied', code: 403 },
  invalidCredentials: { message: 'Incorrect email or password', code: 401 },
  tokenNotFound: { message: 'Token was not found', code: 401 },
  userNotFound: { message: 'User not found', code: 404 },
  accountNotFound: { message: 'Account not found', code: 404 },
  insufficientFunds: { message: 'Insufficient funds', code: 400 },
  invalidTarget: { message: 'Cannot make a transaction to yourself', code: 400 },
  invalidType: { message: 'Invalid type of transaction', code: 400 },
};

export default errorMap;
