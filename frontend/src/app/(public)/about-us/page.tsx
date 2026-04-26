import Image from "next/image";

import { Button } from "@/components/button";
import { ClientCarousel } from "@/components/ClientCarousel";
import { Highlights } from "@/components/Highlights";
import {
  TIMELINE_HEADER,
  TIMELINE_INSTRUCTION,
  TimelineSection,
} from "@/components/timeline-section";

export default function About() {
  return (
    <div className="mx-auto flex flex-col justify-center bg-white w-full">
      {/* Hero */}
      <div className="flex flex-col md:flex-row w-full items-center justify-between self-stretch px-[30px] md:px-[100px] py-[60px] pt-[100px] md:min-h-screen gap-[40px] md:gap-0">
        <div className="relative w-full md:w-[646px] h-[280px] md:h-[581px] overflow-hidden rounded-[10px] flex-shrink-0 order-first md:order-last">
          <Image
            src="/imgs/about-us.webp"
            alt="About us image"
            fill
            sizes="(max-width: 768px) 100vw, 646px"
            className="object-cover object-center"
          />
        </div>
        <div className="flex flex-col items-center md:items-start gap-[20px] md:gap-[50px] w-full md:w-[639px]">
          <h1
            className="text-[#1E1E1E] font-ethic-new text-[36px] md:text-[64px] font-light md:pr-[90px"
            style={{ fontFamily: '"Ethic New"', fontWeight: 300, lineHeight: "1.1" }}
          >
            From Vision to <br /> Global <i>Impact</i>
          </h1>
          <p className="text-[#5D5D5D] font-dm-sans w-[279px] md:w-full text-[14px] md:text-[20px] text-center md:text-start font-normal leading-[20px] md:leading-[32px] md:pr-[60px]">
            Our programs offer tailored microloans and business support, ensuring that our clients
            have the knowledge and resources necessary for long-term success.
          </p>
          <Button
            text="JOIN US NOW"
            onClick_link="https://my-apply.vercel.app/org/f3-global-foundation"
          />
        </div>
      </div>

      {/* Our Story */}
      <div className="flex flex-col items-start gap-[20px] md:gap-[50px] px-[30px] md:px-[100px] py-[50px] w-full">
        <h1 className="text-[#172447] font-dm-sans text-[28px] md:text-[48px] font-medium leading-[1.5] -tracking-[0.56px] md:tracking-[-0.96px]">
          Our Story
        </h1>
        <div className="flex flex-col gap-[20px] w-full text-black font-dm-sans text-[14px] md:text-[20px] font-normal leading-[20px] md:leading-[32px] mb-[20px] md:mb-0">
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
        <Button text="MORE ABOUT OUR TEAM" onClick_link="/meet-the-team" />
      </div>

      {/* Path to Impact + Timeline */}
      <div className="pt-[50px] flex flex-col gap-[20px] w-full">
        <div className="flex flex-col gap-[30px] w-full">
          <div className="px-[30px] md:px-[100px] md:py-[10px] flex flex-col gap-[20px]">
            <h2 className="font-dm font-medium text-[28px] md:text-[48px] text-[#172447] -tracking-[0.56px] md:tracking-[-0.96px] leading-[1.5]">
              {TIMELINE_HEADER.title}
            </h2>
            <p className="font-dm font-normal text-[14px] md:text-[20px] text-black leading-[20px] md:leading-[32px] max-w-[1073px]">
              {TIMELINE_HEADER.description}
            </p>
          </div>
          <div className="hidden md:flex items-center justify-center w-full px-[24px] md:px-0">
            <p className="font-dm italic text-[14px] md:text-[16px] text-[#5d5d5d] leading-[24px] text-center">
              {TIMELINE_INSTRUCTION}
            </p>
          </div>
        </div>
        <TimelineSection />
      </div>
      <ClientCarousel />
      <Highlights />
      {/* alumni carousel */}
    </div>
  );
}
