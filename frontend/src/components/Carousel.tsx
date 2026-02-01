"use client";

import Image from "next/image";
import React, { useState } from "react";

import { Button } from "./button";
import { CarouselCard } from "./CarouselCard";

type CarouselData = {
  part: string;
  header: React.ReactNode;
  description: string;
  leftButtonText: string;
  leftButtonLink: string;
  rightButtonLink?: string;
  imageSrc: string;
};

type CarouselProps = {
  data: CarouselData[];
} & React.ComponentProps<"div">;

export const Carousel: React.FC<CarouselProps> = ({ data, ...props }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    if (data.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const prev = () => {
    if (data.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

  const currentCard = data[currentIndex];

  return (
    <div
      className="relative w-full flex h-auto min-h-[607px] flex-col items-center justify-start gap-[50px] bg-white px-[100px] py-[50px] shadow-[0_-12px_24px_rgba(0,0,0,0.00),0_12px_24px_rgba(0,0,0,0.15)]"
      {...props}
    >
      <div className="flex w-full flex-shrink-0 flex-row items-center justify-center pb-0">
        <div className="flex h-[77px] w-auto items-center justify-center rounded-[50px] bg-white px-3 shadow-[0px_17px_36px_0px_rgba(0,0,0,0.1)]">
          {data.map((card, index) => (
            <Button
              key={card.part}
              text={card.part}
              onClick_link="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentIndex(index);
              }}
              className={`flex h-[57px] cursor-pointer items-center justify-center rounded-[99px] border-none px-6 font-dm-sans text-[18px] font-medium leading-[150%] tracking-[-0.02em] [&_p]:font-dm-sans [&_p]:text-[18px] [&_p]:font-medium [&_p]:leading-[150%] [&_p]:tracking-[-0.02em] [&_p]:text-[#1e1e1e] ${
                currentIndex === index
                  ? "bg-[#EDEDED] text-[#1e1e1e] opacity-100"
                  : "bg-transparent text-[#1e1e1e] opacity-60"
              }`}
            />
          ))}
        </div>
      </div>
      <div className="flex w-full flex-none flex-col items-center justify-center gap-[32px] lg:min-h-[330px] lg:flex-row lg:gap-[50px]">
        <div
          className="flex h-[45px] w-[45px] cursor-pointer items-center justify-center rounded-full bg-white transition-colors duration-200 hover:bg-[#F4F4F4]"
          onClick={prev}
        >
          <Image src="/imgs/arrow_back.svg" alt="Left Arrow" width={13.12} height={22.5} />
        </div>
        <div>
          {currentCard && (
            <CarouselCard
              header={currentCard.header}
              description={currentCard.description}
              leftButtonText={currentCard.leftButtonText}
              leftButtonLink={currentCard.leftButtonLink}
              rightButtonLink={currentCard.rightButtonLink}
              imageSrc={currentCard.imageSrc}
            />
          )}
        </div>
        <div
          className="flex h-[45px] w-[45px] cursor-pointer items-center justify-center rounded-full bg-white transition-colors duration-200 hover:bg-[#F4F4F4]"
          onClick={next}
        >
          <Image src="/imgs/arrow_forward.svg" alt="Right Arrow" width={13.12} height={22.5} />
        </div>
      </div>
      <div className="mt-5 flex w-full flex-shrink-0 items-center justify-center gap-4">
        {data.map((_, index) => (
          <div
            key={index}
            className={`h-[5px] w-[125px] rounded-[2px] transition-colors duration-300 ease-in-out ${
              currentIndex === index ? "bg-[#1e1e1e]" : "bg-[#D9D9D9]"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
