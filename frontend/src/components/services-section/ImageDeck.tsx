"use client";

import Image from "next/image";
import React from "react";

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

// Position left values for each position
const POSITION_LEFT = [100, 60, 30, 0];
const POSITION_LEFT_MOBILE = [80, 50, 25, 0];

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
    <div className="relative w-full max-w-[500px] h-[500px] shrink-0 lg:w-[600px] lg:max-w-none lg:h-[658px]">
      {DEFAULT_SERVICES.map((service, index) => {
        const position = getPosition(index);
        const config = POSITION_CONFIGS[position];

        return (
          <div
            key={service.id}
            className="absolute bottom-0 rounded-lg overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-all duration-500"
            style={{
              zIndex: config.zIndex,
              width: config.width,
              height: config.height,
              transform: `rotate(${config.rotation}deg)`,
              left: POSITION_LEFT[position],
            }}
          >
            <Image
              src={service.image.src}
              alt={service.image.alt}
              fill
              className="block w-full h-full object-cover"
            />
            {config.hasOverlay && (
              <div className="absolute inset-0 bg-black/40 pointer-events-none" />
            )}
          </div>
        );
      })}
    </div>
  );
};
