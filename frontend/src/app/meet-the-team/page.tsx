"use client";

import countriesInfo from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

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
  email: string;
  headshotUrl: string;
};

export type College = {
  _id: string;
  name: string;
  imageUrl: string;
};

function CollegeCard({ college }: { college: College }) {
  return (
    <div
      className="flex items-center justify-center"
      style={{
        width: 100,
        height: 100,
        flexShrink: 0,
        background: `url(${college.imageUrl}) lightgray 50% / cover no-repeat`,
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
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
        const res = await fetch(`${backendUrl}/api/members`);

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

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        const res = await fetch(`${backendUrl}/api/colleges`);
        if (!res.ok) throw new Error("Failed to fetch colleges");
        const data = (await res.json()) as College[];
        console.log("Fetched colleges:", data); // <-- Move log here
        setColleges(data);
      } catch (error) {
        console.error("Error loading colleges:", error);
      }
    };

    void fetchColleges();
  }, []);

  return (
    <>
      <div className="bg-white overflow-x-hidden">
        <div className="flex w-full items-center justify-between self-stretch px-[100px] h-180">
          <div className="flex flex-col">
            <h1 className="text-[#1E1E1E] text-[64px] font-ethic font-light leading-[1.1]">
              Meet the Team
            </h1>
            <h1 className="text-[#1E1E1E] text-[64px] font-ethic font-light leading-[1.1]">
              Without <span className="italic">Borders</span>
            </h1>
            <p className="font-dm-sans mt-5 text-[24px] font-normal leading-[32px] text-[#5D5D5D] w-[80%]">
              Our professional team brings expertise from all over the world. Explore the clickable
              map of where our team members are from below.
            </p>
            <div>
              <Button
                text="join our team"
                onClick_link="https://my-apply.vercel.app/org/f3-global-foundation"
                className="flex justify-center items-center gap-[10px] px-[24px] py-[14px] bg-[#172447] rounded-[99px] transition-colors duration-450 ease-in-out hover:bg-[#1169B0] uppercase font-normal mt-12"
                textClassName="text-white text-normal"
              />
            </div>
          </div>
          <div
            className="ml-8 rounded-[10px] overflow-hidden relative"
            style={{ width: 1200, height: 550 }}
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

        <div className="flex flex-col px-[100px] py-[50px] items-start gap-[50px] self-stretch border-t border-[#F4F4F4] bg-white shadow-[0_19px_43px_0_rgba(0,0,0,0.10)]">
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
            className="overflow-x-auto"
            style={{ width: 1312, height: 151 }}>
            <div className="flex gap-[50px] items-center h-full">
              {colleges.map((college) => (
                <CollegeCard key={college._id} college={college} />
              ))}
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
