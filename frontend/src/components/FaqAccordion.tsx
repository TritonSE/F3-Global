"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

export type FaqItem = {
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  items: FaqItem[];
  className?: string;
  borderColor?: string;
};

export const FaqAccordion: React.FC<FaqAccordionProps> = ({
  items,
  className = "",
  borderColor = "#C7C7C7",
}) => {
  const [open, setOpen] = useState<boolean[]>(Array.from({ length: items.length }, () => false));
  const [heights, setHeights] = useState<{ [key: number]: number }>({});
  const contentRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const toggleItem = (index: number) => {
    const newOpen = [...open];
    newOpen[index] = !newOpen[index];
    setOpen(newOpen);
  };

  useEffect(() => {
    const newHeights: { [key: number]: number } = {};
    items.forEach((_, index) => {
      if (contentRefs.current[index]) {
        newHeights[index] = contentRefs.current[index]?.scrollHeight || 0;
      }
    });
    setHeights(newHeights);
  }, [items]);

  return (
    <div className={`w-full bg-white overflow-x-hidden border-t border-[#f4f4f4] ${className}`}>
      <div
        className="relative flex w-full flex-col items-start gap-[40px] px-[30px] py-[50px] shadow-[0px_19px_21.5px_rgba(0,0,0,0.1)] md:px-[100px] md:shadow-[10px_6px_60px_0_rgba(1,32,96,0.20)]"
      >
        <div className="flex items-center relative w-full">
          <h2 className="font-dm text-[28px] font-medium leading-[1.5] tracking-[-0.56px] text-[#172447] md:text-[48px] md:tracking-[-0.96px]">
            Questions?
          </h2>
        </div>

        <div
          className="flex w-full flex-col items-start rounded-[10px] bg-[#f4f4f4] p-[20px] md:py-0"
          style={{ "--faq-border-color": borderColor } as React.CSSProperties}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="w-full border-b border-[var(--faq-border-color)] pb-[25px] pt-[25px] first:pt-0 last:border-b-0 last:pb-0 md:border-b-2 md:py-0"
            >
              <button
                onClick={() => toggleItem(index)}
                className="flex w-full cursor-pointer items-start justify-between transition-opacity hover:opacity-80 md:items-center md:py-[20px]"
              >
                <p
                  className={`font-dm flex-1 text-left text-[18px] font-medium leading-[1.5] tracking-[-0.36px] transition-colors md:text-[28px] md:tracking-[-0.56px] ${
                    open[index] ? "text-[#012060]" : "text-[#1e1e1e]"
                  }`}
                >
                  {item.question}
                </p>
                <div className="relative ml-[10px] flex h-[27px] w-[27px] shrink-0 items-center justify-center md:ml-4 md:h-[42px] md:w-[42px]">
                  <Image
                    src="/imgs/remove.svg"
                    alt="Collapse"
                    fill
                    className={`transition-opacity duration-300 ${
                      open[index] ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <Image
                    src="/imgs/ic_add.svg"
                    alt="Expand"
                    fill
                    className={`transition-opacity duration-300 ${
                      open[index] ? "opacity-0" : "opacity-100"
                    }`}
                  />
                </div>
              </button>

              <div
                ref={(el) => {
                  if (el) contentRefs.current[index] = el;
                }}
                style={{
                  maxHeight: open[index] ? heights[index] : 0,
                  transition: "max-height 0.3s ease-in-out",
                  overflow: "hidden",
                }}
                className="font-dm text-[12px] leading-[16px] text-[#5D5D5D] md:text-[16px] md:leading-[1.5]"
              >
                <div className="pt-[15px] md:pt-0 md:pb-[20px]">{item.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
