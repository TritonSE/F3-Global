"use client";

import React from "react";

import { ServiceAccordianItem } from "./ServiceAccordianItem";
import { DEFAULT_SERVICES } from "./types";

type ServiceAccordianProps = {
  activeID: string; //The expanded Item's String
  onServiceChange: (id: string) => void;
};

export const ServiceAccordian = ({ activeID, onServiceChange }: ServiceAccordianProps) => {
  return (
    <div className="w-[647px] shrink-0">
      <div className="flex flex-col">
        {DEFAULT_SERVICES.map((service_offered) => (
          <ServiceAccordianItem
            key={service_offered.id}
            service={service_offered}
            isExpanded={service_offered.id === activeID}
            onClick={() => onServiceChange(service_offered.id)}
          />
        ))}
      </div>
    </div>
  );
};
