import Image from "next/image";

import type { HighlightItem } from "@/api/clientHighlights";

export type HighlightOverlayProps = {
  highlight: HighlightItem;
  onClose: () => void;
};

const CloseButton = ({ onClick }: { onClick: () => void }) => (
  <button
    className="flex h-[24px] w-[24px] cursor-pointer items-center justify-center text-[#1e1e1e] transition-opacity duration-200 hover:opacity-70"
    onClick={onClick}
    aria-label="Close"
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
        fill="currentColor"
      />
    </svg>
  </button>
);

export function HighlightOverlay({ highlight, onClose }: HighlightOverlayProps) {
  return (
    <div
      className="absolute inset-0 z-[1000] flex items-center justify-center bg-transparent p-[20px]"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col min-[993px]:flex-row h-[506px] min-[993px]:h-auto w-[342px] min-[993px]:w-full min-[993px]:max-w-[1195px] items-start justify-start min-[993px]:gap-[50px] overflow-y-auto scrollbar-hide min-[993px]:overflow-hidden rounded-[10px] border border-[#c7c7c7] bg-white p-[20px] min-[993px]:p-[50px] shadow-[0px_17px_36px_0px_rgba(0,0,0,0.1)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile close — sits top-right of the stacked layout */}
        <div className="flex min-[993px]:hidden self-end">
          <CloseButton onClick={onClose} />
        </div>

        {/* Image — flex-1 at desktop so it fills remaining width; self-stretch fills popup height */}
        <div className="relative mb-[30px] min-[993px]:mb-0 mt-[15px] min-[993px]:mt-0 h-[172px] w-[302px] flex-shrink-0 overflow-hidden rounded-[10px] min-[993px]:h-auto min-[993px]:w-auto min-[993px]:flex-1 min-[993px]:min-w-0 min-[993px]:self-stretch">
          <Image src={highlight.imageUrl} alt={highlight.quoteText} fill className="object-cover" />
        </div>

        {/* Text panel — 46% of content area preserves the ~53:47 image:text ratio; caps at 488px on large screens */}
        <div className="flex w-[302px] flex-shrink-0 flex-col gap-[10px] scrollbar-hide min-[993px]:w-[46%] min-[993px]:max-w-[488px] min-[993px]:gap-[16px]">
          {highlight.clientName && (
            <h3 className="m-0 font-dm-sans text-[20px] min-[993px]:text-[28px] font-bold leading-[150%] tracking-[-0.56px] text-[#1e1e1e]">
              {highlight.clientName}
            </h3>
          )}
          <p className="font-dm-sans text-[12px] min-[993px]:text-[16px] font-normal leading-[16px] min-[993px]:leading-6 text-[#1e1e1e] whitespace-pre-wrap">
            {highlight.fullText}
          </p>
        </div>

        {/* Desktop close — absolute top-right corner, always visible over content */}
        <button
          className="hidden min-[993px]:flex absolute top-[20px] right-[20px] h-[24px] w-[24px] cursor-pointer items-center justify-center text-[#1e1e1e] transition-opacity duration-200 hover:opacity-70"
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

        <div className="h-[30px] w-full flex-shrink-0 min-[993px]:hidden" />
      </div>
    </div>
  );
}
