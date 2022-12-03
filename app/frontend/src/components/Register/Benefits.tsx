import Link from 'next/link';
import contaGratisIcon from '../../assets/images/conta-gratis.png';
import cofrinhoIcon from '../../assets/images/mesada.png';
import ngShopIcon from '../../assets/images/ng-shop-icon.png';
import pixIcon from '../../assets/images/pix.png';
import BenefitsCard from './BenefitsCard';

const RegisterBenefits = () => {
  return (
    <div className="flex flex-col items-center gap-4 w-full h-full">
      <div className="flex flex-col items-center gap-2 w-full ">
        <div className="mb-6">
          <p className="font-black text-3xl text-white pb-1 text-center">
            Benefícios de fazer parte da
            <br />
            <span className="text-purple-700">N</span>ova{' '}
            <span className="text-purple-700">G</span>eração
          </p>
        </div>

        <div className="pl-8 w-full flex flex-col gap-6">
          <BenefitsCard
            iconImage={contaGratisIcon}
            iconAlt="conta-gratis-icon"
            iconWidth={60}
            title="Conta grátis"
            description="Para todas as idades"
          />
          <BenefitsCard
            iconImage={cofrinhoIcon}
            iconAlt="cofrinho-icon"
            iconWidth={60}
            title="Mesada programada"
            description="Para receber seu dinheiro todo mês."
          />
          <BenefitsCard
            iconImage={pixIcon}
            iconAlt="pix-icon"
            iconWidth={60}
            title="Transferências instantâneas"
            description="Faz o Pix! Quando quiser, de onde
                  estiver."
          />
          <BenefitsCard
            iconImage={ngShopIcon}
            iconAlt="ng-shop-icon"
            iconWidth={60}
            title="NG.SHOP"
            description="Aquele descontinho? Encontre
              ofertas para o que você precisa."
          />
          <Link
            href="https://ng.cash/beneficios"
            target="_blank"
            className="uppercase w-fit hover:text-purple-700 transition-all duration-300"
          >
            Saiba mais
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterBenefits;
