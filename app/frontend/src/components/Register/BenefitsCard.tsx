import Image, { StaticImageData } from 'next/image';

type BenefitsProps = {
  iconImage: StaticImageData;
  iconAlt: string;
  iconWidth: number;
  title: string;
  description: string;
};

export default function BenefitsCard(props: BenefitsProps) {
  return (
    <div className="flex items-center gap-3">
      <Image
        width={props.iconWidth}
        src={props.iconImage}
        alt={props.iconAlt}
        quality={70}
      />
      <div>
        <p className="font-bold">{props.title}</p>
        <span className="text-white/70">{props.description}</span>
      </div>
    </div>
  );
}
