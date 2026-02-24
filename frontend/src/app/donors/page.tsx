"use client";
import Image from "next/image";

import { WaysToGiveCarouselData } from "../carouselData";

import Parallax from "./parallax";

import { Anchor } from "@/components/Anchor";
import { Carousel } from "@/components/Carousel";
import { ContactUs } from "@/components/ContactUs";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Highlights } from "@/components/Highlights";
import { ImpactSection } from "@/components/ImpactSection";

export default function Donors() {
  return (
    <div className="mx-auto flex flex-col justify-center items-center bg-white w-full">
      {/* Donors Hero */}
      <div className="flex py-[150px] px-[5vw] min-h-screen justify-between items-center w-full">
        <div className="flex w-[639px] flex-col items-start gap-[50px] shrink-0">
          <h1
            className="text-[#172447] text-[64px] leading-[110%]"
            style={{ fontFamily: '"Ethic New", sans-serif' }}
          >
            Turn $100 into a <br /> <i>Thriving</i> Business
          </h1>
          <p className="text-[#5D5D5D] text-[20px] leading-[160%]">
            Your donation gives entrepreneurs the capital they need but can't access through
            traditional banking. Watch as your gift launches businesses, creates jobs, and
            strengthens families across the globe.
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
      <Highlights />
      <div className="relative left-1/2 right-1/2 flex w-screen -translate-x-1/2">
        <Carousel data={WaysToGiveCarouselData} />
      </div>
      <ImpactSection />
      <FaqAccordion
        items={[
          {
            question: "Lorem ipsum dolor sit amet, consectetur?",
            answer:
              "We take this responsibility seriously because we know you've worked hard for your money and deserve to see real impact. Your donation follows a transparent path: it enters our microloan fund, gets matched with vetted entrepreneurs through our local partner organizations, and is disbursed via secure banking or mobile payment systems that create clear documentation. We provide regular updates showing the specific entrepreneurs your contribution helped, complete with photos, business details, and progress reports. Our **% repayment rate is strong evidence that real people received real capital and built sustainable businesses—you can't repay a loan you never received. Additionally, our financial statements undergo annual independent audits, **% of every dollar goes directly to loans (as verified by third-party review), and we welcome questions anytime you want more details about your donation's impact. We're not perfect, but we're committed to earning and keeping your trust through transparency at every step.",
          },
          {
            question: "Lorem ipsum dolor sit amet, consectetur?",
            answer:
              "We take this responsibility seriously because we know you've worked hard for your money and deserve to see real impact. Your donation follows a transparent path: it enters our microloan fund, gets matched with vetted entrepreneurs through our local partner organizations, and is disbursed via secure banking or mobile payment systems that create clear documentation. We provide regular updates showing the specific entrepreneurs your contribution helped, complete with photos, business details, and progress reports. Our **% repayment rate is strong evidence that real people received real capital and built sustainable businesses—you can't repay a loan you never received. Additionally, our financial statements undergo annual independent audits, **% of every dollar goes directly to loans (as verified by third-party review), and we welcome questions anytime you want more details about your donation's impact. We're not perfect, but we're committed to earning and keeping your trust through transparency at every step.",
          },
          {
            question: "Lorem ipsum dolor sit amet, consectetur?",
            answer:
              "We take this responsibility seriously because we know you've worked hard for your money and deserve to see real impact. Your donation follows a transparent path: it enters our microloan fund, gets matched with vetted entrepreneurs through our local partner organizations, and is disbursed via secure banking or mobile payment systems that create clear documentation. We provide regular updates showing the specific entrepreneurs your contribution helped, complete with photos, business details, and progress reports. Our **% repayment rate is strong evidence that real people received real capital and built sustainable businesses—you can't repay a loan you never received. Additionally, our financial statements undergo annual independent audits, **% of every dollar goes directly to loans (as verified by third-party review), and we welcome questions anytime you want more details about your donation's impact. We're not perfect, but we're committed to earning and keeping your trust through transparency at every step.",
          },
          {
            question: "Lorem ipsum dolor sit amet, consectetur?",
            answer:
              "We take this responsibility seriously because we know you've worked hard for your money and deserve to see real impact. Your donation follows a transparent path: it enters our microloan fund, gets matched with vetted entrepreneurs through our local partner organizations, and is disbursed via secure banking or mobile payment systems that create clear documentation. We provide regular updates showing the specific entrepreneurs your contribution helped, complete with photos, business details, and progress reports. Our **% repayment rate is strong evidence that real people received real capital and built sustainable businesses—you can't repay a loan you never received. Additionally, our financial statements undergo annual independent audits, **% of every dollar goes directly to loans (as verified by third-party review), and we welcome questions anytime you want more details about your donation's impact. We're not perfect, but we're committed to earning and keeping your trust through transparency at every step.",
          },
          {
            question: "Lorem ipsum dolor sit amet, consectetur?",
            answer:
              "We take this responsibility seriously because we know you've worked hard for your money and deserve to see real impact. Your donation follows a transparent path: it enters our microloan fund, gets matched with vetted entrepreneurs through our local partner organizations, and is disbursed via secure banking or mobile payment systems that create clear documentation. We provide regular updates showing the specific entrepreneurs your contribution helped, complete with photos, business details, and progress reports. Our **% repayment rate is strong evidence that real people received real capital and built sustainable businesses—you can't repay a loan you never received. Additionally, our financial statements undergo annual independent audits, **% of every dollar goes directly to loans (as verified by third-party review), and we welcome questions anytime you want more details about your donation's impact. We're not perfect, but we're committed to earning and keeping your trust through transparency at every step.",
          },
        ]}
      />
      {/* "Start Creating Impact Now" Section */}
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
      <ContactUs />
    </div>
  );
}
