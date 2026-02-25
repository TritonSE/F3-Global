"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

import { getClientHighlights, type HighlightItem } from "@/api/clientHighlights";
import { Button } from "@/components/button";
import ClientStoryOverall from "@/components/clients-page/ClientsStoryOverall";
import { ContactUs } from "@/components/ContactUs";
import { FaqAccordion } from "@/components/FaqAccordion";

export default function About() {
  const [primaryHighlight, setPrimaryHighlight] = useState<HighlightItem | null>(null);

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

    void fetchPrimary();
  }, []);

  return (
    <>
      <div className="bg-white overflow-x-hidden">
        <div className="flex w-full items-center justify-between self-stretch px-[100px] h-180">
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
        <FaqAccordion
          items={[
            {
              question: "Lorem ipsum dolor sit amet, consectetur?",
              answer:
                "We take this responsibility seriously because we know you've worked hard for your money and deserve to see real impact. Your donation follows a transparent path: it enters our microloan fund, gets matched with vetted entrepreneurs through our local partner organizations, and is disbursed via secure banking or mobile payment systems that create clear documentation. We provide regular updates showing the specific entrepreneurs your contribution helped, complete with photos, business details, and progress reports. Our **% repayment rate is strong evidence that real people received real capital and built sustainable businesses-you can't repay a loan you never received. Additionally, our financial statements undergo annual independent audits, **% of every dollar goes directly to loans (as verified by third-party review), and we welcome questions anytime you want more details about your donation's impact. We're not perfect, but we're committed to earning and keeping your trust through transparency at every step.",
            },
            {
              question: "Lorem ipsum dolor sit amet, consectetur?",
              answer:
                "We take this responsibility seriously because we know you've worked hard for your money and deserve to see real impact. Your donation follows a transparent path: it enters our microloan fund, gets matched with vetted entrepreneurs through our local partner organizations, and is disbursed via secure banking or mobile payment systems that create clear documentation. We provide regular updates showing the specific entrepreneurs your contribution helped, complete with photos, business details, and progress reports. Our **% repayment rate is strong evidence that real people received real capital and built sustainable businesses-you can't repay a loan you never received. Additionally, our financial statements undergo annual independent audits, **% of every dollar goes directly to loans (as verified by third-party review), and we welcome questions anytime you want more details about your donation's impact. We're not perfect, but we're committed to earning and keeping your trust through transparency at every step.",
            },
            {
              question: "Lorem ipsum dolor sit amet, consectetur?",
              answer:
                "We take this responsibility seriously because we know you've worked hard for your money and deserve to see real impact. Your donation follows a transparent path: it enters our microloan fund, gets matched with vetted entrepreneurs through our local partner organizations, and is disbursed via secure banking or mobile payment systems that create clear documentation. We provide regular updates showing the specific entrepreneurs your contribution helped, complete with photos, business details, and progress reports. Our **% repayment rate is strong evidence that real people received real capital and built sustainable businesses-you can't repay a loan you never received. Additionally, our financial statements undergo annual independent audits, **% of every dollar goes directly to loans (as verified by third-party review), and we welcome questions anytime you want more details about your donation's impact. We're not perfect, but we're committed to earning and keeping your trust through transparency at every step.",
            },
            {
              question: "Lorem ipsum dolor sit amet, consectetur?",
              answer:
                "We take this responsibility seriously because we know you've worked hard for your money and deserve to see real impact. Your donation follows a transparent path: it enters our microloan fund, gets matched with vetted entrepreneurs through our local partner organizations, and is disbursed via secure banking or mobile payment systems that create clear documentation. We provide regular updates showing the specific entrepreneurs your contribution helped, complete with photos, business details, and progress reports. Our **% repayment rate is strong evidence that real people received real capital and built sustainable businesses-you can't repay a loan you never received. Additionally, our financial statements undergo annual independent audits, **% of every dollar goes directly to loans (as verified by third-party review), and we welcome questions anytime you want more details about your donation's impact. We're not perfect, but we're committed to earning and keeping your trust through transparency at every step.",
            },
            {
              question: "Lorem ipsum dolor sit amet, consectetur?",
              answer:
                "We take this responsibility seriously because we know you've worked hard for your money and deserve to see real impact. Your donation follows a transparent path: it enters our microloan fund, gets matched with vetted entrepreneurs through our local partner organizations, and is disbursed via secure banking or mobile payment systems that create clear documentation. We provide regular updates showing the specific entrepreneurs your contribution helped, complete with photos, business details, and progress reports. Our **% repayment rate is strong evidence that real people received real capital and built sustainable businesses-you can't repay a loan you never received. Additionally, our financial statements undergo annual independent audits, **% of every dollar goes directly to loans (as verified by third-party review), and we welcome questions anytime you want more details about your donation's impact. We're not perfect, but we're committed to earning and keeping your trust through transparency at every step.",
            },
          ]}
        />
        <div id="contact">
          <ContactUs />
        </div>
      </div>
    </>
  );
}
