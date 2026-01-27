import Image from "next/image";

import type { CountryData } from "@/components/InteractiveWorldMap";

import { Button } from "@/components/button";
import { InteractiveWorldMap } from "@/components/InteractiveWorldMap";

export default function MeetTheTeam() {
  const countryData: CountryData[] = [
    { code: "USA", name: "United States", employeeCount: 5 },
    { code: "CAN", name: "Canada", employeeCount: 1 },
    { code: "AUS", name: "Australia", employeeCount: 1 },
    { code: "ESP", name: "Spain", employeeCount: 1 },
    { code: "ITA", name: "Italy", employeeCount: 1 },
    { code: "CHN", name: "China", employeeCount: 1 },
    { code: "IND", name: "India", employeeCount: 1 },
  ];

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
            <p className="font-dm-sans mt-5 text-[24px] font-normal leading-[32px] text-[#5D5D5D]">
              Our professional team brings expertise from all over the world. Explore the clickable
              map of where our team members are from below.
            </p>
            <div>
              <Button
                text="join our team"
                onClick_link="https://my-apply.vercel.app/org/f3-global-foundation"
                external
                className="flex justify-center items-center gap-[10px] px-[24px] py-[14px] bg-[#172447] rounded-[99px] transition-colors duration-450 ease-in-out hover:bg-[#1169B0] uppercase font-normal mt-12"
              />
            </div>
          </div>
          <div
            className="ml-8 rounded-[10px] overflow-hidden relative"
            style={{ width: 1500, height: 550 }}
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
        <div className="border-t border-[#F4F4F4] shadow-[0_19px_43px_0_rgba(0,0,0,0.10)]">
          <InteractiveWorldMap data={countryData} />
        </div>
      </div>
    </>
  );
}
