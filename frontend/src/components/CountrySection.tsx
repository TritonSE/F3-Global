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

  const flagUrl = useMemo(() => {
    const code = countriesInfo.getAlpha2Code(countryName, "en");
    if (!code) return ""; //TODO ADD PLACEHOLDER IMG

    return `https://flagcdn.com/w320/${code.toLowerCase()}.png`;
  }, [countryName]);

  const handleScrollToMap = () => {
    const mapSection = document.getElementById("world-map-section");
    if (mapSection) {
      mapSection.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <>
      <div
        id={id}
        className="flex flex-col py-[10px] px-[100px] items-start gap-[20px] self-stretch scroll-mt-34 bg-white"
      >
        <div className="flex flex-col py-[50px] px-0 items-start gap-[50px] self-stretch rounded-[10px] bg-[#F4F4F4]">
          <div className="flex py-0 px-[50px] justify-between items-start self-stretch">
            <div className="flex items-center gap-[20px]">
              <h3 className="font-dm-sans text-[32px] text-[#1E1E1E] font-bold leading-[150%] tracking-[-0.64px]">
                {countryName}
              </h3>
              <div
                className="rounded-[60px] relative overflow-hidden"
                style={{ width: 60, height: 60 }}
              >
                <Image
                  src={flagUrl}
                  alt={`${countryName} Flag`}
                  fill
                  className="object-cover object-center bg-cover bg-no-repeat bg-center"
                />
              </div>
            </div>
            <div className="flex py-[10px] px-[20px] items-center gap-[10px]">
              <div className="relative overflow-hidden" style={{ width: 36, height: 36 }}>
                <Image
                  src="/imgs/group.svg"
                  alt="Group icon"
                  fill
                  className="object-cover object-center bg-cover bg-no-repeat bg-center"
                />
              </div>
              <p className="font-dm-sans text-[24px] font-normal leading-[150%] text-[172447]">{`${memberCount} ${memberCount > 1 ? "members" : "member"}`}</p>
            </div>
          </div>
          <div className="flex flex-col items-start gap-[25px] self-stretch">
            <div className="grid grid-cols-4 py-0 px-[50px] items-start gap-[70px] self-stretch">
              {members.map((member) => (
                <MemberCard key={member._id} member={member} />
              ))}
            </div>
            <div className="flex py-0 px-[50px] justify-end items-center gap-[5px] self-stretch">
              <div
                className="flex flex-row gap-[4px] items-center cursor-pointer group"
                onClick={handleScrollToMap}
              >
                <p className="font-dm-sans text-[14px] font-normal text-[#5D5D5D] leading-[32px] tracking-[2px] uppercase transition-colors duration-300 group-hover:text-[#1169B0]">
                  back to map
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
