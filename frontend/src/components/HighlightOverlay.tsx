import Image from "next/image";

import type { HighlightItem } from "@/api/clientHighlights";

export type HighlightOverlayProps = {
  highlight: HighlightItem;
  onClose: () => void;
};

export function HighlightOverlay({ highlight, onClose }: HighlightOverlayProps) {
  return (
    <div
      className="absolute inset-0 z-[1000] flex items-center justify-center bg-transparent p-[20px]"
      onClick={onClose}
    >
      <div
        className="relative flex min-h-[612px] items-start justify-center gap-[50px] overflow-hidden rounded-[10px] border border-[#c7c7c7] bg-white p-[50px] shadow-[0px_17px_36px_0px_rgba(0,0,0,0.1)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-[557px] flex-shrink-0 self-stretch overflow-hidden rounded-[10px]">
          <Image
            src={highlight.imageUrl}
            alt={highlight.quoteText}
            fill
            className="block h-full w-full object-cover"
          />
        </div>
        <div className="flex w-[488px] flex-shrink-0 flex-col gap-[16px] overflow-y-auto">
          <p className="font-dm-sans text-[16px] font-normal leading-6 text-[#1e1e1e] whitespace-pre-wrap">
            {highlight.fullText}
          </p>
        </div>
        <button
          className="relative flex h-[24px] w-[24px] cursor-pointer items-center justify-center text-[#1e1e1e] transition-opacity duration-200 hover:opacity-70"
          onClick={onClose}
          aria-label="Close"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
