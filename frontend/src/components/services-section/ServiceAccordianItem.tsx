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
    <div className="border-b border-[#c7c7c7]">
      <button
        className="w-full flex justify-between items-center py-5 bg-transparent border-none cursor-pointer"
        onClick={onClick}
      >
        <span
          className={`font-dm-sans text-[28px] font-medium tracking-[-0.56px] transition-colors duration-300 pl-[20px] ${
            isExpanded ? "text-[#012060]" : "text-[#5d5d5d]"
          }`}
        >
          {service.title}
        </span>
        <span
          className={`w-8 h-8 flex items-center justify-center transition-colors duration-300 mr-[20px]`}
        >
          {isExpanded ? <MinusIcon /> : <PlusIcon />}
        </span>
      </button>

      <div
        className={`overflow-hidden transition-[max-height] duration-300 ${
          isExpanded ? "max-h-[300px]" : "max-h-0"
        }`}
      >
        <p className="text-[#5d5d5d] font-dm-sans text-base leading-6 m-0 pb-5 pl-[20px]">
          {service.description}
        </p>
      </div>
    </div>
  );
};
