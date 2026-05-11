"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

import { WaysToGiveCarouselData } from "../carouselData";

import Parallax from "./parallax";

import { type FaqItem, getFaq } from "@/api/faq";
import { Button } from "@/components/button";
import { Carousel } from "@/components/Carousel";
import { ContactUs } from "@/components/ContactUs";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Highlights } from "@/components/Highlights";
import { ImpactSection } from "@/components/ImpactSection";

export default function Donors() {
  const [faqItems, setFaqItems] = useState<FaqItem[]>([]);

  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const data = await getFaq("donors");
        setFaqItems(data);
      } catch (error) {
        console.error(error);
      }
    };

    void fetchFaq();
  }, []);

  return (
    <div className="mx-auto flex flex-col justify-center items-center bg-white w-full">
      {/* Donors Hero */}
      <div className="flex w-full min-h-[632px] flex-col-reverse items-center gap-[40px] self-stretch px-[30px] pb-[40px] pt-[50px] md:min-h-screen md:flex-row md:justify-between md:gap-0 md:px-[100px] md:py-[150px]">
        <div className="flex w-full flex-col items-center gap-[20px] md:w-[639px] md:items-start md:gap-[50px]">
          <h1
            className="text-center text-[36px] leading-[110%] text-[#1E1E1E] md:text-left md:text-[64px] md:text-[#172447]"
            style={{ fontFamily: '"Ethic New", sans-serif' }}
          >
            Turn $100 into a <br /> <i>Thriving</i> Business
          </h1>
          <p className="w-[279px] text-center text-[14px] leading-[20px] text-[#5D5D5D] md:w-auto md:text-left md:text-[20px] md:leading-[160%]">
            Your donation gives entrepreneurs the capital they need but can't access through
            traditional banking. Watch as your gift launches businesses, creates jobs, and
            strengthens families across the globe.
          </p>
          <Button
            text="DONATE NOW"
            onClick_link="https://www.zeffy.com/en-US/donation-form/donate-to-make-a-difference-7390"
          />
        </div>
        <div className="relative h-[264px] w-full flex-shrink-0 overflow-hidden rounded-[10px] md:h-[581px] md:w-[646px]">
          <Image
            src="/imgs/donorHero.webp"
            alt="donor hero img"
            fill
            sizes="(min-width: 768px) 646px, calc(100vw - 60px)"
            className="object-cover object-center"
          />
        </div>
      </div>
      <Parallax />
      <Highlights />
      <div className="relative left-1/2 right-1/2 flex w-screen -translate-x-1/2">
        <Carousel data={WaysToGiveCarouselData} />
      </div>
      <ImpactSection title="Our Impact" />
      <FaqAccordion items={faqItems} />
      {/* "Start Creating Impact Now" Section */}
      <div className="relative flex h-[438px] w-full overflow-hidden bg-[#172447] shadow-[0px_19px_21.5px_rgba(0,0,0,0.1)] md:h-[767px] md:shadow-none">
        <div className="absolute inset-x-0 top-0 h-[235px] md:hidden">
          <Image
            src="/imgs/donateNow.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-x-0 top-0 h-full bg-[linear-gradient(0.663deg,#172447_47.172%,rgba(17,105,176,0)_84.565%)] md:hidden" />

        <div className="hidden w-full h-[767px] overflow-hidden bg-[#172447] justify-end md:flex">
          <div
            className="relative h-full"
            style={{
              aspectRatio: "1307 / 767",
              backgroundImage: `linear-gradient(to right, #172447 0%, rgba(23, 36, 71, 0.9) 12%, rgba(23, 36, 71, 0) 75%), url('/imgs/donateNow.webp')`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right center",
            }}
          >
            <div
              className="absolute top-0 right-0 h-full w-auto"
              style={{
                aspectRatio: "1307 / 767",
                backgroundImage: `url('/imgs/donateNowMask.webp')`,
                backgroundSize: "863px 872px",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right center",
              }}
            ></div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 flex w-full flex-col items-end gap-[15px] px-[30px] py-[50px] md:bottom-auto md:mt-[12vh] md:w-auto md:items-start md:gap-[40px] md:px-[100px] md:py-[75px]">
          <p
            className="w-full text-white text-[48px] font-light leading-[110%] md:text-[64px] md:font-normal"
            style={{ fontFamily: '"Ethic New", sans-serif' }}
          >
            Start Creating <br /> Impact <i>Now.</i>
          </p>
          <p className="w-full text-white font-dm-sans text-[12px] font-normal leading-[16px] md:w-[530px] md:text-[20px] md:leading-normal">
            Your $100 can launch a business, create jobs, and transform a family's future. See
            exactly where your donation goes and the lives you're changing.
          </p>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center text-[#012060] bg-white px-[15px] py-[10px] gap-[5px] rounded-[99px] font-dm-sans font-semibold text-[14px] leading-[150%] transition-colors duration-450 ease-in-out cursor-pointer hover:bg-[#172447] hover:text-white md:px-[20px] md:gap-[10px] md:text-[20px]"
            href="https://www.zeffy.com/en-US/donation-form/donate-to-make-a-difference-7390"
          >
            DONATE{" "}
            <Image
              src="/imgs/ic_arrowforward.svg"
              alt="arrow forward"
              width={21}
              height={21}
              className="h-[21px] w-[21px] transition-all duration-450 group-hover:brightness-0 group-hover:invert md:h-[36px] md:w-[36px]"
            />
          </a>
        </div>
      </div>
      <div id="contact">
        <ContactUs />
      </div>
    </div>
  );
}
