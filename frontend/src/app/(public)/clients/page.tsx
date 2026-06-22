"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

import { getClientHighlights, type HighlightItem } from "@/api/clientHighlights";
import { type FaqItem, getFaq } from "@/api/faq";
import { Button } from "@/components/button";
import ClientStoryOverall from "@/components/clients-page/ClientsStoryOverall";
import { ContactUs } from "@/components/ContactUs";
import { FaqAccordion } from "@/components/FaqAccordion";
import { ServicesSection } from "@/components/services-section";

export default function About() {
  const [primaryHighlight, setPrimaryHighlight] = useState<HighlightItem | null>(null);
  const [faqItems, setFaqItems] = useState<FaqItem[]>([]);

  useEffect(() => {
    const fetchPrimary = async () => {
      try {
        const data = await getClientHighlights();
        const primary = data.find((h) => h.order === 0);
        if (primary) {
          setPrimaryHighlight(primary);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchFaq = async () => {
      try {
        const data = await getFaq("clients");
        setFaqItems(data);
      } catch (error) {
        console.error(error);
      }
    };

    void fetchPrimary();
    void fetchFaq();
  }, []);

  return (
    <>
      <div className="mx-auto w-full max-w-[1512px] overflow-x-hidden bg-white">
        <div className="flex w-full flex-col-reverse items-center justify-between gap-[40px] self-stretch px-[30px] pb-[60px] pt-[80px] lg:flex-row lg:gap-0 lg:px-[100px] lg:py-[80px]">
          <div className="flex w-full lg:w-[639px] flex-col items-center lg:items-start gap-6 lg:gap-[50px] text-center lg:text-left">
            <h1 className="text-[#172447] text-[40px] sm:text-[52px] lg:text-[64px] font-ethic font-light leading-[1.1]">
              Services That Create <br /> <span className="italic">Lasting</span> Impact
            </h1>
            <p className="font-dm-sans text-base sm:text-lg lg:text-[20px] font-normal leading-[1.6] text-[#5D5D5D] w-full lg:w-[80%]">
              Partner with F3 Global, providing microloans, guidance, and resources designed to
              support small business owners and entrepreneurs on their path to long-term success.
            </p>
            <div>
              <Button
                text="CONTACT US"
                onClick={() => {
                  const contactSection = document.getElementById("contact");
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth", block: "center" });
                  }
                }}
              />
            </div>
          </div>

          <div className="relative w-full lg:w-[646px] h-[260px] sm:h-[380px] lg:h-[581px] overflow-hidden rounded-[10px] flex-shrink-0">
            <Image
              src="/imgs/clients/computer-lab.webp"
              alt="Modern computer lab"
              fill
              sizes="(max-width: 1024px) 100vw, 646px"
              className="object-cover object-center"
              priority
            />
          </div>
        </div>

        <ServicesSection />

        {primaryHighlight && (
          <ClientStoryOverall
            image={primaryHighlight.imageUrl}
            description={primaryHighlight.previewText}
            fullText={primaryHighlight.fullText}
          />
        )}

        <FaqAccordion items={faqItems} />

        <div id="contact">
          <ContactUs />
        </div>
      </div>
    </>
  );
}
