"use client";

import { useEffect } from "react";

type Props = {
  message: string;
  onDismiss: () => void;
  durationMs?: number;
};

export function Toast({ message, onDismiss, durationMs = 5000 }: Props) {
  useEffect(() => {
    const t = setTimeout(onDismiss, durationMs);
    return () => clearTimeout(t);
  }, [onDismiss, durationMs]);

  return (
    <div
      role="alert"
      className="fixed bottom-[30px] right-[30px] z-50 flex items-center gap-[16px] px-[20px] py-[14px] bg-[#fdecec] border border-[#d94545] rounded-[8px] shadow-[0_8px_24px_rgba(0,0,0,0.12)] max-w-[420px]"
    >
      <svg viewBox="0 0 20 20" fill="none" className="size-[20px] shrink-0" aria-hidden>
        <circle cx="10" cy="10" r="10" fill="#d94545" />
        <path d="M10 5v6M10 14v.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span className="font-dm-sans text-[14px] text-[#1e1e1e] leading-[20px] flex-1">
        {message}
      </span>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss"
        className="shrink-0 cursor-pointer text-[#1e1e1e] hover:opacity-70 transition-opacity"
      >
        <svg viewBox="0 0 14 14" fill="none" className="size-[14px]" aria-hidden>
          <path
            d="M1 1l12 12M13 1L1 13"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}
