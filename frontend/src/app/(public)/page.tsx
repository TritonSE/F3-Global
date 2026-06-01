"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

import { getAllCities } from "@/api/cities";
import { DonorsClientsMembersCarouselData } from "@/app/(public)/carouselData";
import { Button } from "@/components/button";
import { Carousel } from "@/components/Carousel";
import { ContactUs } from "@/components/ContactUs";
import { Highlights } from "@/components/Highlights";
import { ImpactSection } from "@/components/ImpactSection";
import { ServicesSection } from "@/components/services-section";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1200);
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    async function loadCities() {
      try {
        const fetchedCities = await getAllCities();
        setCities(fetchedCities);
      } catch (error) {
        console.error("Failed to fetch cities:", error);
      }
    }
    void loadCities();
  }, []);

  useEffect(() => {
    if (window.location.search.includes("contact=true")) {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        setTimeout(() => {
          const headerOffset = window.matchMedia("(min-width: 768px)").matches ? 120 : 80;
          const top = contactSection.getBoundingClientRect().top + window.scrollY - headerOffset;
          window.scrollTo({ top, behavior: "smooth" });
          window.history.replaceState(null, "", "/"); // clean url after scrolling animation
        }, 100);
      }
    }
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
    if (cities.length === 0) return [];

    const singleSetWidth = cities.length * 180;
    const rawCopies = Math.ceil((containerWidth * 2) / singleSetWidth);
    const copies = Math.max(4, rawCopies % 2 === 0 ? rawCopies : rawCopies + 1);
    return Array.from({ length: copies }, (_, copyIndex) =>
      cities.map((city) => ({
        city,
        uniqueKey: `${city}-copy${copyIndex}`,
      })),
    ).flat();
  }, [containerWidth, cities]);

  return (
    <div className="relative w-full bg-white flex flex-col overflow-hidden">
      {/* hero */}
      <div className="relative flex flex-col items-center md:min-h-screen">
        {/* map gradient */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none select-none overflow-hidden">
          <div className="absolute -top-[10%] left-[5%] w-[100%] h-[95%] opacity-25 md:-top-[35%] md:left-auto md:-right-[55%] md:w-[120%] md:h-[120%]">
            <Image
              src="/imgs/worldmap.png"
              alt="World Map Background"
              fill
              className="object-cover"
              priority
              style={{
                objectPosition: "0% 0%",
              }}
            />
          </div>

          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(197.05deg, rgba(107, 53, 53, 0) 12.21%, #FFFFFF 68.32%)",
            }}
          />
        </div>
        {/* hero text */}
        <div className="relative flex flex-col self-stretch px-[20px] md:px-[100px] pt-[186px] md:pt-[80px] justify-center items-start gap-[10px] md:gap-[32px] w-full md:w-auto">
          <p className="font-ethic text-[60px] md:text-[120px] text-[#172447] font-light [font-feature-settings:'dlig'_on] font-[300] leading-[60px] md:leading-[110px]">
            <span className="block italic">Empowering</span>
            <span className="block">Small</span>
            <span className="block">Businesses</span>
          </p>
          <div className="flex w-full md:max-w-[754px] md:h-[74px] flex-col justify-center">
            <p className="font-dm-sans text-[#5D5D5D] text-[14px] md:text-[20px] font-normal font-[400] leading-[20px] md:leading-[32px]">
              Join us in our mission to foster economic growth and financial inclusion for
              underserved communities worldwide.
            </p>
          </div>
        </div>
        {/* buttons */}
        <div className="relative mt-[30px] flex flex-col items-center gap-[10px] md:mt-[60px] md:flex-row md:gap-[30px]">
          <Button
            text="become a client"
            onClick_link="/clients"
            className="flex justify-center items-center gap-[10px] px-[15px] py-[10px] md:px-[20px] md:py-[15px] bg-[#172447] rounded-[99px] transition-colors duration-450 ease-in-out hover:bg-[#1169B0] [&_p]:uppercase [&_p]:font-semibold cursor-pointer"
            textClassName="text-white text-[12px] md:text-base"
          />
          <Button
            text="join as a member"
            onClick_link="/members"
            className="flex justify-center items-center gap-[10px] px-[15px] py-[10px] md:px-[20px] md:py-[15px] bg-white border-[1.5px] border-[#C7C7C7] rounded-[99px] transition-colors duration-450 ease-in-out hover:bg-[#C7C7C7] hover:border-black [&_p]:text-[#172447] [&_p]:uppercase [&_p]:font-semibold cursor-pointer"
            textClassName="text-[#172447] text-[12px] md:text-base"
          />
        </div>
        {/* city scrolling */}
        <div
          ref={containerRef}
          className="mt-[30px] flex h-[70px] w-full overflow-hidden md:mt-[67px] md:h-auto"
        >
          <div className="flex animate-marquee whitespace-nowrap">
            {repeated.map((city) => (
              <div key={city.uniqueKey} className="flex items-center">
                <span className="text-[#5D5D5D] text-[20px] md:text-[32px] leading-[32px] font-ethic font-light italic [font-feature-settings:'dlig'_on]">
                  {city.city}
                </span>
                <span className="text-[#5D5D5D] text-[20px] md:text-[32px] leading-[32px] mx-6">
                  •
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* mission */}
      <div className="flex w-full flex-col items-center gap-[20px] border-t border-[#F4F4F4] bg-white px-[30px] py-[50px] text-center md:gap-[50px] md:px-[200px] md:py-[100px]">
        <h2 className="font-ethic text-[48px] font-light italic leading-[1.5] text-[#172447] md:text-[96px]">
          Mission
        </h2>
        <p className="w-full font-dm-sans text-[14px] font-normal leading-[20px] text-[#1E1E1E] md:max-w-[870px] md:text-[20px] md:leading-[32px]">
          Microfinancing is transforming lives across continents, empowering{" "}
          <span className="text-[#012060] font-bold">millions</span> with access to essential
          financial services. Join us in our mission to foster{" "}
          <span className="text-[#012060] font-bold">economic growth</span> and financial inclusion
          for <span className="text-[#012060] font-bold">underserved communities</span> worldwide.
        </p>
      </div>
      <ImpactSection title="Building Futures Together" />
      <ServicesSection />
      <Carousel data={DonorsClientsMembersCarouselData} />
      <Highlights />
      <div id="contact">
        <ContactUs />
      </div>
    </div>
  );
}
