import { NextPageContext } from 'next';
import Link from 'next/link';
import nookies from 'nookies';
import RegisterBenefits from '../components/Register/Benefits';
import FormRegister from '../components/Register/FormRegister';

const Register = () => {
  return (
    <main className="bg-black w-full h-screen flex items-center">
      <div className="max-w-[1124px] mx-auto grid grid-cols-2 gap-32 items-center py-8 px-5">
        <RegisterBenefits />
        <section className="flex flex-col items-center gap-4 w-3/4 h-full">
          <FormRegister />
          <p className="text-white text-center">
            Já tem uma conta?{' '}
            <Link href="/login" className="text-purple-700 font-bold">
              Faça login
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
};

export const getServerSideProps = async (context: NextPageContext) => {
  const { token } = nookies.get(context);
  if (token) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default Register;
