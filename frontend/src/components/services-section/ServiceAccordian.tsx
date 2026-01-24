"use client";

import React from "react";

import styles from "./ServiceAccordian.module.css";
import { ServiceAccordianItem } from "./ServiceAccordianItem";
import { DEFAULT_SERVICES } from "./types";

type ServiceAccordianProps = {
  activeID: string; //The expanded Item's String
  onServiceChange: (id: string) => void;
};

export const ServiceAccordian = ({ activeID, onServiceChange }: ServiceAccordianProps) => {
  return (
    <div className={styles.accordian}>
      <div className={styles.list}>
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
