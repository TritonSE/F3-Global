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
    <div className="flex flex-col md:flex-row gap-[20px] items-start md:items-center justify-between px-[30px] md:px-[100px] w-full">
      <label className="flex gap-[8px] items-center px-[20px] py-[10px] border border-[#c7c7c7] rounded-[99px] w-full md:w-[421px] focus-within:border-[#172447] cursor-text">
        <span className="relative size-[20px] md:size-[32px] shrink-0 flex items-center justify-center">
          <svg viewBox="0 0 32 32" fill="none" className="size-[16px] md:size-[24px]" aria-hidden>
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
          className="flex-1 min-w-0 bg-transparent outline-none font-normal text-[12px] leading-[16px] md:text-[16px] md:leading-[24px] text-[#1e1e1e] placeholder:text-[#5d5d5d]"
        />
        {search && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            aria-label="Clear search"
            className="md:hidden relative size-[20px] shrink-0 flex items-center justify-center cursor-pointer hover:opacity-70 transition-opacity"
          >
            <svg viewBox="0 0 24 24" fill="none" className="size-[12px]" aria-hidden>
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="#1e1e1e"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        )}
      </label>
      <div className="flex gap-[10px] items-center" ref={dropdownRef}>
        <span className="hidden md:inline font-dm-sans font-normal text-[16px] leading-[24px] text-[#5d5d5d] shrink-0">
          Sort by:
        </span>
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={`flex gap-[4px] items-center justify-between pl-[25px] pr-[20px] py-[10px] md:px-[20px] bg-white border border-[#c7c7c7] cursor-pointer hover:border-[#172447] transition-colors ${
              open ? "rounded-t-[20px] rounded-b-none border-b-0" : "rounded-[99px]"
            }`}
          >
            <span className="grid items-center md:pl-[10px] md:h-[32px]">
              {(Object.keys(SORT_LABELS) as SortBy[]).map((key) => (
                <span
                  key={key}
                  aria-hidden={key !== sortBy}
                  className={`[grid-area:1/1] flex items-center justify-start font-dm-sans font-normal text-[12px] leading-[16px] md:text-[16px] md:leading-[24px] text-[#1e1e1e] whitespace-nowrap ${
                    key === sortBy ? "" : "invisible pointer-events-none"
                  }`}
                >
                  {SORT_LABELS[key]}
                </span>
              ))}
            </span>
            <span className="relative size-[20px] md:size-[32px] shrink-0 flex items-center justify-center">
              <Image
                src="/imgs/ic_caretdown.svg"
                alt=""
                width={32}
                height={32}
                className={`size-[20px] md:size-[32px] transition-transform ${open ? "rotate-180" : ""}`}
              />
            </span>
          </button>
          {open && (
            <ul
              role="listbox"
              className="absolute left-0 right-0 top-full z-10 bg-white border border-[#c7c7c7] border-t-0 rounded-b-[20px] overflow-hidden pb-[2px]"
            >
              {(Object.keys(SORT_LABELS) as SortBy[])
                .filter((key) => key !== sortBy)
                .map((key) => (
                  <li key={key}>
                    <button
                      type="button"
                      onClick={() => {
                        onSortChange(key);
                        setOpen(false);
                      }}
                      className="w-full text-left pl-[25px] md:pl-[30px] pr-[20px] py-[4px] font-dm-sans font-normal text-[12px] leading-[16px] md:text-[16px] md:leading-[24px] text-[#1e1e1e] cursor-pointer hover:bg-[#f4f4f4] transition-colors whitespace-nowrap"
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
