import Image from "next/image";
import React from "react";

import { Button } from "./button";

type DonorsClientsMembersCarouselCardProps = {
  header: React.ReactNode;
  description: string;
  leftButtonText: string;
  leftButtonLink: string;
  rightButtonLink: string;
  imageSrc: string;
};

export const DonorsClientsMembersCarouselCard: React.FC<DonorsClientsMembersCarouselCardProps> = ({
  header,
  description,
  leftButtonText,
  leftButtonLink,
  rightButtonLink,
  imageSrc,
}) => {
  return (
    <div className="flex w-full flex-col items-center gap-[32px] lg:flex-row lg:gap-[55px]">
      <div className="flex h-auto w-full max-w-[564px] flex-[1_0_0] flex-col items-start justify-center gap-[30px] lg:h-[330px]">
        <div className="flex-wrap font-dm-sans text-[48px] font-medium leading-[150%] tracking-[-0.96px] text-[#1e1e1e]">
          {header}
        </div>
        <div className="font-dm-sans text-base font-normal leading-6 text-[#5d5d5d]">
          {description}
        </div>
        <div className="flex items-start gap-[25px]">
          <Button
            text={leftButtonText}
            onClick_link={leftButtonLink}
            className="flex h-[54px] w-auto cursor-pointer items-center justify-center gap-2.5 rounded-[99px] border-none bg-[#172447] px-5 py-[15px] font-dm-sans text-base font-semibold leading-[150%] text-white transition-colors duration-450 ease-in-out hover:bg-[#1169B0] whitespace-nowrap"
          />
          <Button
            text="Learn More"
            onClick_link={rightButtonLink}
            trailingIcon={
              <Image
                src="/imgs/button_right_arrow.svg"
                alt="Arrow"
                width={24}
                height={24}
                className="transition-transform duration-300 ease-in-out group-hover:translate-x-3"
              />
            }
            className="group flex h-[48px] w-[151px] items-center justify-center gap-2.5 rounded-[99px] border-none bg-white px-[15px] py-3 font-dm-sans text-base font-semibold leading-[150%] text-[#172447] [&_p]:text-[#172447]"
          />
        </div>
      </div>
      <div className="w-full max-w-[564px]">
        <Image
          src={imageSrc}
          alt="Carousel Image"
          width={564}
          height={330}
          className="h-auto w-full"
        />
      </div>
    </div>
  );
};
