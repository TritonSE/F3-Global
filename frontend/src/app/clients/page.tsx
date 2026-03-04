"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

import { getClientHighlights, type HighlightItem } from "@/api/clientHighlights";
import { type FaqItem, getFaq } from "@/api/faq";
import { Button } from "@/components/button";
import ClientStoryOverall from "@/components/clients-page/ClientsStoryOverall";
import { ContactUs } from "@/components/ContactUs";
import { FaqAccordion } from "@/components/FaqAccordion";

export default function About() {
  const [primaryHighlight, setPrimaryHighlight] = useState<HighlightItem | null>(null);
  const [faqItems, setFaqItems] = useState<FaqItem[]>([]);

  useEffect(() => {
    const fetchPrimary = async () => {
      try {
        const data = await getClientHighlights();
        const primary = data.find((h) => h.order === 1);
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
      <div className="bg-white overflow-x-hidden">
        <div className="flex w-full items-center justify-between self-stretch px-[100px] min-h-screen">
          <div className="flex flex-col">
            <h1 className="text-[#172447] text-[64px] font-ethic font-light leading-[1.1]">
              Services That Create
            </h1>
            <h1 className="text-[#172447] text-[64px] font-ethic font-light leading-[1.1]">
              <span className="italic">Lasting</span> Impact
            </h1>
            <p className="font-dm-sans mt-5 text-[24px] font-normal leading-[32px] text-[#5D5D5D] w-[80%]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
            <div>
              <Button
                text="Contact Us"
                className="flex justify-center items-center gap-[10px] px-[24px] py-[14px] bg-[#172447] rounded-[99px] transition-colors duration-450 ease-in-out hover:bg-[#1169B0] cursor-pointer uppercase font-normal mt-12"
                textClassName="text-white text-normal"
                onClick={() => {
                  const contactSection = document.getElementById("contact");
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth", block: "center" });
                  }
                }}
              />
            </div>
          </div>
          <div
            className="ml-8 rounded-[10px] overflow-hidden relative"
            style={{ width: 1200, height: 550 }}
          >
            <Image
              src="/imgs/clients/computer-lab.jpg"
              alt="Modern computer lab"
              fill
              className="object-cover object-center bg-cover bg-no-repeat bg-center"
              priority
            />
          </div>
        </div>
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
