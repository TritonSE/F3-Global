import Image from "next/image";

type EligibileCardProps = {
  iconSrc: string;
  iconAlt: string;
  title: string;
  description: string;
};

export default function EligibileCard({
  iconSrc,
  iconAlt,
  title,
  description,
}: EligibileCardProps) {
  return (
    <div className="relative ">
      <div className="flex flex-col w-[300px] h-[302px] pt-[60px] pb-[30px] px-[20px] items-center justify-center gap-[20px] rounded-[10px] bg-[#F4F4F4]">
        <h2 className="self-center text-center self-stretch text-[#1E1E1E] font-dm-sans text-[32px] font-bold leading-[150%] tracking-[-0.64px]">
          {title}
        </h2>
        <p className="text-center w-[233px] text-[16px] font-normal leading-[24px] text-[#1E1E1E]">
          {description}
        </p>
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 -top-[60px] w-[120px] h-[120px] flex items-center justify-center rounded-full bg-[#012060] z-10">
        <Image src={iconSrc} alt={iconAlt} width={60} height={60} />
      </div>
    </div>
  );
}
