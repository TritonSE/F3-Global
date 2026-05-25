"use client";

import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import type { ImpactMetric } from "@/api/impactMetric";

import { getImpactMetric, updateImpactMetric } from "@/api/impactMetric";
import { useAdmin } from "@/components/admin-portal/AdminContext";
import { PublishButton } from "@/components/admin-portal/PublishButton";
import { RevertButton } from "@/components/admin-portal/RevertButton";
import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import { auth } from "@/firebase/firebase";

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
  const { setHasChanges } = useAdmin();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setLoading(false);
        router.push("/login");
      } else {
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
      }
    });
    return () => unsubscribe();
  }, [router]);

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

  if (loading) return null;

  const { month, year } = parseLastUpdated(lastUpdated);

  return (
    <div className="bg-white min-h-screen">
      <header className="border-b border-[#C7C7C7] flex flex-col gap-[10px] items-start justify-center px-[100px] py-[50px]">
        <button
          type="button"
          aria-label="Go back to admin portal"
          onClick={() => (hasChanges ? setShowBackDialog(true) : router.push("/admin-portal"))}
          className="group flex gap-[10px] items-center cursor-pointer py-[12px] pr-[15px] transition-transform duration-350 hover:-translate-x-2"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="#1e1e1e"
            className="size-[24px] transition-transform duration-350 group-hover:-translate-x-1"
          >
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
          <span className="font-dm-sans font-semibold text-[16px] text-[#1E1E1E]">BACK</span>
        </button>

        <div className="flex items-center justify-between w-full">
          <h1 className="font-dm-sans font-medium text-[32px] text-[#1E1E1E] tracking-[-0.64px]">
            Impact Metrics
          </h1>
          <button
            type="button"
            disabled
            className="bg-[#012060] flex gap-[10px] items-center justify-center px-[20px] py-[10px] rounded-[99px] cursor-pointer"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="white" className="size-[32px]">
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
            </svg>
            <span className="font-dm-sans font-semibold text-[16px] text-white">PREVIEW</span>
          </button>
        </div>

        <div className="flex gap-[10px] items-center">
          <div className="bg-[#F4F4F4] px-[10px] py-[5px] rounded-[10px]">
            <span className="font-dm-sans font-semibold text-[12px] text-[#5d5d5d]">HOME</span>
          </div>
          <div className="bg-[#F4F4F4] px-[10px] py-[5px] rounded-[10px]">
            <span className="font-dm-sans font-semibold text-[12px] text-[#5d5d5d]">DONORS</span>
          </div>
        </div>

        <p className="font-dm-sans text-[14px] text-[#5D5D5D] leading-[20px]">
          Input total money raised, how many members f3 has worldwide, and how many organizations
          have been supported, along with the date last updated.
        </p>
      </header>

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
            <PublishButton
              handleClick={() => void handlePublish()}
              disabled={!hasChanges || isPublishing}
            />
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
