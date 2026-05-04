"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type LogoCarouselItem = {
  _id?: string;
  name: string;
  imageUrl: string;
  order: number;
};

type LogoCarouselSectionProps<T extends LogoCarouselItem> = {
  title: string;
  description: string;
  fetchItems: () => Promise<T[]>;
};

export const LogoCarouselSection = <T extends LogoCarouselItem>({
  title,
  description,
  fetchItems,
}: LogoCarouselSectionProps<T>) => {
  const [items, setItems] = useState<T[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1200);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const data = await fetchItems();
        setItems(data);
      } catch (error) {
        console.error(error);
      }
    };

    void loadItems();
  }, [fetchItems]);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  const repeated = useMemo(() => {
    if (items.length === 0) return [];

    const sortedItems = [...items].sort((a, b) => a.order - b.order);
    const singleSetWidth = sortedItems.length * 260;
    const rawCopies = Math.ceil((containerWidth * 2) / singleSetWidth);
    const copies = Math.max(4, rawCopies % 2 === 0 ? rawCopies : rawCopies + 1);

    return Array.from({ length: copies }, (_, copyIndex) =>
      sortedItems.map((item) => ({
        ...item,
        uniqueKey: `${item._id ?? item.name}-copy${copyIndex}`,
      })),
    ).flat();
  }, [items, containerWidth]);

  return (
    <div className="flex flex-col px-[100px] pt-[100px] justify-center items-start">
      <p className="text-[#172447] text-[48px] mb-[20px] font-medium tracking-[-0.96px]">{title}</p>
      <p className="text-[20px] max-w-[1073px]">{description}</p>
      <div
        ref={containerRef}
        className="w-full py-[50px] overflow-hidden flex items-center relative"
      >
        <div className="pointer-events-none absolute left-0 top-0 h-full w-[200px] bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-[200px] bg-gradient-to-l from-white to-transparent z-10" />
        <div className="flex animate-marquee whitespace-nowrap gap-[40px] py-[18px]">
          {repeated.map((item) => (
            <div key={item.uniqueKey} className="flex items-center h-[114px] shrink-0">
              <Image
                src={item.imageUrl}
                alt={item.name}
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
