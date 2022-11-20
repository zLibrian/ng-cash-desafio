import RegisterBenefits from '../components/Register/Benefits';
import FormRegister from '../components/Register/FormRegister';

const Register = () => {
  return (
    <main className="bg-black w-full h-screen flex items-center">
      <div className="max-w-[1124px] mx-auto grid grid-cols-2 gap-32 items-center py-8 px-5">
        <RegisterBenefits />
        <section className="flex flex-col items-center gap-4 w-3/4 h-full">
          <FormRegister />
        </section>
      </div>
    </main>
  );
};

export default Register;
