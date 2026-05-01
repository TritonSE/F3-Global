"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import type { SortBy } from "@/api/newsletters";

const SORT_LABELS: Record<SortBy, string> = {
  newest: "Most Recent",
  oldest: "Oldest",
  mostViewed: "Most Viewed",
  leastViewed: "Least Viewed",
};

type Props = {
  search: string;
  onSearchChange: (value: string) => void;
  sortBy: SortBy;
  onSortChange: (value: SortBy) => void;
};

export function NewsletterFilter({ search, onSearchChange, sortBy, onSortChange }: Props) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-[20px] items-stretch lg:items-center justify-between px-[24px] lg:px-[100px] w-full">
      <label className="flex gap-[8px] items-center px-[20px] py-[10px] border border-[#c7c7c7] rounded-[99px] w-full lg:w-[421px] focus-within:border-[#172447] cursor-text">
        <span className="relative size-[32px] shrink-0 flex items-center justify-center">
          <svg viewBox="0 0 32 32" fill="none" className="size-[24px]" aria-hidden>
            <circle cx="14" cy="14" r="8" stroke="#5d5d5d" strokeWidth="2" />
            <path d="M20 20L26 26" stroke="#5d5d5d" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by keyword..."
          style={{ fontFamily: "'Rubik', sans-serif" }}
          className="flex-1 bg-transparent outline-none font-normal text-[16px] leading-[24px] text-[#1e1e1e] placeholder:text-[#5d5d5d]"
        />
      </label>
      <div className="flex gap-[10px] items-center" ref={dropdownRef}>
        <span className="font-dm-sans font-normal text-[16px] leading-[24px] text-[#5d5d5d] shrink-0">
          Sort by:
        </span>
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex gap-[4px] items-center justify-center px-[20px] py-[10px] bg-white border border-[#c7c7c7] rounded-[99px] cursor-pointer hover:border-[#172447] transition-colors"
          >
            <span className="flex items-center justify-center pl-[10px] h-[32px] font-dm-sans font-normal text-[16px] leading-[24px] text-[#1e1e1e] whitespace-nowrap">
              {SORT_LABELS[sortBy]}
            </span>
            <span className="relative size-[32px] shrink-0 flex items-center justify-center">
              <Image
                src="/imgs/ic_caretdown.svg"
                alt=""
                width={32}
                height={32}
                className={`size-[32px] transition-transform ${open ? "rotate-180" : ""}`}
              />
            </span>
          </button>
          {open && (
            <ul
              role="listbox"
              className="absolute right-0 top-[calc(100%+8px)] z-10 bg-white border border-[#c7c7c7] rounded-[16px] shadow-[0_8px_24px_rgba(0,0,0,0.08)] overflow-hidden min-w-[180px]"
            >
              {(Object.keys(SORT_LABELS) as SortBy[]).map((key) => (
                <li key={key}>
                  <button
                    type="button"
                    onClick={() => {
                      onSortChange(key);
                      setOpen(false);
                    }}
                    className={`w-full text-left px-[20px] py-[10px] font-dm-sans text-[16px] leading-[24px] cursor-pointer hover:bg-[#f4f4f4] transition-colors whitespace-nowrap ${
                      key === sortBy ? "text-[#172447] font-semibold" : "text-[#1e1e1e] font-normal"
                    }`}
                  >
                    {SORT_LABELS[key]}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
