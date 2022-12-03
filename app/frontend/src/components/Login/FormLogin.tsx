import Link from 'next/link';
import Router from 'next/router';
import nookies from 'nookies';
import { SubmitHandler } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from '../../components/Form';
import { useDashboard } from '../../context/DashboardProvider';
import { LoginValues } from '../../schemas/loginSchema';
import api from '../../services/api';

const FormLogin = () => {
  const { setUsername } = useDashboard();

  const handleLogin: SubmitHandler<LoginValues> = async (formData) => {
    await api
      .post('/login', formData)
      .then((response) => {
        setUsername(formData.username);
        nookies.set(undefined, 'token', response.data.token, {
          maxAge: 60 * 60 * 24 * 30, // 30 days
          path: '/',
        });
        nookies.set(undefined, 'username', formData.username, {
          maxAge: 60 * 60 * 24 * 30, // 30 days
          path: '/',
        });
        toast.success('Login realizado com sucesso!');
        const intervalId = setTimeout(() => {
          Router.push('/dashboard');
        }, 3000);
        return () => clearTimeout(intervalId);
      })
      .catch((err) => {
        console.log(err);
        return toast.error('Usuário ou senha inválidos');
      });
  };

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <div className="text-center mb-2">
        <p className="font-black text-3xl text-white pb-1">
          Faça login na sua conta
        </p>
        <span className="text-white/70 text-base">é para todas as idades!</span>
      </div>

      <Form handleSubmit={handleLogin} buttonLabel="Login" />

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
    </div>
  );
};

export default FormLogin;
