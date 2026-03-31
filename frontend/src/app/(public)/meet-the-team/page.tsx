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
      className="flex items-center justify-center mx-[25px]"
      style={{
        width: 100,
        height: 100,
        flexShrink: 0,
        background: `url(${college.imageUrl}) 50% / cover no-repeat`,
        backgroundSize: "contain",
      }}
      title={college.name}
    />
  );
}

export default function MeetTheTeam() {
  const [members, setMembers] = useState<Member[]>([]);

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

        const countryName = countriesInfo.getName(countryCode, "en") || countryCode;

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

  const countries = Object.keys(membersByCountry).sort((a, b) => a.localeCompare(b));

  const [colleges, setColleges] = useState<College[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
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

  return (
    <>
      <div className="bg-white overflow-x-hidden">
        <div className="flex w-full items-center justify-between self-stretch px-[100px] min-h-screen">
          <div className="flex flex-col gap-[50px]">
            <h1 className="text-[#1E1E1E] text-[64px] font-ethic font-light leading-[1.1]">
              Meet the Team <br /> Without <span className="italic">Borders</span>
            </h1>
            <p className="font-dm-sans text-[20px] font-normal leading-[32px] text-[#5D5D5D] max-w-[580px]">
              Our professional team brings expertise from all over the world. Explore the clickable
              map of where our team members are from below.
            </p>
            <div>
              <Button
                text="JOIN OUR TEAM"
                onClick_link="https://my-apply.vercel.app/org/f3-global-foundation"
              />
            </div>
          </div>
          <div
            className="rounded-[10px] overflow-hidden relative flex-shrink-0 ml-[50px] mr-[-40px]"
            style={{ width: 646, height: 581 }}
          >
            <Image
              src="/imgs/space.jpg"
              alt="Space View of Earth"
              fill
              className="object-cover object-center bg-cover bg-no-repeat bg-center"
              priority
            />
          </div>
        </div>
        <div
          id="world-map-section"
          className="border-t border-[#F4F4F4] shadow-[0_19px_43px_0_rgba(0,0,0,0.10)]"
        >
          <InteractiveWorldMap data={countryData} />
        </div>

        {/* colleges section */}

        <div className="flex flex-col px-[100px] py-[50px] items-start gap-[50px] self-stretch border-t border-[#F4F4F4] bg-white shadow-[inset_0_-19px_16px_0_rgba(0,0,0,0.02)]">
          <div className="flex flex-col gap-[20px]">
            <h2 className="font-dm-sans text-[48px] font-[500] text-[#172447] leading-[150%] tracking-[-0.96px]">
              Where We’ve Studied
            </h2>
            <p className="self-stretch text-black font-dm-sans text-[20px] font-normal leading-[32px]">
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
            <div className="pointer-events-none absolute left-0 top-0 h-full w-[200px] bg-gradient-to-r from-white to-transparent z-10" />
            <div className="pointer-events-none absolute right-0 top-0 h-full w-[200px] bg-gradient-to-l from-white to-transparent z-10" />
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

        <div className="flex flex-col px-[100px] pt-[50px] pb-[20px] items-start gap-[50px] self-stretch">
          <h2 className="font-dm-sans text-[48px] font-[500] text-[#172447] leading-[150%] tracking-[-0.96px]">
            Our Team Around the World
          </h2>
        </div>
        <div className="pb-[50px] flex flex-col">
          {countries.map((countryName) => {
            const code = countriesInfo.getAlpha3Code(countryName, "en") || "UNKNOWN";
            return (
              <CountrySection
                key={countryName}
                id={`members-${code}`}
                countryName={countryName}
                members={membersByCountry[countryName]}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
