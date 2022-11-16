export interface IError {
  [key: string]: { message: string, code: number }
}

const errorMap: IError = {
  usernameAlreadyInUse: { message: 'Username already in use', code: 409 },
  permissionDenied: { message: 'Permission denied', code: 403 },
  invalidCredentials: { message: 'Incorrect email or password', code: 401 },
  tokenNotFound: { message: 'Token was not found', code: 401 },
  'invalid token': { message: 'Token must be a valid token', code: 401 },
  userNotFound: { message: 'User not found', code: 404 },
};

export default errorMap;
