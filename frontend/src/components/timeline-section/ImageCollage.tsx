"use client";

import Image from "next/image";
import React from "react";

import { TIMELINE_IMAGES } from "./types";

// Positions
const IMAGE_POSITIONS = [
  { left: 970, top: 20, width: 250, height: 326, rotate: 0 },
  { left: 519, top: 62, width: 402, height: 526, rotate: 0 },
  { left: -134, top: 127, width: 544, height: 415, rotate: 90 },
  { left: 1138, top: 164, width: 378, height: 495, rotate: 0 },
  { left: 260, top: 565, width: 345, height: 263, rotate: 90 },
  { left: 808, top: 639, width: 495, height: 378, rotate: 90 },
];

export const ImageCollage = () => {
  return (
    <>
      {TIMELINE_IMAGES.map((image, index) => {
        const pos = IMAGE_POSITIONS[index];
        if (!pos) return null;

        return (
          <div
            key={image.src}
            className="absolute overflow-hidden rounded-lg"
            style={{
              left: pos.left,
              top: pos.top,
              width: pos.width,
              height: pos.height,
              transform: pos.rotate ? `rotate(${pos.rotate}deg)` : undefined,
            }}
          >
            <Image src={image.src} alt={image.alt} fill className="object-cover" />
          </div>
        );
      })}
    </>
  );
};
