"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import type { ImpactMetric } from "@/api/impactMetric";

import { getImpactMetric, updateImpactMetric } from "@/api/impactMetric";
import { useAdmin } from "@/components/admin-portal/AdminContext";
import { HeaderSection } from "@/components/admin-portal/HeaderSection";
import { PreviewMode } from "@/components/admin-portal/preview-components/PreviewMode";
import { PreviewNavBar } from "@/components/admin-portal/preview-components/PreviewNavBar";
import { PublishButton } from "@/components/admin-portal/PublishButton";
import { RevertButton } from "@/components/admin-portal/RevertButton";
import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import { ImpactSection } from "@/components/ImpactSection";

const MONTH_ABBREVS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];
const DESCRIPTION_MAX = 180;

function parseLastUpdated(lastUpdated: string): { month: string; year: string } {
  const [year, month] = lastUpdated.split("-");
  const monthIndex = Number.parseInt(month ?? "1", 10) - 1;
  return {
    month: MONTH_ABBREVS[monthIndex] ?? "JAN",
    year: year ?? "",
  };
}

export default function ImpactMetricsEditor() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);
  const [originalMetrics, setOriginalMetrics] = useState<ImpactMetric[]>([]);
  const [metrics, setMetrics] = useState<ImpactMetric[]>([]);
  const [lastUpdated, setLastUpdated] = useState("");
  const [showRevertDialog, setShowRevertDialog] = useState(false);
  const [showBackDialog, setShowBackDialog] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const { setHasChanges } = useAdmin();

  useEffect(() => {
    async function loadMetrics() {
      try {
        const data = await getImpactMetric();
        const sorted = [...data.metrics].sort((a, b) => a.order - b.order);
        setOriginalMetrics(sorted);
        setMetrics(sorted);
        setLastUpdated(data.lastUpdated);
      } catch (error) {
        console.error("Failed to fetch impact metrics:", error);
      } finally {
        setLoading(false);
      }
    }
    void loadMetrics();
  }, []);

  function handleFieldChange(
    order: number,
    field: keyof Pick<ImpactMetric, "subtitle" | "statistic" | "description">,
    value: string,
  ) {
    setMetrics((prev) => prev.map((m) => (m.order === order ? { ...m, [field]: value } : m)));
  }

  function handleRevert() {
    setMetrics(originalMetrics);
  }

  async function handlePublish() {
    setIsPublishing(true);
    try {
      await updateImpactMetric(metrics);
      router.push("/admin-portal");
    } catch (error) {
      console.error("Failed to publish impact metrics:", error);
      setIsPublishing(false);
    }
  }

  const hasChanges = metrics.some((m, i) => {
    const orig = originalMetrics[i];
    return (
      orig &&
      (m.subtitle !== orig.subtitle ||
        m.statistic !== orig.statistic ||
        m.description !== orig.description)
    );
  });

  useEffect(() => {
    function handleBeforeUnload(e: BeforeUnloadEvent) {
      if (hasChanges) e.preventDefault();
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasChanges]);

  useEffect(() => {
    setHasChanges(hasChanges);
  }, [hasChanges]);

  useEffect(() => {
    return () => setHasChanges(false);
  }, []);
  const publishButton = (
    <PublishButton
      handleClick={() => void handlePublish()}
      disabled={!hasChanges || isPublishing}
    />
  );

  if (loading) return null;

  const { month, year } = parseLastUpdated(lastUpdated);

  if (isPreview) {
    return (
      <PreviewMode onBack={() => setIsPreview(false)} publishButton={publishButton}>
        <div className="bg-white rounded-[10px] overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.1)] w-full">
          <PreviewNavBar activeItem="Home" />
          <ImpactSection data={{ metrics, lastUpdated }} />
        </div>
      </PreviewMode>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <HeaderSection
        title="Impact Metrics"
        tags={["HOME", "DONORS"]}
        description="Input total money raised, how many members f3 has worldwide, and how many organizations
          have been supported, along with the date last updated."
        onBack={() => (hasChanges ? setShowBackDialog(true) : router.push("/admin-portal"))}
        onPreview={() => setIsPreview(true)}
      />

      <div className="flex flex-col items-center px-[100px] py-[50px]">
        <div className="flex flex-col gap-[25px] w-[585px]">
          {metrics.map((metric, idx) => (
            <div key={metric._id ?? metric.order} className="flex flex-col gap-[25px]">
              <h2 className="font-dm-sans font-medium text-[24px] text-[#1E1E1E] tracking-[-0.48px]">
                Edit Metric {metric.order + 1}
              </h2>

              <div className="flex items-center justify-between">
                <span className="font-dm-sans font-semibold text-[16px] text-[#1E1E1E]">
                  Title:
                </span>
                <input
                  aria-label={`Metric ${metric.order + 1} title`}
                  className="bg-[#F4F4F4] border border-[#C7C7C7] px-[15px] py-[10px] rounded-[10px] w-[337px] font-dm-sans text-[16px] text-[#5D5D5D] outline-none"
                  value={metric.subtitle}
                  onChange={(e) => handleFieldChange(metric.order, "subtitle", e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-dm-sans font-semibold text-[16px] text-[#1E1E1E] leading-[1.5]">
                    Number:
                  </span>
                  <span className="font-dm-sans text-[12px] text-[#5D5D5D] leading-[16px]">
                    If metric is a Dollar amount, include &apos;$&apos;
                  </span>
                </div>
                <input
                  aria-label={`Metric ${metric.order + 1} number`}
                  className="bg-[#F4F4F4] border border-[#C7C7C7] px-[15px] py-[10px] rounded-[10px] w-[337px] font-dm-sans text-[16px] text-[#5D5D5D] outline-none"
                  value={metric.statistic}
                  onChange={(e) => handleFieldChange(metric.order, "statistic", e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-[10px]">
                <span className="font-dm-sans font-semibold text-[16px] text-[#1E1E1E]">
                  Description:
                </span>
                <textarea
                  aria-label={`Metric ${metric.order + 1} description`}
                  className="bg-[#F4F4F4] border border-[#C7C7C7] h-[116px] px-[15px] py-[10px] rounded-[10px] w-full font-dm-sans text-[16px] text-[#5D5D5D] outline-none resize-none leading-[24px]"
                  maxLength={DESCRIPTION_MAX}
                  value={metric.description}
                  onChange={(e) => handleFieldChange(metric.order, "description", e.target.value)}
                />
                <span className="font-dm-sans text-[12px] text-[#5D5D5D] text-right">
                  Characters: {metric.description?.length ?? 0}/{DESCRIPTION_MAX}
                </span>
              </div>

              {idx < metrics.length - 1 && <hr className="border-[#C7C7C7]" />}
            </div>
          ))}

          <div className="flex items-center justify-between">
            <span className="font-dm-sans font-semibold text-[16px] text-[#1E1E1E]">
              Last Updated:
            </span>
            <div className="flex items-center w-[337px]">
              <div className="bg-[#F4F4F4] border border-[#C7C7C7] flex items-center px-[15px] py-[10px] rounded-[10px] w-[137px]">
                <span className="font-dm-sans text-[16px] text-[#5D5D5D]">{month}</span>
              </div>
              <span className="font-dm-sans font-semibold text-[16px] text-[#1E1E1E] px-[10px]">
                /
              </span>
              <div className="bg-[#F4F4F4] border border-[#C7C7C7] flex items-center px-[15px] py-[10px] rounded-[10px] w-[173px]">
                <span className="font-dm-sans text-[16px] text-[#5D5D5D]">{year}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-[25px] items-center justify-end">
            <RevertButton
              handleClick={() => setShowRevertDialog(true)}
              disabled={!hasChanges || isPublishing}
            />
            {publishButton}
          </div>
        </div>
      </div>

      <ConfirmationDialog
        open={showBackDialog}
        onClose={() => setShowBackDialog(false)}
        title="Are You Sure?"
        body="Are you sure you want to go back? Your changes will not be saved. This action cannot be undone."
        cancelLabel="Cancel"
        confirmLabel="YES, GO BACK"
        onConfirm={() => router.push("/admin-portal")}
      />

      <ConfirmationDialog
        open={showRevertDialog}
        onClose={() => setShowRevertDialog(false)}
        title="Are You Sure?"
        body="Are you sure you want to revert all changes made? This action cannot be undone."
        cancelLabel="Cancel"
        confirmLabel="YES, REVERT"
        onConfirm={() => {
          handleRevert();
          setShowRevertDialog(false);
        }}
      />
    </div>
  );
}
