import Image from "next/image";

import { Anchor } from "@/components/Anchor";
import { Button } from "@/components/button";
import {
  TIMELINE_HEADER,
  TIMELINE_INSTRUCTION,
  TimelineSection,
} from "@/components/timeline-section";

export default function About() {
  return (
    <div className="mx-auto flex flex-col justify-center bg-white w-[1513px]">
      <div className="flex h-[774px] px-[100px] justify-between items-center w-full">
        <div className="flex flex-col items-start gap-[50px] w-[639px]">
          <h1
            className="text-[#1E1E1E] font-ethic-new text-[64px] leading-[96px] font-light pr-[90px]"
            style={{ fontFamily: '"Ethic New"', fontWeight: 300 }}
          >
            From Vision to Global <i>Impact</i>
          </h1>
          <p className="text-[#5D5D5D] font-dm-sans text-[24px] font-normal leading-[32px] pr-[60px]">
            Our programs offer tailored microloans and business support, ensuring that our clients
            have the knowledge and resources necessary for long-term success.
          </p>
          <Anchor text="JOIN US NOW" link="https://my-apply.vercel.app/org/f3-global-foundation" />
        </div>
        <div>
          <Image src="/imgs/about-us.png" alt="About us image" width={646} height={581} />
        </div>
      </div>

      <div className="flex flex-col items-start gap-[50px] px-[100px] pb-[50px] w-full">
        <h1 className="text-[#172447] font-dm-sans text-[48px] font-medium leading-[72px] tracking-[-0.96px]">
          Our Story
        </h1>
        <div className="flex flex-col gap-[20px] w-full text-black font-dm-sans text-[24px] font-normal leading-[32px]">
          <p>
            At F3 Global, we are a 501(c)(3) non-profit organization dedicated to empowering
            underserved communities around the globe through innovative microfinance solutions. Our
            mission is to provide access to financial resources that foster entrepreneurship,
            enabling individuals to build sustainable businesses and uplift their communities.
          </p>
          <p>
            We aim to serve a diverse range of communities, focusing on women, minorities, and those
            in low-income areas. Our programs offer tailored microloans and business support,
            ensuring that our clients have the knowledge and resources necessary for long-term
            success.
          </p>
        </div>
        <Button
          text="MORE ABOUT OUR TEAM"
          onClick_link="/members"
          textClassName="text-white text-normal"
        />
      </div>

      {/* Path to Impact + Timeline */}
      <div className=" pt-[50px] flex flex-col gap-[20px] w-full">
        <div className="flex flex-col gap-[30px] w-full">
          <div className="px-[100px] py-[10px] flex flex-col gap-[20px]">
            <h2 className="font-dm font-medium text-[48px] text-[#172447] tracking-[-0.96px] leading-[1.5]">
              {TIMELINE_HEADER.title}
            </h2>
            <p className="font-dm font-normal text-[24px] text-black leading-[32px] max-w-[1073px]">
              {TIMELINE_HEADER.description}
            </p>
          </div>
          <div className="flex items-center justify-center w-full">
            <p className="font-dm italic text-[16px] text-[#5d5d5d] leading-[24px] text-center">
              {TIMELINE_INSTRUCTION}
            </p>
          </div>
        </div>
        <TimelineSection />
      </div>
    </div>
  );
}
