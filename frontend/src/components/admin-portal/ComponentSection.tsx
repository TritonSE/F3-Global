"use client";
import Image from "next/image";

type ComponentSectionProps = {
  name: string;
  description: string;
  tags: string[];
  href: string;
};

export const ComponentSection = function ComponentSection({
  name,
  description,
  tags,
  href,
}: ComponentSectionProps) {
  return (
    <div className="flex p-[10px] justify-center items-center gap-[10px] rounded-2xl border-[1px] border-[#F4F4F4] cursor-pointer transition-all duration-100 ease-in hover:shadow-[-27px_142px_40px_0_rgba(0,0,0,0.00),-17px_91px_37px_0_rgba(0,0,0,0.01),-4px_23px_23px_0_rgba(0,0,0,0.09),-1px_6px_13px_0_rgba(0,0,0,0.10)]">
      <div
        className="flex flex-col relative group w-[290px] rounded-2xl border-[1px] border-[#D9D9D9]"
        onClick={() => (window.location.href = href)}
      >
        <Image
          src="/imgs/components_placeholder.png"
          alt="component img"
          width={290}
          height={183}
          className="rounded-t-2xl"
        />
        <div className="absolute top-[12px] right-[12px] opacity-0 group-hover:opacity-100 transition-opacity duration-250 ease-in">
          <div className="w-[36px] h-[36px] rounded-full bg-[rgba(244,244,244,0.40)] flex items-center justify-center backdrop-blur-[10.85px]">
            <Image src="/imgs/ic_show.svg" alt="preview icon" width={20} height={20} />
          </div>
        </div>
        <div className="flex flex-col px-[16px] py-[10px] items-start gap-[10px]">
          <div className="flex flex-col gap-[4px]">
            <p className="text-[#000] text-[16px] font-semibold ">{name}</p>
            <p className="text-[#6C6C6C] text-[12px] font-normal leading-[16px] line-clamp-2">
              {description}
            </p>
          </div>
          <div className="flex items-center gap-[5px]">
            {tags.map((tag) => (
              <div
                key={tag}
                className="flex px-[8px] py-[2px] justify-center items-center rounded-[99px] bg-[#A5D0F2]"
              >
                <p className="text-[#172447] text-[10px]">{tag}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
