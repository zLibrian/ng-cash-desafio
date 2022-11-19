import * as yup from 'yup';

const REGEX_PASSWORD = /((?=.*\d)(?=.*[A-Z])(?=.*\W).{8,})/gm

const loginSchema = yup.object().shape({
  username: yup.string().required('Nome de usuário é obrigatório').min(3, 'Nome de usuário deve conter ao menos 3 caracteres'),
  password: yup.string().required('Senha é obrigatório').min(8, 'Senha deve conter ao menos 8 caracteres').matches(REGEX_PASSWORD, 'Senha deve conter 1 letra maiúscula, 1 número e 1 caractere especial')
});

export type LoginValues = {
  username: string;
  password: string;
};

export default loginSchema;