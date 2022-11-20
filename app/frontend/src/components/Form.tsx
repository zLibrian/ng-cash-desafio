import { yupResolver } from '@hookform/resolvers/yup';
import { FormHTMLAttributes } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loginSchema, { LoginValues } from '../schemas/loginSchema';
import { Button } from './Button';
import { Input } from './Input';

interface FormProps extends FormHTMLAttributes<HTMLInputElement> {
  handleSubmit: SubmitHandler<LoginValues>;
  buttonLabel: string;
  children?: React.ReactNode;
}

const Form = (props: FormProps) => {
  const { register, handleSubmit, formState } = useForm<LoginValues>({
    mode: 'onChange',
    resolver: yupResolver(loginSchema),
  });
  const { errors } = formState;

  return (
    <form
      onSubmit={handleSubmit(props.handleSubmit)}
      className="flex flex-col items-center gap-2 w-full"
    >
      <Input
        label="Nome de usuário:"
        placeholder="Digite seu usuário"
        error={errors.username}
        {...register('username')}
      />
      <Input
        label="Senha:"
        placeholder="Digite sua senha"
        {...register('password')}
        error={errors.password}
        type="password"
      />
      <Button
        text={props.buttonLabel}
        type="submit"
        className="mt-6 bg-purple-700"
        disabled={!formState.isValid}
      />
      {props.children}
      <ToastContainer autoClose={3000} theme="dark" pauseOnHover={false} />
    </form>
  );
};

export default Form;
