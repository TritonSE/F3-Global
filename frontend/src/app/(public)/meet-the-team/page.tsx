"use client";

import countriesInfo from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

import type { CountryData } from "@/components/InteractiveWorldMap";

import { Button } from "@/components/button";
import { CountrySection } from "@/components/CountrySection";
import { InteractiveWorldMap } from "@/components/InteractiveWorldMap";

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
const DEFAULT_FLAG_URL = "/imgs/qmarkplaceholder.png";
const COUNTRY_DISPLAY_NAME_OVERRIDES: Record<string, string> = {
  "United States of America": "United States",
};

function getMemberTier(position: string): number {
  const lower = position.toLowerCase();
  if (CSUITE_KEYWORDS.some((k) => new RegExp(`\\b${k}\\b`).test(lower))) return 0;
  if (DIRECTOR_KEYWORDS.some((k) => new RegExp(`\\b${k}\\b`).test(lower))) return 1;
  return 2;
}

export type Member = {
  _id: string;
  name: string;
  country: string;
  memberPosition: string;
  linkedinUrl: string;
  headshotUrl: string;
};

export type College = {
  _id: string;
  name: string;
  imageUrl: string;
  order: number;
};

function CollegeCard({ college }: { college: College }) {
  return (
    <div
      className="mx-[15px] flex h-[60px] w-[60px] shrink-0 items-center justify-center md:mx-[25px] md:h-[100px] md:w-[100px]"
      style={{
        background: `url(${college.imageUrl}) 50% / cover no-repeat`,
        backgroundSize: "contain",
      }}
      title={college.name}
    />
  );
}

export default function MeetTheTeam() {
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        const res = await fetch(`${backendUrl}/api/members/all`);

        if (!res.ok) throw new Error("Failed to fetch team members");

        const data = (await res.json()) as Member[];
        setMembers(data);
      } catch (error) {
        console.error("Error loading members:", error);
      }
    };

    void fetchMembers();
  }, []);

  const membersByCountry = useMemo(() => {
    return members.reduce(
      (acc, member) => {
        const countryCode = member.country.trim();

        const isoCountryName = countriesInfo.getName(countryCode, "en") || countryCode;
        const countryName = COUNTRY_DISPLAY_NAME_OVERRIDES[isoCountryName] || isoCountryName;

        if (!acc[countryName]) {
          acc[countryName] = [];
        }
        acc[countryName].push(member);
        return acc;
      },
      {} as Record<string, Member[]>,
    );
  }, [members]);

  const countryData: CountryData[] = useMemo(() => {
    return Object.keys(membersByCountry).map((countryName) => {
      const code = countriesInfo.getAlpha3Code(countryName, "en");

      return {
        code: code || "UNKNOWN",
        name: countryName,
        employeeCount: membersByCountry[countryName].length,
      };
    });
  }, [membersByCountry]);

  const sortedMembersByCountry = useMemo(() => {
    const sorted: Record<string, Member[]> = {};
    for (const country of Object.keys(membersByCountry)) {
      sorted[country] = [...membersByCountry[country]].sort(
        (a, b) => getMemberTier(a.memberPosition) - getMemberTier(b.memberPosition),
      );
    }
    return sorted;
  }, [membersByCountry]);

  const countries = Object.keys(membersByCountry).sort((a, b) => {
    if (a === "United States") return -1;
    if (b === "United States") return 1;
    return a.localeCompare(b);
  });

  const [colleges, setColleges] = useState<College[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const countryCarouselRef = useRef<HTMLDivElement>(null);

  const carouselDragStateRef = useRef({
    isDragging: false,
    pointerId: -1,
    startX: 0,
    scrollLeft: 0,
  });
  const [containerWidth, setContainerWidth] = useState(1200);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        const res = await fetch(`${backendUrl}/api/colleges/all`);
        if (!res.ok) throw new Error("Failed to fetch colleges");
        const data = (await res.json()) as College[];
        setColleges(data);
      } catch (error) {
        console.error("Error loading colleges:", error);
      }
    };

    void fetchColleges();
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const repeated = useMemo(() => {
    if (colleges.length === 0) return [];
    const sorted = [...colleges].sort((a, b) => a.order - b.order);
    const singleSetWidth = sorted.length * 150;
    const rawCopies = Math.ceil((containerWidth * 2) / singleSetWidth);
    const copies = Math.max(4, rawCopies % 2 === 0 ? rawCopies : rawCopies + 1);
    return Array.from({ length: copies }, (_, copyIndex) =>
      sorted.map((college) => ({ ...college, uniqueKey: `${college._id}-copy${copyIndex}` })),
    ).flat();
  }, [colleges, containerWidth]);

  const scrollToCountrySection = (countryName: string) => {
    const code = countriesInfo.getAlpha3Code(countryName, "en") || "UNKNOWN";
    const countrySection = document.getElementById(`members-${code}`);
    if (countrySection) {
      const heading = countrySection.querySelector("h3");
      const target = heading || countrySection;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const stopCountryCarouselDrag = (pointerId: number) => {
    const container = countryCarouselRef.current;
    const dragState = carouselDragStateRef.current;
    if (!container || dragState.pointerId !== pointerId) return;

    dragState.isDragging = false;
    dragState.pointerId = -1;

    if (container.hasPointerCapture(pointerId)) {
      container.releasePointerCapture(pointerId);
    }
  };

  const handleCountryCarouselPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!countryCarouselRef.current) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;

    const container = countryCarouselRef.current;
    container.setPointerCapture(event.pointerId);
    carouselDragStateRef.current = {
      isDragging: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      scrollLeft: container.scrollLeft,
    };
  };

  const handleCountryCarouselPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const container = countryCarouselRef.current;
    const dragState = carouselDragStateRef.current;
    if (!container || !dragState.isDragging || dragState.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - dragState.startX;
    container.scrollLeft = dragState.scrollLeft - deltaX;
  };

  const handleCountryCarouselPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    stopCountryCarouselDrag(event.pointerId);
  };

  return (
    <>
      <div className="mx-auto w-full max-w-[1512px] overflow-x-hidden bg-white">
        <div className="flex w-full flex-col items-center gap-[20px] px-[30px] pt-[50px] text-center md:h-[774px] md:flex-row md:items-center md:justify-between md:px-[100px] md:py-0 md:text-left">
          <div className="order-2 flex w-full max-w-[580px] flex-col items-center gap-[20px] md:order-1 md:items-start md:gap-[50px] md:basis-1/2 md:max-w-[580px]">
            <h1 className="font-ethic text-4xl leading-tight font-light text-[#1E1E1E] mt-[20px] md:text-[64px] md:leading-[1.1]">
              Meet the Team <br /> Without <span className="italic">Borders</span>
            </h1>
            <p className="max-w-[279px] font-dm-sans text-[14px] font-normal leading-[20px] text-[#5D5D5D] md:hidden">
              Our professional team brings expertise from all over the world. Explore where our team
              members are from below.
            </p>
            <p className="hidden max-w-[580px] font-dm-sans text-[20px] font-normal leading-[32px] text-[#5D5D5D] md:block">
              Our professional team brings expertise from all over the world. Explore the clickable
              map of where our team members are from below.
            </p>
            <div className="pb-[50px] md:pb-0">
              <Button
                text="JOIN OUR TEAM"
                onClick_link="https://my-apply.vercel.app/org/f3-global-foundation"
                className="flex cursor-pointer items-center justify-center gap-2.5 rounded-full bg-[#172447] px-[15px] py-[10px] transition-colors duration-450 ease-in-out hover:bg-[#1169B0] md:px-5 md:py-[15px]"
                textClassName="text-center font-dm-sans text-[12px] font-semibold uppercase leading-[20px] text-white md:text-base md:leading-6"
              />
            </div>
          </div>
          <div className="w-full md:basis-1/2 order-1 md:order-2 flex justify-center md:justify-end">
            <div className="w-full max-w-[646px] overflow-hidden rounded-[10px]">
              <Image
                src="/imgs/space.webp"
                alt="Space View of Earth"
                width={646}
                height={581}
                sizes="646px"
                className="w-full h-auto object-cover object-center"
                priority
              />
            </div>
          </div>
        </div>
        <div
          id="world-map-section"
          className="hidden md:block border-t border-[#F4F4F4] shadow-[0_19px_43px_0_rgba(0,0,0,0.10)]"
        >
          <InteractiveWorldMap data={countryData} />
        </div>

        {/* colleges section */}

        <div className="flex flex-col items-start gap-[20px] self-stretch border-t border-[#F4F4F4] bg-white px-[30px] py-10 shadow-[inset_0_-19px_16px_0_rgba(0,0,0,0.02)] md:gap-[50px] md:px-[100px] md:py-[50px]">
          <div className="flex flex-col gap-4 md:gap-[20px]">
            <h2 className="font-dm-sans text-[28px] font-[500] leading-[130%] text-[#172447] md:text-[48px] md:leading-[150%] md:tracking-[-0.96px]">
              Where We’ve Studied
            </h2>
            <p className="self-stretch font-dm-sans text-[14px] font-normal leading-[20px] text-black md:text-[20px] md:leading-[32px]">
              Our team brings together experienced professionals alongside driven students and
              graduates from leading universities. Across disciplines and stages of career, we are
              united by a shared commitment to innovation, equity, and lasting social impact.
            </p>
          </div>
          <div
            ref={containerRef}
            className="relative w-full overflow-hidden"
            style={{ height: 151 }}
          >
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-8 bg-gradient-to-r from-white to-transparent md:w-[200px]" />
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 bg-gradient-to-l from-white to-transparent md:w-[200px]" />
            <div className="overflow-hidden" style={{ height: 151 }}>
              <div
                className="flex items-center h-full animate-marquee whitespace-nowrap"
                style={{ width: "max-content" }}
              >
                {repeated.map((college) => (
                  <CollegeCard key={college.uniqueKey} college={college} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          id="our-team-around-world-section"
          className="flex flex-col items-start gap-4 self-stretch px-[30px] py-10 md:gap-[50px] md:px-[100px] md:pb-[20px] md:pt-[50px]"
        >
          <h2 className="scroll-mt-[60px] font-dm-sans text-[28px] font-[500] leading-[130%] text-[#172447] md:text-[48px] md:leading-[150%] md:tracking-[-0.96px]">
            Our Team Around the World
          </h2>
          <div className="flex w-full flex-col gap-[30px] md:hidden">
            <p className="font-dm-sans text-[14px] font-normal leading-[20px] text-black">
              Our team brings together experienced professionals alongside driven students and
              graduates from leading universities. Across disciplines and stages of career, we are
              united by a shared commitment to innovation, equity, and lasting social impact.
            </p>
            <p className="w-full text-center font-dm-sans text-[12px] italic font-normal leading-[16px] text-[color:var(--Secondary-Text-Grey,#5D5D5D)]">
              Select a country to meet our team members connected to that region.
            </p>
          </div>
          {countries.length > 0 && (
            <div
              ref={countryCarouselRef}
              className="w-full cursor-grab select-none overflow-x-auto touch-pan-x [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:hidden"
              onPointerDown={handleCountryCarouselPointerDown}
              onPointerMove={handleCountryCarouselPointerMove}
              onPointerUp={handleCountryCarouselPointerUp}
              onPointerCancel={handleCountryCarouselPointerUp}
            >
              <div className="flex w-max min-w-[402px] items-start gap-[10px] px-[30px]">
                {countries.map((countryName) => {
                  const flagCode = countriesInfo.getAlpha2Code(countryName, "en");
                  const flagUrl = flagCode
                    ? `https://flagcdn.com/w80/${flagCode.toLowerCase()}.png`
                    : DEFAULT_FLAG_URL;

                  return (
                    <button
                      type="button"
                      key={countryName}
                      aria-pressed={selectedCountry === countryName}
                      onClick={() => {
                        setSelectedCountry(countryName);
                        scrollToCountrySection(countryName);
                      }}
                      className={`flex shrink-0 items-center gap-[10px] rounded-full border px-4 py-2 transition-colors duration-200 ${
                        selectedCountry === countryName
                          ? "border-[#1169B0] bg-[#DCEBFF]"
                          : "border-[#E4E4E4] bg-white"
                      }`}
                    >
                      <div className="relative h-[25px] w-[25px] overflow-hidden rounded-full">
                        <Image
                          src={flagUrl}
                          alt={`${countryName} flag`}
                          fill
                          sizes="25px"
                          className="object-cover object-center"
                        />
                      </div>
                      <span className="block max-w-[170px] overflow-hidden text-ellipsis whitespace-nowrap font-dm-sans text-[16px] not-italic font-semibold leading-[150%] text-[color:var(--Text-Black,#1E1E1E)]">
                        {countryName}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <div className="pb-[50px] flex flex-col">
          {countries.map((countryName) => {
            const code = countriesInfo.getAlpha3Code(countryName, "en") || "UNKNOWN";
            return (
              <CountrySection
                key={countryName}
                id={`members-${code}`}
                countryName={countryName}
                members={sortedMembersByCountry[countryName]}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
