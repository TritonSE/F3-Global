"use client";
import { useEffect, useMemo, useState } from "react";

import { getImpactMetric, type ImpactMetric } from "@/api/impactMetric";

type ImpactSectionProps = {
  title?: string;
};

function formatDate(dateStr: string) {
  const [yearStr, monthStr] = dateStr.split("-");
  const year = Number(yearStr);
  const month = Number(monthStr) - 1;

  return new Date(year, month).toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export const ImpactSection = ({ title = "Our Impact" }: ImpactSectionProps) => {
  const [impactMetrics, setImpactMetrics] = useState<ImpactMetric[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    const fetchImpactMetrics = async () => {
      try {
        const data = await getImpactMetric();
        setImpactMetrics(data.metrics);
        setLastUpdated(data.lastUpdated);
      } catch (error) {
        console.error(error);
      }
    };

    void fetchImpactMetrics();
  }, []);

  const orderedMetrics = useMemo(() => {
    return [...impactMetrics].sort((a, b) => a.order - b.order);
  }, [impactMetrics]);

  const formattedDate = formatDate(lastUpdated);

  return (
    <div className="relative z-20 w-full py-[75px] px-[5vw] flex gap-6 flex-col items-start border-t border-[#F4F4F4] bg-white shadow-[inset_0_-12px_10px_rgba(0,0,0,0.02)]">
      <h3 className="text-[#172447] font-dm text-[48px] font-medium leading-[1.5] tracking-[-0.96px]">
        {title}
      </h3>
      <div className="self-stretch flex justify-between items-start p-[25px] rounded-[10px] bg-[#F4F4F4]">
        {orderedMetrics.map((metric, idx) => (
          <div key={metric.order} className="contents">
            <div className="w-[375px] flex flex-col items-start self-stretch">
              <h4 className="text-[#012060] font-ethic text-[64px] font-light leading-[1.1]">
                {metric.statistic}
              </h4>
              <p className="text-[#1E1E1E] font-dm text-[20px] font-semibold leading-[1.5]">
                {metric.subtitle}
              </p>
              <p className="text-[#5D5D5D] font-dm text-[16px] font-normal leading-[1.5]">
                {metric.description}
              </p>
            </div>

            {idx < orderedMetrics.length - 1 && (
              <div className="w-[2px] h-[196px] bg-[#C7C7C7] mx-[35px] self-center"></div>
            )}
          </div>
        ))}
      </div>
      <p className="text-[#5D5D5D] font-dm text-[16px] font-bold leading-[1.5] mt-4 self-start uppercase">
        *Data from {formattedDate}
      </p>
    </div>
  );
};
