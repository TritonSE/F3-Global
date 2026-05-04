import Image from "next/image";

type EligibileCardProps = {
  iconSrc: string;
  iconAlt: string;
  title: string;
  mobileTitle?: string;
  description: string;
};

export default function EligibileCard({
  iconSrc,
  iconAlt,
  title,
  mobileTitle,
  description,
}: EligibileCardProps) {
  return (
    <div className="relative w-[150px] justify-self-center pt-[20px] md:w-auto md:pt-0">
      <div className="flex h-[150px] w-[150px] flex-col items-center justify-center gap-[10px] rounded-[10px] bg-[#F4F4F4] px-[10px] pt-[34px] pb-[18px] md:h-[302px] md:w-[300px] md:gap-[20px] md:px-[20px] md:pt-[60px] md:pb-[30px]">
        <h2 className="self-stretch text-center font-dm-sans text-[14px] leading-[120%] font-semibold text-[#1E1E1E] md:text-[32px] md:leading-[150%] md:font-bold md:tracking-[-0.64px]">
          {mobileTitle ? (
            <>
              <span className="md:hidden">{mobileTitle}</span>
              <span className="hidden md:inline">{title}</span>
            </>
          ) : (
            title
          )}
        </h2>
        <p className="w-full text-center font-dm-sans text-[12px] leading-[16px] font-normal text-[#1E1E1E] md:w-[233px] md:text-[16px] md:leading-[24px]">
          {description}
        </p>
      </div>
      <div className="absolute top-0 left-1/2 z-10 flex h-[40px] w-[40px] -translate-x-1/2 items-center justify-center rounded-full bg-[#012060] md:-top-[60px] md:h-[120px] md:w-[120px]">
        <Image
          src={iconSrc}
          alt={iconAlt}
          width={60}
          height={60}
          className="size-[20px] md:size-[60px]"
        />
      </div>
    </div>
  );
}
