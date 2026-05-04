"use client";
import React from "react";

import type { ServiceDescription } from "./types";

type ServiceAccordianItemProps = {
  service: ServiceDescription;
  isExpanded: boolean;
  onClick: () => void;
};

const PlusIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7 16H25M16 7V25"
      stroke="#1E1E1E"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MinusIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7 16H25"
      stroke="#1E1E1E"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ServiceAccordianItem: React.FC<ServiceAccordianItemProps> = ({
  service,
  isExpanded,
  onClick,
}) => {
  return (
    <div className="border-b border-[#c7c7c7] last:border-b-0">
      <button
        className="flex w-full items-center justify-between border-none bg-transparent py-[20px] md:py-[18px] cursor-pointer"
        onClick={onClick}
      >
        <span
          className={`pl-[0px] font-dm-sans text-[18px] font-medium tracking-[-0.36px] transition-colors duration-300 md:pl-[20px] md:text-[28px] md:tracking-[-0.56px] ${
            isExpanded ? "text-[#012060]" : "text-[#5d5d5d]"
          }`}
        >
          {service.title}
        </span>
        <span className="mr-0 flex h-6 w-6 items-center justify-center transition-colors duration-300 md:mr-[20px] md:h-8 md:w-8">
          {isExpanded ? <MinusIcon /> : <PlusIcon />}
        </span>
      </button>

      <div
        className={`overflow-hidden transition-[max-height] duration-300 ${
          isExpanded ? "max-h-[300px]" : "max-h-0"
        }`}
      >
        <p className="m-0 pb-5 pl-0 pr-[20px] font-dm-sans text-[12px] leading-[16px] text-[#5d5d5d] md:pl-[20px] md:text-base md:leading-6">
          {service.description}
        </p>
      </div>
    </div>
  );
};
