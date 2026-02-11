"use client";

import Image from "next/image";
import React from "react";

import { Button } from "@/components/button";
import ClientStoryOverall from "@/components/clients-page/ClientsStoryOverall";
import { ContactUs } from "@/components/ContactUs";
import { FaqAccordion } from "@/components/FaqAccordion";

export default function About() {
  return (
    <>
      <div className="bg-white overflow-x-hidden">
        <div className="flex w-full items-center justify-between self-stretch px-[100px] h-180">
          <div className="flex flex-col">
            <h1 className="text-[#1E1E1E] text-[64px] font-ethic font-light leading-[1.1]">
              Services That Create
            </h1>
            <h1 className="text-[#1E1E1E] text-[64px] font-ethic font-light leading-[1.1]">
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
        <ClientStoryOverall
          image="/imgs/clients/rule_breaker.png"
          title="Rule Breaker Snacks"
          description={
            " is challenging what normal desserts are considered with soft-baked treats that include chickpeas first and taste like the brownies and blondies many grew up enjoying, minus the ingredients many people avoid. Every bite is certified gluten-free, vegan, and made without nuts, dairy, eggs, or soy, making them a school-safe option for families and anyone with dietary needs. Their product catalog contains full-size Brownies and Blondies, snackable Bites, and kid-friendly junior bites, plus seasonal flavors that keep the brand fresh and dynamic...."
          }
          expandedDescription={[
            {
              paragraph: 0,
              text: "Rule Breaker Snacks",
            },
            {
              paragraph: 1,
              text: " is challenging what normal desserts are considered with soft-baked treats that include chickpeas first and taste like the brownies and blondies many grew up enjoying, minus the ingredients many people avoid. Every bite is certified gluten-free, vegan, and made without nuts, dairy, eggs, or soy, making them a school-safe option for families and anyone with dietary needs. Their product catalog contains full-size Brownies and Blondies, snackable Bites, and kid-friendly junior bites, plus seasonal flavors that keep the brand fresh and dynamic....",
            },
            {
              paragraph: 2,
              text: (
                <>
                  {
                    "Behind the scenes, Rule Breaker is operated passionately on the foundation that "
                  }
                  <strong>there is a desert snack for everyone</strong>
                  {
                    ", while the brand keeps strong creative control over recipes and quality. You’ll find them online and in thousands of grocery doors nationwide, giving proof that better-for-you can also be great in taste. "
                  }
                </>
              ),
            },
            {
              paragraph: 3,
              text: "We’re proud to feature Rule Breaker Snacks for their simple ingredient decks, inclusive approach to snacking, and a product experience that strives for great taste, because the best rule to break is the one that says you have to choose between better and delicious.",
            },
          ]}
        />
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
