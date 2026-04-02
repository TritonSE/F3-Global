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
    <div className="flex p-[10px] justify-center items-center gap-[10px] rounded-2xl border-[1px] border-[#F4F4F4] cursor-pointer transition-all duration-100 ease-in hover:shadow-xl">
      <div
        className="flex flex-col w-[290px] rounded-2xl border-[1px] border-[#D9D9D9] "
        onClick={() => (window.location.href = href)}
      >
        <Image
          src="/imgs/components_placeholder.png"
          alt="component img"
          width={290}
          height={183}
          className="rounded-t-2xl"
        />
        <div className="flex flex-col px-[16px] py-[10px] items-start gap-[10px]">
          <div className="flex flex-col gap-[4px]">
            <p className="text-[#000] text-[16px] font-semibold ">{name}</p>
            <p className="text-[#6C6C6C] text-[12px] font-normal leading-[16px]">{description}</p>
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
