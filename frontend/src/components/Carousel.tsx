"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

import { Button } from "./button";
import { CarouselCard } from "./CarouselCard";

const MOBILE_CARD_WIDTH = 263;
const MOBILE_CARD_GAP = 40;
const MOBILE_SLIDE_STEP = MOBILE_CARD_WIDTH + MOBILE_CARD_GAP;
const MOBILE_DRAG_THRESHOLD = 50;

type CarouselData = {
  title: string;
  mobileTitle?: string;
  header: React.ReactNode;
  mobileHeader?: React.ReactNode;
  description: string;
  mobileDescription?: string;
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
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef<number | null>(null);
  const dragStartY = useRef<number | null>(null);

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

  const getBoundedMobileDragOffset = (offset: number) => {
    const maxIndex = Math.max(data.length - 1, 0);

    if (currentIndex === 0 && offset > 0) return 0;
    if (currentIndex === maxIndex && offset < 0) return 0;

    return Math.max(-MOBILE_SLIDE_STEP, Math.min(MOBILE_SLIDE_STEP, offset));
  };

  const resetMobileDrag = () => {
    dragStartX.current = null;
    dragStartY.current = null;
    setIsDragging(false);
    setDragOffset(0);
  };

  const handleMobileDragStart = (clientX: number, clientY: number) => {
    dragStartX.current = clientX;
    dragStartY.current = clientY;
    setIsDragging(true);
    setDragOffset(0);
  };

  const handleMobileDragMove = (clientX: number, clientY: number) => {
    if (dragStartX.current === null || dragStartY.current === null) return;

    const deltaX = clientX - dragStartX.current;
    const deltaY = clientY - dragStartY.current;

    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      setDragOffset(0);
      return;
    }

    setDragOffset(getBoundedMobileDragOffset(deltaX));
  };

  const handleMobileDragEnd = (clientX: number, clientY: number) => {
    if (dragStartX.current === null || dragStartY.current === null) return;

    const deltaX = dragStartX.current - clientX;
    const deltaY = dragStartY.current - clientY;

    dragStartX.current = null;
    dragStartY.current = null;
    setIsDragging(false);
    setDragOffset(0);

    if (Math.abs(deltaX) < MOBILE_DRAG_THRESHOLD || Math.abs(deltaX) < Math.abs(deltaY)) return;

    setCurrentIndex((prevIndex) => {
      const maxIndex = Math.max(data.length - 1, 0);
      if (deltaX > 0) return Math.min(prevIndex + 1, maxIndex);
      return Math.max(prevIndex - 1, 0);
    });
  };

  const handleTabClick = (index: number) => {
    resetMobileDrag();
    setCurrentIndex(index);
  };

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
            <React.Fragment key={card.title}>
              <Button
                text={card.mobileTitle ?? card.title}
                onClick_link="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleTabClick(index);
                }}
                className={`flex cursor-pointer items-center justify-center rounded-[99px] border-none px-3 py-2 md:hidden ${
                  currentIndex === index ? "bg-[#F4F4F4]" : "bg-transparent"
                }`}
                textClassName="font-dm-sans text-[12px] font-semibold leading-[1.5] text-[#1e1e1e]"
              />
              <Button
                text={card.title}
                onClick_link="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleTabClick(index);
                }}
                className={`hidden cursor-pointer items-center justify-center rounded-[99px] border-none px-3 py-2 md:flex md:h-[57px] md:px-6 ${
                  currentIndex === index ? "bg-[#F4F4F4]" : "bg-transparent"
                }`}
                textClassName="font-dm-sans text-[18px] font-medium leading-[150%] tracking-[-0.02em] text-[#1e1e1e]"
              />
            </React.Fragment>
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

      {/* Mobile Snap Carousel */}
      <div
        className="relative w-full overflow-hidden touch-pan-y md:hidden"
        onPointerDown={(e) => {
          if (e.button !== 0) return;
          e.currentTarget.setPointerCapture(e.pointerId);
          handleMobileDragStart(e.clientX, e.clientY);
        }}
        onPointerMove={(e) => {
          handleMobileDragMove(e.clientX, e.clientY);
        }}
        onPointerUp={(e) => {
          handleMobileDragEnd(e.clientX, e.clientY);
          if (e.currentTarget.hasPointerCapture(e.pointerId)) {
            e.currentTarget.releasePointerCapture(e.pointerId);
          }
        }}
        onPointerCancel={resetMobileDrag}
        onLostPointerCapture={resetMobileDrag}
      >
        <div
          className={`flex gap-[40px] pl-[30px] ${
            isDragging ? "" : "transition-transform duration-300 ease-out"
          }`}
          style={{
            transform: `translateX(${-(currentIndex * MOBILE_SLIDE_STEP) + dragOffset}px)`,
          }}
        >
          {data.map((card, index) => (
            <div
              key={index}
              className="flex w-[263px] flex-shrink-0 flex-col gap-[20px] items-start justify-start"
            >
              <div className="flex w-[263px] flex-col gap-[20px]">
                <div className="relative h-[175px] w-[263px] rounded-[8px] overflow-hidden">
                  <Image src={card.imageSrc} alt={card.title} fill className="object-cover" />
                </div>

                <div className="flex w-[263px] flex-col gap-[10px] px-0">
                  <div className="font-dm-sans text-[28px] font-medium leading-[1.5] text-[#1e1e1e] tracking-[-0.02em]">
                    {card.mobileHeader ?? card.header}
                  </div>

                  <p className="font-dm-sans text-[12px] font-normal leading-[16px] text-[#5d5d5d]">
                    {card.mobileDescription ?? card.description}
                  </p>

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
