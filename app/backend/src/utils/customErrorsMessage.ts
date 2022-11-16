export interface IError {
  [key: string]: { message: string, code: number }
}

const errorMap: IError = {
  usernameAlreadyInUse: { message: 'Username already in use', code: 409 },
};

export default errorMap;
