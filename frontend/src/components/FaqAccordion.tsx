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
        className="flex w-full flex-col gap-[40px] items-start py-[50px] px-[100px] relative"
        style={{
          boxShadow: "10px 6px 60px 0 rgba(1, 32, 96, 0.20)",
        }}
      >
        <div className="flex items-center relative w-full">
          <h2 className="text-[#172447] font-dm text-[48px] font-medium leading-[1.5] tracking-[-0.96px]">
            Questions?
          </h2>
        </div>

        <div className="bg-[#f4f4f4] flex flex-col items-start px-[20px] rounded-[10px] w-full">
          {items.map((item, index) => (
            <div
              key={index}
              className="w-full"
              style={{
                borderBottom: index < items.length - 1 ? `2px solid ${borderColor}` : "none",
              }}
            >
              <button
                onClick={() => toggleItem(index)}
                className="flex items-center justify-between py-[20px] w-full hover:opacity-80 transition-opacity cursor-pointer"
              >
                <p
                  className={`font-dm text-[28px] font-medium leading-[1.5] tracking-[-0.56px] text-left flex-1 transition-colors ${
                    open[index] ? "text-[#012060]" : "text-[#1e1e1e]"
                  }`}
                >
                  {item.question}
                </p>
                <div className="relative shrink-0 h-[42px] w-[42px] ml-4 flex items-center justify-center">
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
                className="text-[#5D5D5D] font-dm text-[16px] leading-[1.5]"
              >
                <div className="pb-[20px]">{item.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
