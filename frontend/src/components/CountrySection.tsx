import countriesInfo from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import Image from "next/image";
import React, { useMemo } from "react";

import { MemberCard } from "./MemberCard";

import type { Member } from "./MemberCard";

countriesInfo.registerLocale(enLocale);

type CountrySectionProps = {
  id?: string;
  countryName: string;
  members: Member[];
};

export const CountrySection: React.FC<CountrySectionProps> = ({ id, countryName, members }) => {
  const memberCount = members.length;

  const mobileCountryNameLines = useMemo(() => {
    if (countryName.length <= 14 || !countryName.includes(" ")) return null;

    const words = countryName.split(" ").filter(Boolean);
    if (words.length < 2) return null;

    let bestSplitIndex = 1;
    let smallestLengthDiff = Number.POSITIVE_INFINITY;

    for (let i = 1; i < words.length; i++) {
      const left = words.slice(0, i).join(" ");
      const right = words.slice(i).join(" ");
      const lengthDiff = Math.abs(left.length - right.length);

      if (lengthDiff < smallestLengthDiff) {
        smallestLengthDiff = lengthDiff;
        bestSplitIndex = i;
      }
    }

    return [
      words.slice(0, bestSplitIndex).join(" "),
      words.slice(bestSplitIndex).join(" "),
    ] as const;
  }, [countryName]);

  const flagUrl = useMemo(() => {
    const code = countriesInfo.getAlpha2Code(countryName, "en");
    if (!code) return "/imgs/qmarkplaceholder.png";

    return `https://flagcdn.com/w320/${code.toLowerCase()}.png`;
  }, [countryName]);

  const handleBackNavigation = () => {
    const teamSection = document.getElementById("our-team-around-world-section");
    if (teamSection) {
      const heading = teamSection.querySelector("h2");
      const target = heading || teamSection;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div
        id={id}
        className="flex flex-col items-start gap-[20px] self-stretch scroll-mt-34 bg-white px-[30px] py-[10px] md:px-[100px]"
      >
        <div className="flex flex-col items-start gap-[30px] self-stretch rounded-[10px] bg-white px-0 py-[30px] md:gap-[50px] md:bg-[#F4F4F4] md:py-[50px]">
          <div className="flex w-full flex-nowrap items-center justify-start pl-0 pr-0 md:items-start md:justify-between md:px-[50px]">
            <div className="flex min-w-0 items-center gap-[15px] md:gap-[20px]">
              <h3 className="scroll-mt-[60px] font-dm-sans text-[20px] font-[700] leading-[150%] tracking-[-0.4px] text-[#1E1E1E] md:text-[32px] md:tracking-[-0.64px]">
                <span className="md:hidden">
                  {mobileCountryNameLines ? (
                    <>
                      <span className="block whitespace-nowrap">{mobileCountryNameLines[0]}</span>
                      <span className="block whitespace-nowrap">{mobileCountryNameLines[1]}</span>
                    </>
                  ) : (
                    countryName
                  )}
                </span>
                <span className="hidden md:inline">{countryName}</span>
              </h3>
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full md:h-[60px] md:w-[60px]">
                <Image
                  src={flagUrl}
                  alt={`${countryName} Flag`}
                  fill
                  sizes="(max-width: 767px) 40px, 60px"
                  className="object-cover object-center bg-cover bg-no-repeat bg-center"
                />
              </div>
            </div>
            <div className="ml-auto flex shrink-0 items-center gap-2 md:ml-0 md:gap-[10px] md:px-[20px] md:py-[10px]">
              <div className="relative h-5 w-5 overflow-hidden md:h-9 md:w-9">
                <Image
                  src="/imgs/group.svg"
                  alt="Group icon"
                  fill
                  sizes="(max-width: 767px) 20px, 36px"
                  className="object-cover object-center bg-cover bg-no-repeat bg-center"
                />
              </div>
              <p className="font-dm-sans text-[14px] font-bold leading-[150%] text-[#172447] md:text-[20px]">
                <span>{memberCount}</span>
                <span className="hidden md:inline">{` ${memberCount > 1 ? "members" : "member"}`}</span>
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start gap-[25px] self-stretch">
            <div className="flex flex-wrap items-start justify-center gap-x-[30px] gap-y-8 self-stretch px-0 md:grid md:grid-cols-4 md:justify-items-start md:gap-[70px] md:px-[50px]">
              {members.map((member) => (
                <MemberCard key={member._id} member={member} />
              ))}
              {members.length % 2 === 1 && (
                <div
                  aria-hidden="true"
                  className="hidden h-0 w-[127px] min-[344px]:block md:hidden"
                />
              )}
            </div>
            <div className="flex items-center justify-center gap-[5px] self-stretch px-[20px] py-0 md:justify-end md:px-[50px]">
              <div
                className="flex flex-row gap-[4px] items-center cursor-pointer group"
                onClick={handleBackNavigation}
              >
                <p className="font-dm-sans text-[12px] font-normal leading-[32px] tracking-[2px] uppercase text-[color:var(--Secondary-Text-Grey,#5D5D5D)] transition-colors duration-300 group-hover:text-[#1169B0] md:text-[14px]">
                  <span className="md:hidden">back to top</span>
                  <span className="hidden md:inline">back to map</span>
                </p>
                <div className="relative mb-[2px] w-[15px] h-[15px]">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-[#5D5D5D] transition-colors duration-300 group-hover:text-[#1169B0]"
                  >
                    <path
                      d="M12 19V5M12 5L5 12M12 5L19 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
