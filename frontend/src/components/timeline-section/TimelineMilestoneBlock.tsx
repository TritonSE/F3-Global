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
      {isLeftAligned ? (
        <>
          <div className="space-y-2 flex-1 text-right">
            <h3
              className={`font-ethic text-[54px] leading-[1] tracking-[-0.02em] transition-colors duration-500 ${
                isActive ? "text-black" : "text-[#d0d0d0]"
              }`}
            >
              {year}
            </h3>
            <p
              className={`font-dm text-[16px] leading-[1.5] transition-colors duration-500 ${
                isActive ? "text-black" : "text-[#c5c5c5]"
              }`}
            >
              {description}
            </p>
          </div>
          <div className="relative h-[190px] w-[227px] shrink-0 overflow-hidden rounded-[45%] border border-[#d8d8d8]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(max-width: 768px) 227px, 227px"
              className={`object-cover transition-[filter] duration-500 ${
                isActive ? "grayscale-0" : "grayscale"
              }`}
            />
          </div>
        </>
      ) : (
        <>
          <div className="relative h-[190px] w-[227px] shrink-0 overflow-hidden rounded-[45%] border border-[#d8d8d8]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(max-width: 768px) 227px, 227px"
              className={`object-cover transition-[filter] duration-500 ${
                isActive ? "grayscale-0" : "grayscale"
              }`}
            />
          </div>
          <div className="space-y-2 flex-1 text-left">
            <h3
              className={`font-ethic text-[54px] leading-[1] tracking-[-0.02em] transition-colors duration-500 ${
                isActive ? "text-black" : "text-[#d0d0d0]"
              }`}
            >
              {year}
            </h3>
            <p
              className={`font-dm text-[16px] leading-[1.5] transition-colors duration-500 ${
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
