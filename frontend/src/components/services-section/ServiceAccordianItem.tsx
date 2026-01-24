"use client";
import React from "react";

import styles from "./ServiceAccordianItem.module.css";

import type { ServiceDescription } from "./types";

type ServiceAccordianItemProps = {
  service: ServiceDescription;
  isExpanded: boolean;
  onClick: () => void;
};

const PlusIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16 6V26M6 16H26"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MinusIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6 16H26"
      stroke="currentColor"
      strokeWidth="2"
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
    <div className={styles.serviceItem}>
      <button className={styles.serviceClick} onClick={onClick}>
        <span className={`${styles.serviceTitle} ${isExpanded ? styles.serviceTitleExpanded : ""}`}>
          {service.title}
        </span>
        <span className={`${styles.toggle} ${isExpanded ? styles.toggleExpanded : ""}`}>
          {isExpanded ? <MinusIcon /> : <PlusIcon />}
        </span>
      </button>

      <div className={`${styles.description} ${isExpanded ? styles.descriptionExpanded : ""}`}>
        <p>{service.description}</p>
      </div>
    </div>
  );
};
