"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { TimelineMilestoneBlock } from "./TimelineMilestoneBlock";

import { getAllTimeline } from "@/api/timeline";

type TimelineItem = {
  _id: string;
  year: number;
  description: string;
  imageUrl: string;
};

export const UpdatedTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<Array<HTMLDivElement | null>>([]);
  const firstDotRef = useRef<HTMLDivElement>(null);
  const lastDotRef = useRef<HTMLDivElement>(null);
  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lineStyle, setLineStyle] = useState<{ top: number; height: number }>({
    top: 0,
    height: 0,
  });

  useEffect(() => {
    let isMounted = true;

    const loadTimeline = async () => {
      try {
        const items = await getAllTimeline();
        if (!isMounted) return;

        setTimelineItems(items);
      } catch {
        if (!isMounted) return;
        setTimelineItems([]);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadTimeline();

    return () => {
      isMounted = false;
    };
  }, []);

  const updateLineStyle = useCallback(() => {
    if (!containerRef.current || !firstDotRef.current || !lastDotRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const firstDotRect = firstDotRef.current.getBoundingClientRect();
    const lastDotRect = lastDotRef.current.getBoundingClientRect();

    const firstDotCenter = firstDotRect.top + firstDotRect.height / 2 - containerRect.top;
    const lastDotCenter = lastDotRect.top + lastDotRect.height / 2 - containerRect.top;

    setLineStyle({
      top: firstDotCenter - firstDotRect.height / 2,
      height: lastDotCenter + lastDotRect.height / 2 - (firstDotCenter - firstDotRect.height / 2),
    });
  }, []);

  useEffect(() => {
    updateLineStyle();
    window.addEventListener("resize", updateLineStyle);
    return () => window.removeEventListener("resize", updateLineStyle);
  }, [updateLineStyle]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      updateLineStyle();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [isLoading, timelineItems.length, updateLineStyle]);

  useEffect(() => {
    const updateActiveMilestone = () => {
      const viewportCenter = window.innerHeight / 2;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      rowRefs.current.forEach((row, index) => {
        if (!row) return;
        const rect = row.getBoundingClientRect();
        const rowCenter = rect.top + rect.height / 2;
        const distance = Math.abs(rowCenter - viewportCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    const handleScrollOrResize = () => {
      window.requestAnimationFrame(updateActiveMilestone);
    };

    updateActiveMilestone();
    window.addEventListener("scroll", handleScrollOrResize, { passive: true });
    window.addEventListener("resize", handleScrollOrResize);

    return () => {
      window.removeEventListener("scroll", handleScrollOrResize);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, []);

  const sortedTimelineItems = [...timelineItems].sort((left, right) => left.year - right.year);
  const lastIndex = sortedTimelineItems.length - 1;

  return (
    <section className="w-full">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div ref={containerRef} className="relative mt-16 lg:mt-20">
          <div
            className="absolute left-1/2 hidden w-[2px] -translate-x-1/2 bg-[#213363]/70 md:block"
            style={{ top: lineStyle.top, height: lineStyle.height }}
          />

          <div className="space-y-12 md:space-y-14">
            {isLoading ? (
              <div className="py-10 text-center font-dm text-[18px] text-[#5d5d5d]">
                Loading timeline...
              </div>
            ) : sortedTimelineItems.length === 0 ? (
              <div className="py-10 text-center font-dm text-[18px] text-[#5d5d5d]">
                No timeline data available.
              </div>
            ) : (
              sortedTimelineItems.map((step, index) => {
                const isLeft = index % 2 === 0;

                return (
                  <div
                    key={step.year}
                    ref={(el) => {
                      rowRefs.current[index] = el;
                    }}
                    className="relative grid grid-cols-1 md:grid-cols-[1fr_110px_1fr] lg:grid-cols-[1fr_130px_1fr]"
                  >
                    <div className={`${isLeft ? "md:col-start-1" : "md:col-start-3"}`}>
                      <TimelineMilestoneBlock
                        year={step.year}
                        description={step.description}
                        imageSrc={step.imageUrl}
                        imageAlt={`Timeline ${step.year}`}
                        align={isLeft ? "left" : "right"}
                        isActive={activeIndex === index}
                      />
                    </div>

                    <div
                      ref={index === 0 ? firstDotRef : index === lastIndex ? lastDotRef : undefined}
                      className={`absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border-[2px] transition-colors duration-500 md:h-8 md:w-8 ${
                        index === activeIndex
                          ? "border-black bg-black"
                          : "border-[#213363]/70 bg-white"
                      }`}
                    />
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
