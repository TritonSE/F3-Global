"use client";
import { useEffect, useMemo, useRef, useState } from "react";

import type { Client } from "@/api/client";

import { getAllClients } from "@/api/client";

export const ClientCarousel = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1200);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await getAllClients();
        setClients(data);
      } catch (error) {
        console.error(error);
      }
    };

    void fetchClients();
  }, []);

  // track container width for responsive item count
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const repeated = useMemo(() => {
    if (clients.length === 0) return [];

    const singleSetWidth = clients.length * 260;
    const rawCopies = Math.ceil((containerWidth * 2) / singleSetWidth);
    // round up to nearest even number so -50% lands on identical frame
    const copies = Math.max(4, rawCopies % 2 === 0 ? rawCopies : rawCopies + 1);

    return Array.from({ length: copies }, (_, copyIndex) =>
      clients.map((client) => ({
        ...client,
        uniqueKey: `${client._id}-copy${copyIndex}`,
      })),
    ).flat();
  }, [clients, containerWidth]);

  return (
    <div className="flex flex-col px-[100px] pt-[100px] justify-center items-start">
      <p className="text-[#172447] text-[48px] mb-[20px] font-medium tracking-[-0.96px]">
        Clients We've Supported
      </p>
      <p className="text-[20px] max-w-[1073px]">
        Over the years, F3 Global has supported entrepreneurs and small businesses across diverse
        communities, helping turn ideas into sustainable ventures. We’re proud to have worked with
        organizations and founders who trust us as partners in their growth. Explore a few of the
        businesses we’ve served and hear directly from the people behind them.
      </p>
      <div
        ref={containerRef}
        className="w-full py-[50px] overflow-hidden flex items-center relative"
      >
        <div className="pointer-events-none absolute left-0 top-0 h-full w-[200px] bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-[200px] bg-gradient-to-l from-white to-transparent z-10" />
        <div className="flex animate-marquee whitespace-nowrap gap-[40px] py-[18px]">
          {repeated.map((client) => (
            <div key={client.uniqueKey} className="flex items-center h-[114px] shrink-0">
              <img
                src={client.imageUrl}
                alt={client.name}
                className="object-contain h-full w-auto max-w-[220px]"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
