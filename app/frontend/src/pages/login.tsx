import Image from 'next/image';
import homeNgCash from '../assets/images/home-ngcash-app.png';
import { Divider } from '../components/Divider';
import Footer from '../components/Login/Footer';
import FormLogin from '../components/Login/FormLogin';

const Home = () => {
  return (
    <div className=" bg-app bg-cover bg-no-repeat w-full">
      <main className="max-w-[1124px] mx-auto grid grid-cols-2 gap-24 h-screen items-center py-8 px-5">
        <section className="flex flex-col items-center gap-4 w-3/4">
          <FormLogin />
          <Divider text="OU" className="w-full" />
          <Footer />
        </section>
        <Image
          src={homeNgCash}
          priority
          alt="2 celulares mostrando uma preview do app mobile"
        />
      </main>
    </div>
  );
};

export default Home;
