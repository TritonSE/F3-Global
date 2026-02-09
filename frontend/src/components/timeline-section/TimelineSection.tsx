"use client";

import React, { useState } from "react";

import { ImageCollage } from "./ImageCollage";
import { TIMELINE_HEADER, TIMELINE_ITEMS } from "./types";
import { YearCard } from "./YearCard";

// Year card positions
const YEAR_POSITIONS = [
  { left: 57, top: 232 }, // 2015
  { left: 580, top: 232 }, // 2022
  { left: 1103, top: 232 }, // 2026
];

export const TimelineSection = () => {
  const [openYears, setOpenYears] = useState<number[]>([]);

  const toggleYear = (year: number) => {
    setOpenYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year],
    );
  };

  return (
    <section className="w-[1512px] mx-auto py-[50px] bg-white relative overflow-x-hidden">
      {/* Header */}
      <div className="px-[100px] py-[10px] flex flex-col gap-[10px]">
        <h2 className="font-dm-sans text-[48px] font-medium text-[#172447] tracking-[-0.96px] leading-[1.5] m-0">
          {TIMELINE_HEADER.title}
        </h2>
        <p className="font-dm-sans text-[24px] font-normal text-black leading-[32px] m-0 max-w-[1073px]">
          {TIMELINE_HEADER.description}
        </p>
      </div>

      {/*relative for absolute positioning */}
      <div className="relative h-[1030px] overflow-hidden">
        {/* Image Collage (background images) */}
        <ImageCollage />

        {/* Timeline Line */}
        <div
          className="absolute h-[4px] bg-[#172447]"
          style={{
            left: 194,
            top: 300,
            width: 1062,
          }}
        />

        {/* absolutely positioned */}
        {TIMELINE_ITEMS.map((item, index) => {
          const pos = YEAR_POSITIONS[index];
          if (!pos) return null;

          return (
            <div
              key={item.year}
              className="absolute"
              style={{
                left: pos.left,
                top: pos.top,
              }}
            >
              <YearCard
                item={item}
                isOpen={openYears.includes(item.year)}
                onClick={() => toggleYear(item.year)}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};
