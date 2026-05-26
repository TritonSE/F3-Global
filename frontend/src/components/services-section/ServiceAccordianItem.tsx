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
        className="flex w-full items-center justify-between border-none bg-transparent py-[20px] min-[1023px]:py-[18px] cursor-pointer"
        onClick={onClick}
      >
        <span
          className={`pl-[0px] font-dm-sans text-[18px] font-medium tracking-[-0.36px] transition-colors duration-300 min-[1023px]:pl-[20px] min-[1023px]:text-[28px] min-[1023px]:tracking-[-0.56px] ${
            isExpanded ? "text-[#012060]" : "text-[#5d5d5d]"
          }`}
        >
          {service.title}
        </span>
        <span className="mr-0 flex h-6 w-6 items-center justify-center transition-colors duration-300 min-[1023px]:mr-[20px] min-[1023px]:h-8 min-[1023px]:w-8">
          {isExpanded ? <MinusIcon /> : <PlusIcon />}
        </span>
      </button>

      <div
        className={`overflow-hidden transition-[max-height] duration-300 ${
          isExpanded ? "max-h-[300px]" : "max-h-0"
        }`}
      >
        <p className="m-0 pb-5 pl-0 pr-[20px] font-dm-sans text-[12px] leading-[16px] text-[#5d5d5d] min-[1023px]:pl-[20px] min-[1023px]:text-base min-[1023px]:leading-6">
          {service.description}
        </p>
      </div>
    </div>
  );
};
