"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

import type { Affiliate } from "@/api/affiliates";

import { getAllAffiliates } from "@/api/affiliates";

export const AffiliateCarousel = () => {
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1200);

  useEffect(() => {
    const fetchAffiliates = async () => {
      try {
        const data = await getAllAffiliates();
        setAffiliates(data);
      } catch (error) {
        console.error(error);
      }
    };

    void fetchAffiliates();
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  const repeated = useMemo(() => {
    if (affiliates.length === 0) return [];

    const sorted = [...affiliates].sort((a, b) => a.order - b.order);
    const singleSetWidth = sorted.length * 260;
    const rawCopies = Math.ceil((containerWidth * 2) / singleSetWidth);
    const copies = Math.max(4, rawCopies % 2 === 0 ? rawCopies : rawCopies + 1);

    return Array.from({ length: copies }, (_, copyIndex) =>
      sorted.map((affiliate) => ({
        ...affiliate,
        uniqueKey: `${affiliate._id ?? affiliate.name}-copy${copyIndex}`,
      })),
    ).flat();
  }, [affiliates, containerWidth]);

  return (
    <div className="flex flex-col px-[100px] pt-[100px] justify-center items-start">
      <p className="text-[#172447] text-[48px] mb-[20px] font-medium tracking-[-0.96px]">
        Our Affiliates
      </p>
      <p className="text-[20px] max-w-[1073px]">
        We're proud to work alongside organizations that share our commitment to economic empowerment and financial inclusion. These partnerships help us extend our reach and deepen our impact.
      </p>
      <div
        ref={containerRef}
        className="w-full py-[50px] overflow-hidden flex items-center relative"
      >
        <div className="pointer-events-none absolute left-0 top-0 h-full w-[200px] bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-[200px] bg-gradient-to-l from-white to-transparent z-10" />
        <div className="flex animate-marquee whitespace-nowrap gap-[40px] py-[18px]">
          {repeated.map((affiliate) => (
            <div key={affiliate.uniqueKey} className="flex items-center h-[114px] shrink-0">
              <Image
                src={affiliate.imageUrl}
                alt={affiliate.name}
                width={220}
                height={114}
                className="object-contain h-full w-auto max-w-[220px]"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
