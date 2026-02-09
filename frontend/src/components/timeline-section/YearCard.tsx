"use client";

import React from "react";

import { TIMELINE_INSTRUCTION } from "./types";

import type { TimelineItem } from "./types";

type YearCardProps = {
  item: TimelineItem;
  isOpen: boolean;
  onClick: () => void;
};

export const YearCard = ({ item, isOpen, onClick }: YearCardProps) => {
  return (
    <button
      className="w-[273px] backdrop-blur-[3px] bg-white border-4 border-[#172447] rounded-[10px] px-[25px] py-[20px] cursor-pointer text-center flex flex-col items-center justify-center"
      onClick={onClick}
    >
      {/* Year */}
      <span className="font-dm-sans text-[64px] font-light text-[#172447] leading-[1.1] w-full text-center">
        {item.year}
      </span>

      {/* Content area */}
      <div className="w-full">
        {/* Click to read more*/}
        <span
          className={`block font-dm-sans text-[16px] font-normal text-[#5d5d5d] leading-[24px] underline text-center transition-opacity duration-200 ${
            isOpen ? "hidden" : "opacity-100"
          }`}
        >
          {TIMELINE_INSTRUCTION}
        </span>

        {/* Open state*/}
        {isOpen && (
          <>
            {/* Horizontal line */}
            <div className="w-[130px] h-[1px] bg-[#5d5d5d] mx-auto my-3" />

            {/* Description - centered */}
            <p className="font-dm-sans text-[16px] font-normal text-[#5d5d5d] leading-[24px] text-center m-0">
              {item.description}
            </p>
          </>
        )}
      </div>
    </button>
  );
};
