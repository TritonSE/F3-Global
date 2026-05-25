"use client";

import countriesInfo from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import { useMemo } from "react";

import { PreviewNavBar } from "./PreviewNavBar";

import type { Member } from "@/api/members";

import { CountrySection } from "@/components/CountrySection";

countriesInfo.registerLocale(enLocale);

const CSUITE_KEYWORDS = [
  "ceo",
  "coo",
  "cfo",
  "cto",
  "cmo",
  "cio",
  "cso",
  "cpo",
  "co-head",
  "cohead",
  "co-founder",
];
const DIRECTOR_KEYWORDS = ["director"];
const COUNTRY_NAME_OVERRIDES: Record<string, string> = {
  "United States of America": "United States",
};

function getMemberTier(position: string): number {
  const lower = position.toLowerCase();
  if (CSUITE_KEYWORDS.some((k) => new RegExp(`\\b${k}\\b`).test(lower))) return 0;
  if (DIRECTOR_KEYWORDS.some((k) => new RegExp(`\\b${k}\\b`).test(lower))) return 1;
  return 2;
}

export function MembersPreview({ members }: { members: Member[] }) {
  const membersByCountry = useMemo(() => {
    const groups: Record<string, Member[]> = {};
    for (const member of members) {
      const isoName = countriesInfo.getName(member.country.trim(), "en") || member.country;
      const name = COUNTRY_NAME_OVERRIDES[isoName] || isoName;
      (groups[name] ??= []).push(member);
    }
    for (const name of Object.keys(groups)) {
      groups[name] = [...groups[name]].sort(
        (a, b) => getMemberTier(a.memberPosition) - getMemberTier(b.memberPosition),
      );
    }
    return groups;
  }, [members]);

  const countries = Object.keys(membersByCountry).sort((a, b) => {
    if (a === "United States") return -1;
    if (b === "United States") return 1;
    return a.localeCompare(b);
  });

  return (
    <div className="w-full overflow-hidden rounded-[10px] bg-white shadow-[0_15px_35px_rgba(0,0,0,0.1)]">
      <PreviewNavBar activeItem="Meet the Team" />
      <div className="flex flex-col gap-[30px] py-[40px]">
        <h2 className="px-[30px] font-dm-sans text-[32px] font-medium text-[#172447] md:px-[100px]">
          Our Team Around the World
        </h2>
        {countries.map((countryName) => (
          <CountrySection
            key={countryName}
            countryName={countryName}
            members={membersByCountry[countryName]}
          />
        ))}
      </div>
    </div>
  );
}
