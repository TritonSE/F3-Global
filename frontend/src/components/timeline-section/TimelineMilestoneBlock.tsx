import Image from "next/image";

type TimelineMilestoneBlockProps = {
  year: number;
  description: string;
  imageSrc: string;
  imageAlt: string;
  align: "left" | "right";
  isActive: boolean;
};

export const TimelineMilestoneBlock = ({
  year,
  description,
  imageSrc,
  imageAlt,
  align,
  isActive,
}: TimelineMilestoneBlockProps) => {
  const isLeftAligned = align === "left";

  return (
    <article className="flex items-center gap-[30px] w-full">
      {/* mobile */}
      <div className="flex md:hidden flex-col w-full">
        <h3
          className={`font-ethic text-[36px] leading-[1.1] tracking-[-0.02em] transition-colors duration-[1500ms] ease-out ${
            isActive ? "text-black" : "text-[#d0d0d0]"
          }`}
        >
          {year}
        </h3>
        <p
          className={`font-dm w-[222px] text-[12px] leading-[16px] pb-[10px] transition-colors duration-[1500ms] ease-out ${
            isActive ? "text-black" : "text-[#c5c5c5]"
          }`}
        >
          {description}
        </p>
        <div className="relative h-[118px] w-[222px] overflow-hidden rounded-[10px]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className={`object-cover transition-[filter] duration-[1500ms] ease-out ${
              isActive ? "grayscale-0" : "grayscale"
            }`}
          />
        </div>
      </div>

      {isLeftAligned ? (
        <>
          <div className="hidden md:block space-y-2 flex-1 text-right">
            <h3
              className={`font-ethic text-[54px] leading-[1] tracking-[-0.02em] transition-colors duration-[1500ms] ease-out ${
                isActive ? "text-black" : "text-[#d0d0d0]"
              }`}
            >
              {year}
            </h3>
            <p
              className={`font-dm text-[16px] leading-[1.5] transition-colors duration-[1500ms] ease-out ${
                isActive ? "text-black" : "text-[#c5c5c5]"
              }`}
            >
              {description}
            </p>
          </div>
          <div className="hidden md:block relative h-[190px] w-[227px] shrink-0 overflow-hidden rounded-[45%] border border-[#d8d8d8]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="227px"
              className={`object-cover transition-[filter] duration-[1500ms] ease-out ${
                isActive ? "grayscale-0" : "grayscale"
              }`}
            />
          </div>
        </>
      ) : (
        <>
          <div className="hidden md:block relative h-[190px] w-[227px] shrink-0 overflow-hidden rounded-[45%] border border-[#d8d8d8]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="227px"
              className={`object-cover transition-[filter] duration-[1500ms] ease-out ${
                isActive ? "grayscale-0" : "grayscale"
              }`}
            />
          </div>
          <div className="hidden md:block space-y-2 flex-1 text-left">
            <h3
              className={`font-ethic text-[54px] leading-[1] tracking-[-0.02em] transition-colors duration-[1500ms] ease-out ${
                isActive ? "text-black" : "text-[#d0d0d0]"
              }`}
            >
              {year}
            </h3>
            <p
              className={`font-dm text-[16px] leading-[1.5] transition-colors duration-[1500ms] ease-out ${
                isActive ? "text-black" : "text-[#c5c5c5]"
              }`}
            >
              {description}
            </p>
          </div>
        </>
      )}
    </article>
  );
};
