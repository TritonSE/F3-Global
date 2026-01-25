import Image from "next/image";

import { Anchor } from "@/components/Anchor";

export default function Donors() {
  return (
    <div className="mx-auto flex flex-col justify-center items-center bg-white w-full">
      <div className="flex py-[150px] px-[100px] justify-between items-center w-full">
        <div className="flex w-[639px] flex-col items-start gap-[50px] shrink-0">
          <h1
            className="text-[#1E0A0A] text-[64px]"
            style={{ fontFamily: '"Ethic New", sans-serif' }}
          >
            Turn $100 into a <br /> <i>Thriving</i> Business
          </h1>
          <p>
            Every thriving business starts with a single opportunity. Your donation gives
            entrepreneurs the capital they need but can't access through traditional banking. Watch
            as your gift launches businesses, creates jobs, and strengthens families across the
            globe—with complete transparency every step of the way.
          </p>
          <Anchor
            text="DONATE NOW"
            link="https://www.zeffy.com/en-US/donation-form/donate-to-make-a-difference-7390"
          />
        </div>
        <Image
          src="/imgs/donorHero.png"
          alt="donor hero img"
          width={646}
          height={581}
          className="rounded-[10px]"
        />
      </div>
      {/* How You Can Help section */}
      {/* Client Highlights Carousel */}
      {/* Ways to Give section */}
      <div className="relative z-20 w-full mt-32 px-[5vw] flex gap-6 flex-col items-start pb-20">
        <h3 className="text-[#172447] font-dm text-[48px] font-medium leading-[1.5] tracking-[-0.96px]">
          Our Impact
        </h3>
        <div className="self-stretch flex justify-between items-start p-[25px] rounded-[10px] bg-[#EBEBEB]">
          <div className="w-[375px] flex flex-col items-start self-stretch">
            <h4 className="text-[#012060] font-ethic text-[64px] font-light leading-[1.1]">$10K</h4>
            <p className="text-[#1E1E1E] font-dm text-[24px] font-semibold leading-[1.5]">
              Total Raised
            </p>
            <p className="text-[#5D5D5D] font-dm text-[16px] font-normal leading-[1.5]">
              Deployed as microloans to entrepreneurs lacking traditional banking access, providing
              capital to launch businesses and lift families out of poverty.
            </p>
          </div>

          <div className="w-[2px] h-48 bg-[#C7C7C7] mx-6 self-center"></div>

          <div className="w-[375px] flex flex-col items-start self-stretch">
            <h4 className="text-[#012060] font-ethic text-[64px] font-light leading-[1.1]">57</h4>
            <p className="text-[#1E1E1E] font-dm text-[24px] font-semibold leading-[1.5]">
              Members Worldwide
            </p>
            <p className="text-[#5D5D5D] font-dm text-[16px] font-normal leading-[1.5]">
              Funding microloans that help entrepreneurs across continents launch businesses, create
              jobs, and build sustainable futures for their communities.
            </p>
          </div>

          <div className="w-[2px] h-48 bg-[#C7C7C7] mx-6 self-center"></div>

          <div className="w-[375px] flex flex-col items-start self-stretch">
            <h4 className="text-[#012060] font-ethic text-[64px] font-light leading-[1.1]">25</h4>
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
      {/* Questions TODO */}
      <div className="w-full h-[767px] flex">
        <div className="w-full h-[767px] flex overflow-hidden bg-[#172447] justify-end">
          <div
            className="relative h-full"
            style={{
              aspectRatio: "1307 / 767",
              backgroundImage: `linear-gradient(to right, #172447 0%, rgba(23, 36, 71, 0.9) 12%, rgba(23, 36, 71, 0) 75%), url('/imgs/donateNow.png')`,
              // backgroundSize: "auto 767px",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right center",
            }}
          >
            <div
              className="absolute top-0 right-0 h-full w-auto"
              style={{
                aspectRatio: "1307 / 767",
                backgroundImage: `url('/imgs/donateNowMask.png')`,
                backgroundSize: "863px 872px",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right center",
              }}
            ></div>
          </div>
        </div>

        <div className="absolute flex flex-col px-[100px] pt-[42px] pb-[75px] items-start gap-[40px] mt-[174px]">
          <p className="text-white text-[64px]" style={{ fontFamily: '"Ethic New", sans-serif' }}>
            Start Creating <br /> Impact <i>Now.</i>
          </p>
          <p className="w-[530px] text-white text-[24px]">
            Your $100 can launch a business, create jobs, and transform a family's future. See
            exactly where your donation goes and the lives you're changing.
          </p>
          <a
            target="_blank"
            className="inline-flex items-center justify-center text-[#012060] bg-white px-[20px] py-[10px] gap-[10px] rounded-[99px] font-semibold text-[24px] cursor-pointer"
            href="https://www.zeffy.com/en-US/donation-form/donate-to-make-a-difference-7390"
          >
            DONATE <img src="/imgs/ic_arrowforward.svg" alt="arrow forward" />
          </a>
        </div>
      </div>
      {/* Contact Us section */}
    </div>
  );
}
