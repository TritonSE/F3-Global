import Image from "next/image";

import { Button } from "@/components/button";

export default function Members() {
  return (
    <>
      <div className="bg-white overflow-x-hidden">
        <div className="flex w-full items-center justify-between self-stretch px-[100px] h-180">
          <div className="flex flex-col">
            <h1 className="text-[#1E1E1E] text-[64px] font-ethic font-light leading-[1.1]">
              Become <span className="italic">Part</span> of Our
            </h1>
            <h1 className="text-[#1E1E1E] text-[64px] font-ethic font-light leading-[1.1]">
              Team Today!
            </h1>
            <p className="font-dm-sans mt-5 text-[24px] font-normal leading-[32px] text-[#5D5D5D] w-[70%]">
              Join F3 Global as a volunteer and make a meaningful impact in underserved communities
              worldwide.
            </p>
            <div>
              <Button
                text="apply now"
                onClick_link="https://my-apply.vercel.app/org/f3-global-foundation"
                className="flex justify-center items-center gap-[10px] px-[24px] py-[14px] bg-[#172447] rounded-[99px] transition-colors duration-450 ease-in-out hover:bg-[#1169B0] uppercase font-normal mt-12"
                textClassName="text-white text-normal"
              />
            </div>
          </div>
          <div
            className="rounded-[10px] overflow-hidden relative"
            style={{ width: 950, height: 550 }}
          >
            <Image
              src="/imgs/members_hero.png"
              alt="Volunteers Working with Children"
              fill
              className="object-cover object-center bg-cover bg-no-repeat bg-center"
              priority
            />
          </div>
        </div>
        <div
          className="flex flex-row w-full px-[50px] py-[200px] content-end items-center gap-[50px] border-t border-[#F4F4F4] relative"
          style={{
            boxShadow: "0 19px 43px 0 rgba(0, 0, 0, 0.10)",
          }}
        >
          <div className="flex flex-col flex-4">
            <div
              className="ml-8 rounded-[16px] overflow-hidden absolute left-[80px] top-[40px] z-1"
              style={{ width: 330, height: 200 }}
            >
              <Image
                src="/imgs/members_mission_1.jpg"
                alt="People Walking at Sunset"
                fill
                className="object-cover object-center bg-cover bg-no-repeat bg-center"
                priority
              />
            </div>
            <div
              className="rounded-[16px] overflow-hidden absolute left-[-8px] top-[145px] z-0"
              style={{ width: 623, height: 500, background: "#172447" }}
            >
              <Image
                src="/imgs/members_mission_4.jpg"
                alt="People Walking at Sunset"
                fill
                className="object-cover object-center bg-cover bg-no-repeat bg-center"
                priority
              />
              <div className="absolute inset-0 rounded-[16px] bg-[#172447] opacity-100 mix-blend-color pointer-events-none" />
            </div>
            <div
              className="rounded-[16px] overflow-hidden absolute left-[500px] top-[200px] z-2 p-0 m-0"
              style={{ width: 304, height: 372 }}
            >
              <Image
                src="/imgs/members_mission_2.jpg"
                alt="People Walking at Sunset"
                fill
                className="object-cover object-center bg-cover bg-no-repeat bg-center"
                priority
              />
            </div>
            <div
              className="rounded-[16px] overflow-hidden absolute left-[360px] top-[530px] z-1 p-0 m-0"
              style={{ width: 185, height: 165 }}
            >
              <Image
                src="/imgs/members_mission_3.jpg"
                alt="People Walking at Sunset"
                fill
                className="object-cover object-center bg-cover bg-no-repeat bg-center"
                priority
              />
            </div>
          </div>
          <div className="flex flex-col items-start gap-[20px] flex-3 mr-10">
            <h2 className="text-[#172447] font-dm-sans text-[48px] font-normal leading-[150%] spacing-[-0.96px]">
              Our Mission
            </h2>
            <p className="text-[#1E1E1E] font-dm-sans text-[24px] font-normal leading-[32px] mr-2">
              F3 Global supports{" "}
              <span className="text-[#012060] font-bold">
                underserved individuals and small businesses
              </span>{" "}
              by providing microfinance solutions to help launch or expand their ventures. By
              combining accessible financing with business advisory services, F3 Global aims to
              promote economic empowerment and foster entrepreneurship. Its mission is to{" "}
              <span className="text-[#012060] font-bold">create meaningful, long-term impact </span>{" "}
              in communities through innovative support and development initiatives.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
