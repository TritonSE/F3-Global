import Image from "next/image";
import React from "react";

import type { Highlight } from "@/components/Highlights";

export type HighlightCardProps = {
  highlight: Highlight;
  onLearnMore: (highlight: Highlight) => void;
  isActive?: boolean;
  onActivate?: () => void;
};

export function HighlightCard({
  highlight,
  onLearnMore,
  onActivate,
  isActive = false,
}: HighlightCardProps) {
  const handleCardClick = () => {
    if (!isActive) {
      onActivate?.();
    }
  };

  const handleLearnMoreClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isActive) {
      event.stopPropagation();
      onLearnMore(highlight);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isActive && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      onActivate?.();
    }
  };

  return (
    <div
      className={`relative flex flex-col items-center justify-center text-left transition-opacity duration-300 ${
        isActive
          ? "h-[536px] w-[468px] cursor-default rounded-[16px] bg-[#f4f4f4]"
          : "h-[359px] w-[322px] cursor-pointer rounded-[11px] bg-[#f4f4f4] opacity-60"
      }`}
      role={!isActive ? "button" : undefined}
      tabIndex={!isActive ? 0 : -1}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      aria-pressed={isActive}
    >
      <div
        className={`relative w-full overflow-hidden ${
          isActive ? "h-[256px] rounded-t-[16px]" : "h-[176px] rounded-t-[11px]"
        }`}
      >
        <Image
          src={highlight.imageUrl}
          alt={highlight.quote}
          fill
          className={isActive ? "rounded-t-[16px]" : "rounded-t-[11px]"}
          style={{ objectFit: "cover" }}
        />
        <div
          className={`pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(56,88,173,0)_52.539%,#172447_107.81%)] ${
            isActive ? "rounded-t-[16px]" : "rounded-t-[11px]"
          }`}
        />
      </div>
      <div
        className={`absolute flex transform items-center justify-center rounded-full bg-transparent -translate-y-1/2 ${
          isActive
            ? "right-[26px] top-[256px] h-[60px] w-[60px]"
            : "right-[18px] top-[176px] h-[41.24px] w-[41.24px]"
        }`}
      >
        <Image
          src="/imgs/quoteIcon.svg"
          alt="Quote Icon"
          width={isActive ? 60 : 41.24}
          height={isActive ? 60 : 41.24}
          className="flex-shrink-0"
        />
      </div>
      <div
        className={`relative flex w-full flex-1 flex-col overflow-y-auto rounded-b-[16px] ${
          isActive ? "gap-[24px] p-[32px_16px]" : "gap-[16.5px] p-[22px_11px]"
        }`}
      >
        <div
          className={`flex w-full min-h-0 flex-col overflow-y-auto ${
            isActive ? "gap-[8px] px-[20px] max-h-[180px]" : "gap-[5.5px] px-[13.8px]"
          }`}
        >
          <p
            className={`font-dm-sans font-semibold leading-[150%] text-[#1e1e1e] ${
              isActive ? "text-[24px]" : "text-[16.5px]"
            }`}
          >
            "{highlight.quote}"
          </p>
          <p
            className={`font-dm-sans font-normal text-[#5d5d5d] ${
              isActive ? "text-[16px] leading-6" : "text-[11px] leading-[16.5px]"
            }`}
          >
            {highlight.previewText}
          </p>
        </div>
        <button
          className={`inline-flex cursor-pointer items-center bg-transparent p-0 transition-[gap] duration-300 ease-in-out hover:gap-[20px] ${
            isActive ? "gap-[10px] px-[15px] py-[12px]" : "gap-[6.9px] px-[10.3px] py-[8.3px]"
          }`}
          type="button"
          onClick={handleLearnMoreClick}
        >
          <span
            className={`font-dm-sans font-semibold leading-[150%] text-[#1e1e1e] ${
              isActive ? "text-[16px]" : "text-[11px]"
            }`}
          >
            Learn More
          </span>
          <svg
            className={`flex-shrink-0 text-[#1e1e1e] ${
              isActive ? "h-[24px] w-[24px]" : "h-[16.5px] w-[16.5px]"
            }`}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M14 18L12.6 16.55L16.15 13H4V11H16.15L12.6 7.45L14 6L20 12L14 18Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
