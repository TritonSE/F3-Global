"use client";

import Image from "next/image";
import React from "react";

import { DEFAULT_SERVICES } from "./types";

type ImageDeckProps = {
  activeID: string;
};

// Card configuration for each position
const POSITION_CONFIGS = [
  { width: 501, height: 658, rotation: 0, hasOverlay: false, zIndex: 4, bottom: 0, opacity: 1 }, // Front
  { width: 418, height: 530, rotation: -3.86, hasOverlay: true, zIndex: 3, bottom: 80, opacity: 1 }, // Second
  {
    width: 340,
    height: 470,
    rotation: -5.96,
    hasOverlay: true,
    zIndex: 2,
    bottom: 110,
    opacity: 1,
  }, // Third
  {
    width: 340,
    height: 470,
    rotation: -5.96,
    hasOverlay: true,
    zIndex: 1,
    bottom: 110,
    opacity: 0,
  }, // Fourth (fades and shrinks away)
];

// Position left values for each position
const POSITION_LEFT = [120, 95, 55, 55];

export const ImageDeck = ({ activeID }: ImageDeckProps) => {
  const activeIndex = DEFAULT_SERVICES.findIndex((service) => service.id === activeID);

  // Calculate position for each card based on active index
  const getPosition = (cardIndex: number): number => {
    // Reverse the calculation to make the cards cycle "backward"
    // so the front card (0) moves to the back (3) when a new one is selected
    let position = (cardIndex - activeIndex) % DEFAULT_SERVICES.length;
    if (position < 0) {
      position += DEFAULT_SERVICES.length;
    }

    // Invert the position mapping so 0 -> 0, 1 -> 3, 2 -> 2, 3 -> 1
    // This makes the active card front, and the *previously active* card move to position 3 (fading away)
    if (position === 1) return 3;
    if (position === 3) return 1;
    return position;
  };

  return (
    <div className="relative w-[600px] h-[658px] shrink-0">
      {DEFAULT_SERVICES.map((service, index) => {
        const position = getPosition(index);
        const config = POSITION_CONFIGS[position];

        return (
          <div
            key={service.id}
            className={`absolute bottom-0 rounded-lg overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
              position === 0 ? "z-10" : ""
            }`}
            style={{
              zIndex: config.zIndex,
              width: config.width,
              height: config.height,
              transform: `rotate(${config.rotation}deg)`,
              transformOrigin: "bottom right",
              left: POSITION_LEFT[position],
              bottom: config.bottom,
              opacity: config.opacity,
            }}
          >
            <Image
              src={service.image.src}
              alt={service.image.alt}
              fill
              className="block w-full h-full object-cover"
            />
            <div
              className={`absolute inset-0 bg-black pointer-events-none transition-opacity duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                config.hasOverlay ? "opacity-30" : "opacity-0"
              }`}
            />
          </div>
        );
      })}
    </div>
  );
};
