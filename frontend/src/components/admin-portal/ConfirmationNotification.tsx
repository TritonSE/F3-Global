"use client";

import type { ReactNode } from "react";

export function ConfirmationNotification({
  message,
  link,
  fading,
  onDismiss,
}: {
  message: ReactNode | null;
  link?: { href: string; label: string };
  fading: boolean;
  onDismiss: () => void;
}) {
  if (!message) return null;

  return (
    <div
      className={`absolute inset-x-[180px] top-[125px] z-50 px-[20px] py-[10px] bg-[#e1f2df] border border-[#3BB966] rounded-[5px] flex items-center justify-between shadow-[0_3px_6px_rgba(0,0,0,0.15)] transition-opacity duration-[1500ms] ${fading ? "opacity-0" : "opacity-100"}`}
    >
      <div className="flex gap-[20px] items-center">
        <svg viewBox="0 0 20 20" fill="none" className="size-[20px] shrink-0">
          <circle cx="10" cy="10" r="10" fill="#3BB966" />
          <path
            d="M5.5 10.5L8.5 13.5L14.5 7"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="font-dm-sans font-medium text-[18px] text-[#1E1E1E] tracking-[-0.36px]">
          {message}
        </span>
        {link && (
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-dm-sans text-[14px] text-[#1E1E1E] underline cursor-pointer"
          >
            {link.label}
          </a>
        )}
      </div>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss notification"
        className="shrink-0 cursor-pointer text-[#1E1E1E] hover:opacity-70 transition-opacity"
      >
        <svg viewBox="0 0 15 15" fill="none" className="size-[15px]">
          <path
            d="M1 1L14 14M14 1L1 14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}
