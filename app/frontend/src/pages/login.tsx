import Image from 'next/image';
import homeNgCash from '../assets/images/home-ngcash-app.png';
import { Divider } from '../components/Divider';
import Footer from '../components/Login/Footer';
import Form from '../components/Login/Form';

const Home = () => {
  return (
    <main className="max-w-[1124px] mx-auto grid grid-cols-2 gap-24 h-screen items-center py-8 px-5">
      <section className="flex flex-col items-center gap-4 w-3/4">
        <Form />
        <Divider text="OU" className="w-full" />
        <Footer />
      </section>
      <Image
        src={homeNgCash}
        alt="2 celulares mostrando uma preview do app mobile"
      />
    </main>
  );
};

export default Home;
