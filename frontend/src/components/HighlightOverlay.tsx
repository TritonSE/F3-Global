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
        className="relative flex flex-col md:flex-row h-[506px] md:min-h-[612px] w-[342px] md:w-auto items-start justify-start md:gap-[50px] overflow-y-auto scrollbar-hide md:overflow-hidden rounded-[10px] border border-[#c7c7c7] bg-white p-[20px] md:p-[50px] shadow-[0px_17px_36px_0px_rgba(0,0,0,0.1)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="flex md:hidden self-end h-[24px] w-[24px] cursor-pointer items-center justify-center text-[#1e1e1e] transition-opacity duration-200 hover:opacity-70"
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
        <div className="relative mb-[30px] md:mb-0 mt-[15px] md:mt-0 w-[302px] md:w-[557px] h-[172px] md:h-auto md:self-stretch flex-shrink-0 overflow-hidden rounded-[10px]">
          <Image src={highlight.imageUrl} alt={highlight.quoteText} fill className="object-cover" />
        </div>
        <div className="flex w-[302px] md:w-[488px] flex-shrink-0 flex-col gap-[10px] md:gap-[16px] scrollbar-hide">
          <p className="font-dm-sans text-[12px] md:text-[16px] font-normal leading-[16px] md:leading-6 text-[#1e1e1e] whitespace-pre-wrap">
            {highlight.fullText}
          </p>
        </div>
        <button
          className="hidden md:flex absolute top-[20px] right-[20px] h-[24px] w-[24px] cursor-pointer items-center justify-center text-[#1e1e1e] transition-opacity duration-200 hover:opacity-70"
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
        <div className="h-[30px] w-full flex-shrink-0 md:hidden" />
      </div>
    </div>
  );
}
