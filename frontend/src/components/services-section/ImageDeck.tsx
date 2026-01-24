"use client";

import Image from "next/image";
import React from "react";

import styles from "./ImageDeck.module.css";
import { DEFAULT_SERVICES } from "./types";

type ImageDeckProps = {
  activeID: string;
};

// Card configuration for each position
const POSITION_CONFIGS = [
  { width: 501, height: 658, rotation: 0, hasOverlay: false, zIndex: 4 }, // Front
  { width: 375, height: 537, rotation: -3.86, hasOverlay: true, zIndex: 3 }, // Second
  { width: 375, height: 537, rotation: -3.86, hasOverlay: true, zIndex: 2 }, // Third
  { width: 327, height: 473, rotation: -5.96, hasOverlay: false, zIndex: 1 }, // Back
];

export const ImageDeck = ({ activeID }: ImageDeckProps) => {
  const activeIndex = DEFAULT_SERVICES.findIndex((service) => service.id === activeID);

  // Calculate position for each card based on active index
  const getPosition = (cardIndex: number): number => {
    let position = cardIndex - activeIndex;
    if (position < 0) {
      position += DEFAULT_SERVICES.length;
    }
    return position;
  };

  return (
    <div className={styles.deck}>
      {DEFAULT_SERVICES.map((service, index) => {
        const position = getPosition(index);
        const config = POSITION_CONFIGS[position];

        return (
          <div
            key={service.id}
            className={`${styles.card} ${styles[`position${position}`]}`}
            style={{
              zIndex: config.zIndex,
              width: config.width,
              height: config.height,
              transform: `rotate(${config.rotation}deg)`,
            }}
          >
            <Image src={service.image.src} alt={service.image.alt} fill className={styles.image} />
            {config.hasOverlay && <div className={styles.overlay} />}
          </div>
        );
      })}
    </div>
  );
};
