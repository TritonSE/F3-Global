"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { TimelineMilestoneBlock } from "./TimelineMilestoneBlock";

import { getTimelines } from "@/api/timeline";

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
        const items = await getTimelines();
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
      <div className="mx-auto max-w-[1400px] lg:px-10">
        <div
          ref={containerRef}
          className="relative py-[25px] mb-[50px] md:py-0 md:mb-0 lg:my-[88px]"
        >
          <div
            className="absolute hidden w-[2px] bg-[#213363]/70 md:block md:left-1/2 md:-translate-x-1/2 left-[20px]"
            style={{ top: lineStyle.top, height: lineStyle.height }}
          />
          <div
            className="absolute md:hidden w-[2px] bg-[#213363]/70 left-[39px]"
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
                    className="relative grid grid-cols-[60px_1fr] md:grid-cols-[1fr_110px_1fr] lg:grid-cols-[1fr_130px_1fr]"
                  >
                    {/* mobile */}
                    <div className="md:hidden col-start-2 pl-[10px]">
                      <TimelineMilestoneBlock
                        year={step.year}
                        description={step.description}
                        imageSrc={step.imageUrl}
                        imageAlt={`Timeline ${step.year}`}
                        align="left"
                        isActive={activeIndex === index}
                      />
                    </div>

                    <div
                      className={`hidden md:block ${isLeft ? "md:col-start-1" : "md:col-start-3"}`}
                    >
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
                      className={`absolute h-[20px] w-[20px] rounded-full border-[2px] transition-colors duration-[1500ms] ease-out md:top-1/2 md:-translate-x-1/2 md:left-1/2 md:-translate-y-1/2 md:h-8 md:w-8 left-[30px] top-[8px] ${
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
