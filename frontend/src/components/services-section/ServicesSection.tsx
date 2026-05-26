"use client";

import React, { useEffect, useRef, useState } from "react";

import { ImageDeck } from "./ImageDeck";
import { ServiceAccordian } from "./ServiceAccordian";

export const ServicesSection = () => {
  const [activeID, setActiveID] = useState("Microloans");
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const calculate = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      const accordionWidth = 647;
      const gap = 50;
      const deckNaturalWidth = 600;
      const available = containerWidth - accordionWidth - gap;
      const newScale = Math.min(1, Math.max(0.4, available / deckNaturalWidth));
      setScale(newScale);
    };

    calculate();
    const observer = new ResizeObserver(calculate);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full bg-white px-[30px] py-[50px] md:px-[100px]">
      <h2 className="m-0 mb-[20px] font-dm-sans text-[28px] font-medium leading-[1.5] tracking-[-0.56px] text-[#172447] md:mb-[80px] md:text-5xl md:tracking-[-0.96px]">
        Services We Offer
      </h2>
      <div ref={containerRef} className="mx-auto flex max-w-[1400px] flex-col gap-10">
        <div className="flex items-start justify-between gap-[50px]">
          <div
            className="hidden md:block"
            style={{ width: 600 * scale, height: 658 * scale, flexShrink: 0 }}
          >
            <ImageDeck activeID={activeID} scale={scale} />
          </div>
          <ServiceAccordian activeID={activeID} onServiceChange={(id) => setActiveID(id)} />
        </div>
      </div>
    </section>
  );
};
