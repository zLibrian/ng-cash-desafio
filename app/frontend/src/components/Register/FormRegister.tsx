import { useRouter } from 'next/router';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { LoginValues } from '../../schemas/loginSchema';
import api from '../../services/api';
import Form from '../Form';

const FormRegister = () => {
  const router = useRouter();

  const handleRegister: SubmitHandler<LoginValues> = async (formData) => {
    await api
      .post('/register', formData)
      .then((response) => {
        toast.success('Cadastro realizado com sucesso!');
        localStorage.setItem('token', response.data.token);
        const intervalId = setTimeout(() => {
          router.push('/dashboard');
        }, 3000);
        return () => clearTimeout(intervalId);
      })
      .catch(() => {
        return toast.error('Username já cadastrado');
      });
  };

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <p className="text-center mb-2 font-black text-3xl text-white spanb-1">
        Crie sua conta
        <span className="text-white/80 text-2xl block">
          e venha fazer parte da <br /> Nova Geração!
        </span>
      </p>
      <Form handleSubmit={handleRegister} buttonLabel="Criar conta" />
    </div>
  );
};

export default FormRegister;
