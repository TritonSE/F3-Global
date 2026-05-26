"use client";
import { Fragment, useEffect, useMemo, useState } from "react";

import { getImpactMetric, type ImpactMetric } from "@/api/impactMetric";

type ImpactData = {
  metrics: ImpactMetric[];
  lastUpdated: string;
};

type ImpactSectionProps = {
  title?: string;
  data?: ImpactData;
};

function formatDate(dateStr: string) {
  const [yearStr, monthStr] = dateStr.split("-");
  const year = Number(yearStr);
  const month = Number(monthStr) - 1;
  return new Date(year, month).toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export const ImpactSection = ({ title = "Our Impact", data }: ImpactSectionProps) => {
  const [fetchedData, setFetchedData] = useState<ImpactData | null>(null);

  useEffect(() => {
    if (data) return; // skip fetch if data is passed in
    const fetchImpactMetrics = async () => {
      try {
        const result = await getImpactMetric();
        setFetchedData({ metrics: result.metrics, lastUpdated: result.lastUpdated });
      } catch (error) {
        console.error(error);
      }
    };
    void fetchImpactMetrics();
  }, [data]);

  const activeData = data ?? fetchedData;

  const orderedMetrics = useMemo(() => {
    return [...(activeData?.metrics ?? [])].sort((a, b) => a.order - b.order);
  }, [activeData]);

  const formattedDate = activeData?.lastUpdated ? formatDate(activeData.lastUpdated) : "";

  return (
    <div className="relative z-20 w-full flex flex-col items-start gap-[20px] border-t border-[#F4F4F4] bg-white px-[30px] py-[50px] shadow-[0px_19px_43px_0px_rgba(0,0,0,0.1)] md:gap-6 md:px-[100px] md:py-[50px] shadow-[inset_0_-12px_10px_rgba(0,0,0,0.02)]">
      <h3 className="text-[#172447] font-dm-sans text-[28px] font-medium leading-[1.5] tracking-[-0.56px] md:text-[48px] md:tracking-[-0.96px]">
        {title}
      </h3>
      <div className="self-stretch flex flex-col items-start gap-[20px] rounded-[10px] bg-[#F4F4F4] p-[25px] md:flex-row md:justify-between md:items-start md:gap-0">
        {orderedMetrics.map((metric, idx) => (
          <Fragment key={metric.order}>
            <div className="flex w-full flex-col items-start md:w-[375px]">
              <h4 className="text-[#012060] font-ethic text-[48px] font-light leading-[1.1] md:text-[64px]">
                {metric.statistic}
              </h4>
              <p className="text-[#1E1E1E] font-dm-sans text-[14px] font-semibold leading-[1.5] md:text-[20px]">
                {metric.subtitle}
              </p>
              <p className="text-[#5D5D5D] font-dm-sans text-[12px] font-normal leading-[16px] md:text-[16px] md:leading-[1.5]">
                {metric.description}
              </p>
            </div>
            {idx < orderedMetrics.length - 1 && (
              <div className="bg-[#C7C7C7] h-px w-full md:mx-[35px] md:self-center md:block md:h-[196px] md:w-[2px]" />
            )}
          </Fragment>
        ))}
      </div>
      {formattedDate && (
        <p className="mt-4 self-start text-[#5D5D5D] font-dm-sans text-[12px] font-bold leading-[1.5] uppercase md:text-[16px]">
          *Data from {formattedDate}
        </p>
      )}
    </div>
  );
};
