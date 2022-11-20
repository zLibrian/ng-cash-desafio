import Image from 'next/image';
import Link from 'next/link';
import googleIcon from '../../assets/images/google-icon.png';
import ngCashIcon from '../../assets/images/logo-ngcash.svg';

const Footer = () => {
  return (
    <div className="flex gap-4 w-full ">
      <Link
        href="https://www.google.com"
        target="_blank"
        className={` flex justify-center items-center gap-4 bg-black-800 px-4 py-3 rounded-md w-full
          hover:brightness-125 transition-all duration-300
        `}
      >
        <Image src={googleIcon} alt="google icon" width={32} />
        <p className="text-white">Login Google</p>
      </Link>
      <Link
        href="https://play.google.com/store/apps/details?id=com.neaglebank&pli=1"
        target="_blank"
        className={` flex justify-center items-center gap-4 bg-black-800 px-4 py-3 rounded-md w-full
          hover:brightness-125 transition-all duration-300
        `}
      >
        <Image src={ngCashIcon} alt="ng-cash icon" width={32} />
        <p className="text-white">Baixar o App</p>
      </Link>
    </div>
  );
};

export default Footer;
