import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/button";

export default function Home() {
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
                src="/worldmap.png"
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
              />
              <Button
                text="join as a member"
                onClick_link="/members"
                className="flex justify-center items-center gap-[10px] px-[20px] py-[15px] bg-white border-[1.5px] border-[#C7C7C7] rounded-[99px] transition-colors duration-450 ease-in-out hover:bg-[#C7C7C7] hover:border-black [&_p]:text-[#172447] [&_p]:uppercase [&_p]:font-normal"
              />
              z
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
          <div className="relative z-20 w-full mt-20 px-[5vw] flex flex-col items-center">
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
          <div className="relative z-20 w-full mt-32 px-[5vw] flex gap-6 flex-col items-start pb-20">
            <h3 className="text-[#172447] font-dm text-[48px] font-medium leading-[1.5] tracking-[-0.96px]">
              Building Futures Together
            </h3>
            <div className="self-stretch flex justify-between items-start p-[25px] rounded-[10px] bg-[#EBEBEB]">
              <div className="w-[375px] flex flex-col items-start self-stretch">
                <h4 className="text-[#012060] font-ethic text-[64px] font-light leading-[1.1]">
                  $10K
                </h4>
                <p className="text-[#1E1E1E] font-dm text-[24px] font-semibold leading-[1.5]">
                  Total Raised
                </p>
                <p className="text-[#5D5D5D] font-dm text-[16px] font-normal leading-[1.5]">
                  Deployed as microloans to entrepreneurs lacking traditional banking access,
                  providing capital to launch businesses and lift families out of poverty.
                </p>
              </div>

              <div className="w-[2px] h-48 bg-[#C7C7C7] mx-6 self-center"></div>

              <div className="w-[375px] flex flex-col items-start self-stretch">
                <h4 className="text-[#012060] font-ethic text-[64px] font-light leading-[1.1]">
                  57
                </h4>
                <p className="text-[#1E1E1E] font-dm text-[24px] font-semibold leading-[1.5]">
                  Members Worldwide
                </p>
                <p className="text-[#5D5D5D] font-dm text-[16px] font-normal leading-[1.5]">
                  Funding microloans that help entrepreneurs across continents launch businesses,
                  create jobs, and build sustainable futures for their communities.
                </p>
              </div>

              <div className="w-[2px] h-48 bg-[#C7C7C7] mx-6 self-center"></div>

              <div className="w-[375px] flex flex-col items-start self-stretch">
                <h4 className="text-[#012060] font-ethic text-[64px] font-light leading-[1.1]">
                  25
                </h4>
                <p className="text-[#1E1E1E] font-dm text-[24px] font-semibold leading-[1.5]">
                  Organizations Supported
                </p>
                <p className="text-[#5D5D5D] font-dm text-[16px] font-normal leading-[1.5]">
                  Invested directly into entrepreneurs worldwide, providing the capital they need to
                  launch businesses, create employment, and build thriving futures.
                </p>
              </div>
            </div>
            <p className="text-[#5D5D5D] font-dm text-[16px] font-bold leading-[1.5] mt-4 self-start uppercase">
              *Data from Jan 2026
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
