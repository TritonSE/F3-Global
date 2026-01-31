"use client";

import Image from "next/image";
import { useEffect } from "react";

import { DonorsClientsMembersCarouselData } from "@/app/carouselData";
import { Button } from "@/components/button";
import { ContactUs } from "@/components/ContactUs";
import { DonorsClientsMembersCarousel } from "@/components/DonorsClientsMembersCarousel";
import { ImpactSection } from "@/components/ImpactSection";

export default function Home() {
  useEffect(() => {
    if (window.location.search.includes("contact=true")) {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        setTimeout(() => {
          contactSection.scrollIntoView({ behavior: "smooth" });
          window.history.replaceState(null, "", "/"); // clean url after scrolling animation
        }, 100);
      }
    }
  }, []);

  const cities = [
    "Hong Kong",
    "Mumbai",
    "São Paulo",
    "Tokyo",
    "San Diego",
    "Mexico City",
    "London",
    "Seattle",
    "Jakarta",
    "Cairo",
  ];

  return (
    <>
      <div>
        <div className="relative w-full min-h-screen bg-[#f6f6f6] overflow-x-hidden">
          <div className="absolute top-0 left-0 w-full h-screen pointer-events-none select-none overflow-hidden">
            <div className="absolute -top-[35%] -right-[55%] w-[120%] h-[120%] opacity-25">
              <Image
                src="/imgs/worldmap.png"
                alt="World Map Background"
                fill
                className="object-cover"
                priority
                style={{
                  objectPosition: "100% 0%",
                }}
              />
            </div>

            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(197.05deg, rgba(246, 246, 246, 0) 12.21%, rgb(246, 246, 246) 68.32%)",
              }}
            />
          </div>

          <div className="relative z-10 w-full pl-[5vw] pt-[8vw] m-left">
            <h1 className="text-[#172447] text-[8vw] leading-[0.92] font-ethic font-light [font-feature-settings:'dlig'_on]">
              <span className="block italic">Empowering</span>
              <span className="block">Small</span>
              <span className="block">Businesses</span>
            </h1>
            <p className="font-dm text-[#5D5D5D] text-[24px] leading-[32px] font-normal mt-8 max-w-3xl">
              Join us in our mission to foster economic growth and financial inclusion for
              underserved communities worldwide.
            </p>
            <div className="absolute left-0 right-0 flex justify-center items-center gap-[30px] mt-10">
              <Button
                text="become a client"
                onClick_link="/clients"
                className="flex justify-center items-center gap-[10px] px-[20px] py-[15px] bg-[#172447] rounded-[99px] transition-colors duration-450 ease-in-out hover:bg-[#1169B0] [&_p]:uppercase [&_p]:font-normal"
                textClassName="text-white"
              />
              <Button
                text="join as a member"
                onClick_link="/members"
                className="flex justify-center items-center gap-[10px] px-[20px] py-[15px] bg-white border-[1.5px] border-[#C7C7C7] rounded-[99px] transition-colors duration-450 ease-in-out hover:bg-[#C7C7C7] hover:border-black [&_p]:text-[#172447] [&_p]:uppercase [&_p]:font-normal"
              />
            </div>
          </div>
          <div className="w-full mt-38 overflow-hidden flex">
            <div className="flex animate-marquee whitespace-nowrap">
              {cities.map((city, index) => (
                <div key={`city-1-${index}`} className="flex items-center">
                  <span className="text-[#5D5D5D] text-[32px] leading-[32px] font-ethic font-light italic [font-feature-settings:'dlig'_on]">
                    {city}
                  </span>
                  <span className="text-[#5D5D5D] text-[32px] leading-[32px] mx-6">•</span>
                </div>
              ))}

              {cities.map((city, index) => (
                <div key={`city-2-${index}`} className="flex items-center">
                  <span className="text-[#5D5D5D] text-[32px] leading-[32px] font-ethic font-light italic [font-feature-settings:'dlig'_on]">
                    {city}
                  </span>
                  <span className="text-[#5D5D5D] text-[32px] leading-[32px] mx-6">•</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative z-20 w-full mt-20 px-[5vw] flex flex-col items-center mb-20">
            <h2 className="text-[#172447] text-[96px] leading-[1.5] font-ethic font-light italic mb-12">
              Mission
            </h2>

            <p className="text-[#1E1E1E] text-center font-dm text-[24px] font-normal leading-[32px] max-w-4xl self-stretch mx-auto">
              Microfinancing is transforming lives across continents, empowering{" "}
              <span className="text-[#012060] font-bold">millions</span> with access to essential
              financial services. Join us in our mission to foster{" "}
              <span className="text-[#012060] font-bold">economic growth</span> and financial
              inclusion for{" "}
              <span className="text-[#012060] font-bold">underserved communities</span> worldwide.
            </p>
          </div>
          <ImpactSection />
          <div className="relative left-1/2 right-1/2 flex w-screen -translate-x-1/2">
            <DonorsClientsMembersCarousel data={DonorsClientsMembersCarouselData} />
          </div>
        </div>
      </div>
    </>
  );
}
