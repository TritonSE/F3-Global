"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { PhotoStack } from "./PhotoStack";
import { TIMELINE_ITEMS } from "./types";

export const TimelineSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const firstDotRef = useRef<HTMLDivElement>(null);
  const lastDotRef = useRef<HTMLDivElement>(null);
  const [lineStyle, setLineStyle] = useState<{ top: number; height: number }>({
    top: 0,
    height: 0,
  });

  const updateLineStyle = useCallback(() => {
    if (!containerRef.current || !firstDotRef.current || !lastDotRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const firstDotRect = firstDotRef.current.getBoundingClientRect();
    const lastDotRect = lastDotRef.current.getBoundingClientRect();

    const firstDotCenter = firstDotRect.top + firstDotRect.height / 2 - containerRect.top;
    const lastDotCenter = lastDotRect.top + lastDotRect.height / 2 - containerRect.top;

    setLineStyle({
      top: firstDotCenter,
      height: lastDotCenter - firstDotCenter,
    });
  }, []);

  useEffect(() => {
    updateLineStyle();
    window.addEventListener("resize", updateLineStyle);
    return () => window.removeEventListener("resize", updateLineStyle);
  }, [updateLineStyle]);

  const lastIndex = TIMELINE_ITEMS.length - 1;

  return (
    <section className="flex items-center justify-between bg-white py-[50px] max-w-[1440px] mx-auto w-full">
      {/* Timeline (left side) */}
      <div ref={containerRef} className="relative w-[607px] pl-[100px]">
        {/* Vertical timeline line, dynamically positioned between first and last dot centers */}
        <div
          className="absolute left-[34px] w-[4px] bg-[#172447]"
          style={{ top: lineStyle.top, height: lineStyle.height }}
        />

        {/* Year entries with dots */}
        <div className="flex flex-col gap-[50px]">
          {TIMELINE_ITEMS.map((item, index) => (
            <button
              key={item.year}
              onClick={() => setActiveIndex(index)}
              className="relative flex flex-col cursor-pointer text-left"
            >
              {/* absolutely positioned in padding area */}
              <div
                ref={index === 0 ? firstDotRef : index === lastIndex ? lastDotRef : undefined}
                className={`absolute left-[-80px] top-[19px] w-[32px] h-[32px] rounded-full border-[3px] border-[#172447] z-10 transition-colors duration-300 ${
                  index === activeIndex ? "bg-[#172447]" : "bg-white"
                }`}
              />
              {/* Year + description */}
              <div
                className={`flex flex-col transition-colors duration-300 ${
                  index === activeIndex ? "text-[#172447]" : "text-[#c7c7c7]"
                }`}
              >
                <p className="font-ethic font-light text-[64px] leading-[1.1]">{item.year}</p>
                <p className="font-dm text-[16px] leading-[24px]">
                  {item.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <PhotoStack activeIndex={activeIndex} />
    </section>
  );
};
