"use client";

import React, { useState } from "react";

import { ImageDeck } from "./ImageDeck";
import { ServiceAccordian } from "./ServiceAccordian";
import styles from "./ServicesSection.module.css";

export const ServicesSection = () => {
  const [activeID, setActiveID] = useState("MicroLoans");

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Services We Offer</h2>
        <div className={styles.content}>
          <ImageDeck activeID={activeID} />
          <ServiceAccordian activeID={activeID} onServiceChange={(id) => setActiveID(id)} />
        </div>
      </div>
    </section>
  );
};
