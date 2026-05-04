import Image from "next/image";
import React from "react";

import type { HighlightItem } from "@/api/clientHighlights";

export type HighlightCardProps = {
  highlight: HighlightItem;
  onLearnMore: (highlight: HighlightItem) => void;
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
          ? "h-[312px] md:h-[536px] w-[278px] md:w-[468px] cursor-default rounded-[16px] bg-[#f4f4f4]"
          : "h-[245px] md:h-[359px] w-[209px] md:w-[322px] cursor-pointer rounded-[11px] bg-[#f4f4f4] opacity-60"
      }`}
      role={!isActive ? "button" : undefined}
      tabIndex={!isActive ? 0 : -1}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      aria-pressed={isActive}
    >
      <div
        className={`relative w-full overflow-hidden ${
          isActive
            ? "h-[152px] md:h-[256px] rounded-t-[10px] md:rounded-t-[16px]"
            : "h-[114px] md:h-[176px] rounded-t-[7px] md:rounded-t-[11px]"
        }`}
      >
        <Image
          src={highlight.imageUrl}
          alt={highlight.quoteText}
          fill
          style={{ objectFit: "cover" }}
        />
        <div
          className={`pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(56,88,173,0)_52.539%,#172447_107.81%)]`}
        />
      </div>
      <div
        className={`absolute flex transform items-center justify-center rounded-full bg-transparent -translate-y-1/2 ${
          isActive
            ? "right-[16px] md:right-[26px] top-[152px] md:top-[256px] h-[35px] md:h-[60px] w-[35px] md:w-[60px]"
            : "right-[10px] md:right-[18px] top-[114px] md:top-[176px] h-[26px] md:h-[41.24px] w-[26px] md:w-[41.24px]"
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
        className={`relative flex w-full flex-1 flex-col overflow-y-auto rounded-b-[10px] md:rounded-b-[16px] ${
          isActive
            ? "gap-[10px] md:gap-[24px] p-[20px_10px] md:p-[32px_16px]"
            : "gap-[7.5px] md:gap-[16.5px] p-[15px_7.5px] md:p-[22px_11px]"
        }`}
      >
        <div
          className={`flex w-full min-h-0 flex-col overflow-hidden ${
            isActive
              ? "gap-[4px] md:gap-[8px] px-[12px] md:px-[20px]"
              : "gap-[3.5px] md:gap-[5.5px] px-[8.9px] md:px-[13.8px]"
          }`}
        >
          <p
            className={`font-dm-sans font-semibold leading-[150%] text-[#1e1e1e] line-clamp-2 tracking-[0.24px] ${
              isActive ? "text-[12px] md:text-[20px]" : "text-[9px] md:text-[16.5px]"
            }`}
          >
            "{highlight.quoteText}"
          </p>
          <p
            className={`font-dm-sans font-normal text-[#5d5d5d] line-clamp-2 ${
              isActive
                ? "text-[12px] md:text-[16px] leading-[16px] md:leading-6"
                : "text-[9px] md:text-[11px] leading-[12px] md:leading-[16.5px]"
            }`}
          >
            {highlight.previewText}
          </p>
        </div>
        <button
          className={`inline-flex cursor-pointer items-center bg-transparent p-0 transition-[gap] duration-300 ease-in-out hover:gap-[20px] ${
            isActive
              ? "gap-[5px] md:gap-[10px] px-[12px] md:px-[15px] py-[10px] md:py-[12px]"
              : "gap-[5px] md:gap-[6.9px] px-[10.3px] py-[8.3px]"
          }`}
          type="button"
          onClick={handleLearnMoreClick}
        >
          <span
            className={`font-dm-sans font-semibold leading-[150%] text-[#1e1e1e] ${
              isActive ? "text-[12px] md:text-[16px]" : "text-[10px] md:text-[11px]"
            }`}
          >
            Learn More
          </span>
          <svg
            className={`flex-shrink-0 text-[#1e1e1e] ${
              isActive
                ? "h-[16px] md:h-[24px] w-[16px] md:w-[24px]"
                : "h-[15px] md:h-[16.5px] w-[15px] md:w-[16.5px]"
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
