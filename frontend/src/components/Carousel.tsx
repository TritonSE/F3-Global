"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

import { Button } from "./button";
import { CarouselCard } from "./CarouselCard";

type CarouselData = {
  title: string;
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (data.length < 2) return;

    const nextIndex = (currentIndex + 1) % data.length;
    const prevIndex = (currentIndex - 1 + data.length) % data.length;

    [nextIndex, prevIndex].forEach((index) => {
      const image = new window.Image();
      image.src = data[index].imageSrc;
    });
  }, [currentIndex, data]);

  const next = () => {
    if (data.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const prev = () => {
    if (data.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

  const handleTabClick = (index: number) => {
    setCurrentIndex(index);

    setTimeout(() => {
      cardRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }, 0);
  };

  const handleScroll = () => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = window.setTimeout(() => {
      const container = scrollContainerRef.current;
      if (!container || cardRefs.current.length === 0) return;

      const targetLeft = container.scrollLeft + 30;

      let closestIndex = 0;
      let minDist = Infinity;

      cardRefs.current.forEach((el, idx) => {
        if (!el) return;
        const dist = Math.abs(el.offsetLeft - targetLeft);
        if (dist < minDist) {
          minDist = dist;
          closestIndex = idx;
        }
      });

      if (closestIndex !== currentIndex) setCurrentIndex(closestIndex);
    }, 120);
  };

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const currentCard = data[currentIndex];

  return (
    <div
      className="relative w-full flex h-auto min-h-[607px] flex-col items-center justify-start gap-[25px] bg-white px-0 py-[30px] md:gap-[50px] md:px-[100px] md:py-[50px] md:shadow-[0_-12px_24px_rgba(0,0,0,0.00),0_12px_24px_rgba(0,0,0,0.15)]"
      {...props}
    >
      {/* Tab Navigation */}
      <div className="flex w-full flex-shrink-0 flex-row justify-center pb-0">
        <div className="flex h-auto items-center justify-center rounded-[50px] bg-white px-1 py-1 border md:border-2 border-[#F4F4F4] md:h-[77px] md:px-3 shadow-[0px_17px_36px_0px_rgba(0,0,0,0.1)]">
          {data.map((card, index) => (
            <Button
              key={card.title}
              text={card.title}
              onClick_link="#"
              onClick={(e) => {
                e.preventDefault();
                handleTabClick(index);
              }}
              className={`flex cursor-pointer items-center justify-center rounded-[99px] border-none px-3 py-2 md:h-[57px] md:px-6 ${
                currentIndex === index ? "bg-[#F4F4F4]" : "bg-transparent"
              }`}
              textClassName={`font-dm-sans text-[12px] font-semibold leading-[1.5] md:text-[18px] md:font-medium md:leading-[150%] md:tracking-[-0.02em] text-[#1e1e1e]`}
            />
          ))}
        </div>
      </div>

      {/* Desktop Carousel */}
      <div className="relative hidden w-full flex-none items-center justify-center md:flex md:min-h-[330px]">
        <button
          type="button"
          aria-label="Previous slide"
          className="absolute left-0 z-10 flex size-[45px] shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-white transition-colors duration-200 hover:bg-[#F4F4F4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1169B0] focus-visible:ring-offset-2"
          onClick={prev}
        >
          <Image src="/imgs/arrow_back.svg" alt="Left Arrow" width={13.12} height={22.5} />
        </button>
        <div className="w-full px-[65px]">
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
        <button
          type="button"
          aria-label="Next slide"
          className="absolute right-0 z-10 flex size-[45px] shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-white transition-colors duration-200 hover:bg-[#F4F4F4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1169B0] focus-visible:ring-offset-2"
          onClick={next}
        >
          <Image src="/imgs/arrow_forward.svg" alt="Right Arrow" width={13.12} height={22.5} />
        </button>
      </div>

      {/* Mobile Snap Scroll Carousel */}
      <div className="relative w-full md:hidden">
        {/* Scroll container with snap behavior */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex w-full gap-[40px] overflow-x-auto scroll-smooth snap-x snap-mandatory [-webkit-overflow-scrolling:touch] px-[30px]"
          style={{ scrollBehavior: "smooth", scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* Individual card*/}
          {data.map((card, index) => (
            <div
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="flex w-[263px] flex-shrink-0 snap-start scroll-ml-[30px] flex-col gap-[20px] items-start justify-start"
            >
              {/* Card content wrapper */}
              <div className="flex w-[263px] flex-col gap-[20px]">
                {/* Card image section */}
                <div className="relative h-[175px] w-[263px] rounded-[8px] overflow-hidden">
                  <Image src={card.imageSrc} alt={card.title} fill className="object-cover" />
                </div>

                {/* Card text and button section */}
                <div className="flex w-[263px] flex-col gap-[10px] px-0">
                  {/* Card header */}
                  <div className="font-dm-sans text-[28px] font-medium leading-[1.5] text-[#1e1e1e] tracking-[-0.02em]">
                    {card.header}
                  </div>

                  {/* Card description */}
                  <p className="font-dm-sans text-[12px] font-normal leading-[16px] text-[#5d5d5d]">
                    {card.description}
                  </p>

                  {/* Card buttons */}
                  <div className="flex flex-wrap gap-[15px]">
                    <Button
                      text={card.leftButtonText}
                      onClick_link={card.leftButtonLink}
                      className="flex items-center justify-center rounded-[99px] bg-[#172447] px-[15px] py-[10px] transition-colors duration-300 hover:bg-[#1169B0] [&_p]:text-white [&_p]:font-semibold [&_p]:text-[12px] [&_p]:leading-[1.5]"
                    />

                    {card.rightButtonLink && (
                      <Button
                        text="Learn More"
                        onClick_link={card.rightButtonLink}
                        trailingIcon={
                          <Image
                            src="/imgs/button_right_arrow.svg"
                            alt="Arrow"
                            width={16}
                            height={16}
                            className="transition-transform duration-300 ease-in-out group-hover:translate-x-1"
                          />
                        }
                        className="group flex items-center justify-center gap-[5px] rounded-[99px] border-none bg-white px-[15px] py-[10px] transition-colors duration-300 hover:bg-[#F4F4F4]"
                        textClassName="font-dm-sans text-[12px] font-semibold text-[#1e1e1e]"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="md:mt-5 flex w-full flex-shrink-0 items-center justify-center gap-[5px] md:gap-[10px]">
        {data.map((_, index) => (
          <div
            key={index}
            className={`h-[2px] md:h-[5px] w-[47px] rounded-[2px] transition-colors duration-300 ease-in-out md:w-[125px] ${
              currentIndex === index ? "bg-[#012060]" : "bg-[#D9D9D9]"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
