"use client";
import { useEffect, useState } from "react";

import { TimelineDisplay } from "./TimelineDisplay";

import { getTimelines, type TimelineItem } from "@/api/timeline";

export const UpdatedTimeline = () => {
  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadTimeline = async () => {
      try {
        const items = await getTimelines();
        if (isMounted) setTimelineItems(items);
      } catch {
        if (isMounted) setTimelineItems([]);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    void loadTimeline();
    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading)
    return (
      <div className="py-10 text-center font-dm text-[18px] text-[#5d5d5d]">
        Loading timeline...
      </div>
    );

  return <TimelineDisplay items={timelineItems} />;
};
