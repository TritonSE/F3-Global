import Image from "next/image";
import Parallax from "./parallax";

import { Anchor } from "@/components/Anchor";
import { FaqSection } from "@/components/FaqAccordion";
import { ImpactSection } from "@/components/ImpactSection";

export default function Donors() {
  return (
    <div className="mx-auto flex flex-col justify-center items-center bg-white w-full">
      <div className="flex py-[150px] px-[5vw] min-h-screen justify-between items-center w-full">
        <div className="flex w-[639px] flex-col items-start gap-[50px] shrink-0">
          <h1
            className="text-[#172447] text-[64px] leading-[110%]"
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
          className="rounded-[10px] h-[581px] w-[646px] object-center object-cover"
        />
      </div>
      <Parallax />
      {/* How You Can Help section */}
      {/* Client Highlights Carousel */}
      {/* Ways to Give section */}
      <ImpactSection />
      <FaqSection page="donors" />
      <div className="w-full h-[767px] flex">
        <div className="w-full h-[767px] flex overflow-hidden bg-[#172447] justify-end">
          <div
            className="relative h-full"
            style={{
              aspectRatio: "1307 / 767",
              backgroundImage: `linear-gradient(to right, #172447 0%, rgba(23, 36, 71, 0.9) 12%, rgba(23, 36, 71, 0) 75%), url('/imgs/donateNow.png')`,
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

        <div className="absolute flex flex-col px-[5vw] py-[75px] mt-[12vh] items-start gap-[40px]">
          <p
            className="text-white text-[64px] leading-[110%]"
            style={{ fontFamily: '"Ethic New", sans-serif' }}
          >
            Start Creating <br /> Impact <i>Now.</i>
          </p>
          <p className="w-[530px] text-white text-[24px]">
            Your $100 can launch a business, create jobs, and transform a family's future. See
            exactly where your donation goes and the lives you're changing.
          </p>
          <a
            target="_blank"
            className="group inline-flex items-center justify-center text-[#012060] bg-white px-[20px] py-[10px] gap-[10px] rounded-[99px] font-semibold text-[24px] cursor-pointer hover:bg-[#172447] hover:text-white"
            href="https://www.zeffy.com/en-US/donation-form/donate-to-make-a-difference-7390"
          >
            DONATE{" "}
            <Image
              src="/imgs/ic_arrowforward.svg"
              alt="arrow forward"
              width={36}
              height={36}
              className="group-hover:brightness-0 group-hover:invert"
            />
          </a>
        </div>
      </div>
      {/* Contact Us section */}
    </div>
  );
}
