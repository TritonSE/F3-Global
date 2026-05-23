"use client";

import countriesInfo from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import Image from "next/image";
import { useState } from "react";

import {
  IconFile,
  IconFilter,
  IconLinkedin,
  IconMail,
  IconMapPin,
  IconSort,
  IconUser,
} from "./MemberIcons";

import type { Member } from "@/api/members";

countriesInfo.registerLocale(enLocale);

const COLUMN_TEMPLATE =
  "minmax(0,1.1fr) minmax(0,1fr) minmax(0,1fr) minmax(0,1.2fr) minmax(0,1.3fr) minmax(0,1fr) 48px";

const HEAD_CLASS = "text-[#1E1E1E] text-[16px] font-semibold uppercase";

function countryName(code: string): string {
  return countriesInfo.getName(code, "en", { select: "alias" }) || code;
}

function fileNameFromUrl(url: string): string {
  if (!url) return "";
  try {
    const path = decodeURIComponent(new URL(url).pathname);
    return (path.split("/").pop() ?? url).replace(/^\d+-/, "");
  } catch {
    return url;
  }
}

function HeaderCell({
  icon,
  label,
  trailing,
  spread = false,
}: {
  icon?: React.ReactNode;
  label: string;
  trailing?: React.ReactNode;
  spread?: boolean;
}) {
  return (
    <div
      className={`flex items-center ${HEAD_CLASS} ${
        spread ? "justify-between pr-[32px]" : "gap-[8px]"
      }`}
    >
      <span className="flex items-center gap-[8px]">
        {icon}
        {label}
      </span>
      {trailing}
    </div>
  );
}

function LocationFilter({
  value,
  options,
  onChange,
}: {
  value: string;
  options: string[];
  onChange: (code: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const sorted = [...options].sort((a, b) => countryName(a).localeCompare(countryName(b)));

  const optionClass = (active: boolean) =>
    `block w-full cursor-pointer px-[15px] py-[8px] text-left text-[14px] normal-case hover:bg-[#F4F4F4] ${
      active ? "font-semibold text-[#172447]" : "text-[#5D5D5D]"
    }`;

  return (
    <div className="relative ml-[28px]">
      <button
        type="button"
        aria-label="Filter by location"
        onClick={() => setOpen((o) => !o)}
        className="flex cursor-pointer items-center"
      >
        <IconFilter />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-[26px] z-20 max-h-[260px] min-w-[200px] overflow-auto rounded-[8px] border border-[#C7C7C7] bg-white py-[6px] shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
            <button
              type="button"
              onClick={() => {
                onChange("");
                setOpen(false);
              }}
              className={optionClass(value === "")}
            >
              All Locations
            </button>
            {sorted.map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => {
                  onChange(code);
                  setOpen(false);
                }}
                className={optionClass(value === code)}
              >
                {countryName(code)}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

type MembersTableProps = {
  members: Member[];
  sortDir: "asc" | "desc";
  onToggleSort: () => void;
  countryFilter: string;
  countryOptions: string[];
  onCountryFilterChange: (code: string) => void;
  onRowClick?: (member: Member) => void;
  onDelete?: (member: Member) => void;
};

export function MembersTable({
  members,
  sortDir,
  onToggleSort,
  countryFilter,
  countryOptions,
  onCountryFilterChange,
  onRowClick,
  onDelete,
}: MembersTableProps) {
  return (
    <div className="w-full rounded-[16px] border border-[#C7C7C7] overflow-hidden">
      <div
        className="grid items-center bg-[#F4F4F4] px-[25px] py-[18px]"
        style={{ gridTemplateColumns: COLUMN_TEMPLATE }}
      >
        <HeaderCell
          spread
          icon={<IconUser />}
          label="Name"
          trailing={
            <button
              type="button"
              aria-label={`Sort by name (currently ${sortDir === "asc" ? "A-Z" : "Z-A"})`}
              onClick={onToggleSort}
              className="flex cursor-pointer items-center"
            >
              <IconSort />
            </button>
          }
        />
        <HeaderCell
          icon={<IconMapPin />}
          label="Location"
          trailing={
            <LocationFilter
              value={countryFilter}
              options={countryOptions}
              onChange={onCountryFilterChange}
            />
          }
        />
        <HeaderCell
          icon={<Image src="/imgs/members-editor/positions.png" alt="" width={20} height={20} />}
          label="Position"
        />
        <HeaderCell icon={<IconMail />} label="Email" />
        <HeaderCell icon={<IconLinkedin />} label="LinkedIn" />
        <HeaderCell
          icon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1169B0"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          }
          label="Photo"
        />
        <span />
      </div>

      {members.map((member) => (
        <div
          key={member._id}
          onClick={() => onRowClick?.(member)}
          className="grid items-center min-h-[80px] px-[25px] py-[20px] border-t border-[#C7C7C7] bg-white cursor-pointer hover:bg-[#FAFAFA] transition-colors"
          style={{ gridTemplateColumns: COLUMN_TEMPLATE }}
        >
          <span className="text-[16px] text-[#1E1E1E] truncate pr-[24px]">{member.name}</span>
          <span className="text-[16px] text-[#1E1E1E] truncate pr-[24px]">
            {countryName(member.country)}
          </span>
          <span className="text-[16px] text-[#1E1E1E] truncate pr-[24px]">
            {member.memberPosition}
          </span>
          <span className="text-[16px] text-[#1E1E1E] truncate pr-[24px]">{member.email}</span>
          <span className="text-[16px] text-[#1E1E1E] truncate pr-[24px]">
            {member.linkedinUrl}
          </span>
          <span className="flex items-center gap-[8px] text-[16px] text-[#1E1E1E] truncate pr-[24px]">
            <IconFile className="size-[24px] shrink-0" />
            <span className="truncate">{fileNameFromUrl(member.headshotUrl)}</span>
          </span>
          <button
            type="button"
            aria-label={`Delete ${member.name}`}
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(member);
            }}
            className="flex items-center justify-center cursor-pointer"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#5D5D5D"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
