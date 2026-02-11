"use client";

import Image from "next/image";

import { TIMELINE_IMAGES } from "./types";

type PhotoStackProps = {
  activeIndex: number;
};

const POSITION_CONFIGS = [
  { width: 501, height: 658, rotation: 0, hasOverlay: false, zIndex: 3 },
  { width: 375, height: 537, rotation: -3.86, hasOverlay: true, zIndex: 2 },
  { width: 327, height: 473, rotation: -5.96, hasOverlay: true, zIndex: 1 },
];

const POSITION_LEFT = [100, 50, 0];

export const PhotoStack = ({ activeIndex }: PhotoStackProps) => {
  const getPosition = (imageIndex: number): number => {
    let position = imageIndex - activeIndex;
    if (position < 0) {
      position += TIMELINE_IMAGES.length;
    }
    return position;
  };

  return (
    <div className="relative w-[625px] h-[658px] shrink-0">
      {TIMELINE_IMAGES.map((image, index) => {
        const position = getPosition(index);
        const config = POSITION_CONFIGS[position];

        return (
          <div
            key={image.src}
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
              src={image.src}
              alt={image.alt}
              fill
              className="block w-full h-full object-cover"
            />
            {config.hasOverlay && (
              <div className="absolute inset-0 bg-black/40 pointer-events-none rounded-lg" />
            )}
          </div>
        );
      })}
    </div>
  );
};
