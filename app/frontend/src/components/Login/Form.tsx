import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loginSchema, { LoginValues } from '../../schemas/loginSchema';
import api from '../../services/api';
import { Button } from '../Button';
import { Input } from '../Input';

const Form = () => {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<LoginValues>({
    mode: 'onChange',
    resolver: yupResolver(loginSchema),
  });
  const { errors } = formState;

  const handleLogin: SubmitHandler<LoginValues> = async (formData) => {
    await api
      .post('/login', formData)
      .then((response) => {
        toast.success('Login realizado com sucesso!');
        localStorage.setItem('token', response.data.token);
        const intervalId = setTimeout(() => {
          router.push('/dashboard');
        }, 3000);
        return () => clearTimeout(intervalId);
      })
      .catch(() => {
        return toast.error('Usuário ou senha inválidos');
      });
  };

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className="flex flex-col items-center gap-2 w-full"
    >
      <div className="text-center mb-2">
        <p className="font-black text-3xl text-white pb-1">
          Faça login na sua conta
        </p>
        <span className="text-white/70 text-base">é para todas as idades!</span>
      </div>

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
        text="Login"
        type="submit"
        className="mt-6 bg-purple-700"
        disabled={!formState.isValid}
      />
      <div className="flex flex-col items-center gap-2 mt-4">
        <p className="text-white/70 text-sm">
          Esqueceu sua senha? <span className="text-white">Clique aqui</span>
        </p>
        <p className="text-white/70 text-sm">
          Não possui uma conta?{' '}
          <Link href="/register" className="text-white">
            Registre-se agora!
          </Link>
        </p>
      </div>
      <ToastContainer autoClose={3000} theme="dark" pauseOnHover={false} />
    </form>
  );
};

export default Form;
