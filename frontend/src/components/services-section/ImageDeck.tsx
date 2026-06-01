"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

import { DEFAULT_SERVICES } from "./types";

type ImageDeckProps = {
  activeID: string;
};

const NATURAL_WIDTH = 600;
const NATURAL_HEIGHT = 658;

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

const POSITION_LEFT = [120, 95, 55, 55];

export const ImageDeck = ({ activeID }: ImageDeckProps) => {
  const activeIndex = DEFAULT_SERVICES.findIndex((service) => service.id === activeID);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const available = entry.contentRect.width;
      setScale(Math.min(1, available / NATURAL_WIDTH));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const getPosition = (cardIndex: number): number => {
    let position = (cardIndex - activeIndex) % DEFAULT_SERVICES.length;
    if (position < 0) {
      position += DEFAULT_SERVICES.length;
    }

    if (position === 1) return 3;
    if (position === 3) return 1;
    return position;
  };

  return (
    <div ref={wrapperRef} className="relative w-full" style={{ height: NATURAL_HEIGHT * scale }}>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: NATURAL_WIDTH,
          height: NATURAL_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: "bottom left",
        }}
      >
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
    </div>
  );
};
