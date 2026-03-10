import Image from "next/image";

import { getFaq } from "@/api/faq";
import { Button } from "@/components/button";
import { ContactUs } from "@/components/ContactUs";
import { FaqAccordion } from "@/components/FaqAccordion";
import EligibileCard from "@/components/members-page/EligibileCard";

export default async function Members() {
  const faqItems = await getFaq("members");
  return (
    <>
      <div className="bg-white overflow-x-hidden">
        {/* Hero Section */}
        <div className="flex w-full items-center justify-between self-stretch px-[100px] h-[774px]">
          <div className="flex flex-col">
            <h1 className="text-[#172447] text-[64px] font-ethic font-light leading-[1.1]">
              Become <span className="italic">Part</span> of Our
            </h1>
            <h1 className="text-[#172447] text-[64px] font-ethic font-light leading-[1.1]">
              Team Today!
            </h1>
            <p className="font-dm-sans mt-5 text-[20px] font-normal leading-[32px] text-[#5D5D5D] w-[100%]">
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
            className="rounded-[10px] overflow-hidden relative flex-shrink-0 flex-grow-0"
            style={{ width: 646, height: 581 }}
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
        {/* Mission Epic */}
        <div
          className="flex flex-row w-full px-[50px] py-[200px] content-end items-center gap-[50px] border-t border-[#F4F4F4] relative overflow-hidden"
          //style={{
          //  boxShadow: "0 19px 43px 0 rgba(0, 0, 0, 0.10)",
          //}}
        >
          <div className="flex flex-col flex-4">
            <div
              className="ml-8 rounded-[16px] overflow-hidden absolute left-[80px] top-[40px] z-1 flex-shrink-0 flex-grow-0"
              style={{ width: 291, height: 193 }}
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
              className="rounded-[16px] overflow-hidden absolute left-[-8px] top-[145px] z-0 flex-shrink-0 flex-grow-0"
              style={{ width: 643, height: 491, background: "#172447" }}
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
              className="rounded-[16px] overflow-hidden absolute left-[500px] top-[200px] z-2 p-0 m-0 flex-shrink-0 flex-grow-0"
              style={{ width: 285, height: 358 }}
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
              style={{ width: 192, height: 173 }}
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
            <p className="text-[#1E1E1E] font-dm-sans text-[20px] font-normal leading-[32px] mr-2">
              F3 Global{" "}
              <span className="text-[#012060] font-bold">
                supports underserved individuals and small businesses
              </span>{" "}
              by providing microfinance solutions to help launch or expand their ventures. By
              combining accessible financing with business advisory services, F3 Global aims to
              promote economic empowerment and foster entrepreneurship. Its mission is to{" "}
              <span className="text-[#012060] font-bold">create meaningful, long-term impact </span>{" "}
              in communities through innovative support and development initiatives.
            </p>
          </div>
        </div>
        {/* Who We're Looking For Section*/}
        <div className="flex flex-col w-full py-[50px] gap-[100px] border-t border-[#F4F4F4]  overflow-hidden">
          {/* Section title*/}
          <div className="flex flex-col gap-[20px] items-start px-[5vw]">
            <h1 className="text-[48px] font-medium self-stretch text-[#172447] tracking-[-0.96px]">
              Who We're Looking For
            </h1>
            <p className="font-dm-sans font-normal leading-[24px] text-[16px] text-[#1e1e1e] w-full">
              F3 membership is open to individuals who are passionate about entrepreneurship,
              innovation, and community impact, including:
            </p>
          </div>
          {/* Eligibility Criteria */}
          <div className="inline-flex flex-row gap-[24px] justify-center">
            <EligibileCard
              iconSrc="/imgs/ic_book.svg"
              iconAlt="Book Icon"
              title="Undergraduate students"
              description="from all academic backgrounds"
            />
            <EligibileCard
              iconSrc="/imgs/ic_graduate_cap.svg"
              iconAlt="Graduate Cap Icon"
              title="Graduate students"
              description="seeking hands-on, real-world experience"
            />
            <EligibileCard
              iconSrc="/imgs/ic_mentoring.svg"
              iconAlt="Mentoring Icon"
              title="Interns"
              description="looking to build skills and contribute to meaningful projects"
            />
            <EligibileCard
              iconSrc="/imgs/ic_briefcase.svg"
              iconAlt="Briefcase Icon"
              title="Young and working professionals"
              description="interested in mentorship, collaboration, and giving back"
            />
          </div>
        </div>
        {/* How You Get Involved Section*/}
        <div className="flex w-full overflow-hidden self-stretch flex-col gap-[100px] border-t border-[#F4F4F4] px-[100px] py-[50px] ">
          <h1 className="text-[48px] font-medium self-stretch text-[#172447] leading-[1.5] tracking-[-0.96px]">
            How You Get Involved
          </h1>
          <div className="flex flex-col relative px-[80px] justify-center items-center gap-[80px]">
            {/* Application flowchart */}
            <div className="flex flex-row items-center gap-[273px] max-w-[1181px] mx-auto w-full ">
              {/* Number icons */}
              <div className="w-[60px] z-10">
                <div className="flex size-[60px] bg-[#FFFFFF] border-[#172447] border-4 text-dm-sans text-[30px] font-semibold leading-none text-[#172447] items-center justify-center rounded-full">
                  1
                </div>
              </div>
              <div className="w-[60px] z-10">
                <div className="flex size-[60px] bg-[#FFFFFF] border-[#172447] border-4 text-dm-sans text-[30px] font-semibold leading-none text-[#172447] items-center justify-center rounded-full">
                  2
                </div>
              </div>
              <div className="w-[60px] z-10">
                <div className="flex size-[60px] bg-[#FFFFFF] border-[#172447] border-4 text-dm-sans text-[30px] font-semibold leading-none text-[#172447] items-center justify-center rounded-full">
                  3
                </div>
              </div>
              <div className="w-[60px] z-10">
                <div className="flex size-[60px] bg-[#FFFFFF] border-[#172447] border-4 text-dm-sans text-[30px] font-semibold leading-none text-[#172447] items-center justify-center rounded-full">
                  4
                </div>
              </div>
              {/* Process arrows */}
              <div className="absolute h-[68px] translate-y-[63px] z-0 -translate-x-[928px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1212"
                  height="105"
                  viewBox="0 0 1212 105"
                  preserveAspectRatio="xMaxYMid meet"
                  fill="none"
                >
                  <path
                    d="M0 42H950C955.523 42 960 37.5228 960 32V-50"
                    stroke="#A5D0F2"
                    strokeWidth="4"
                  />
                </svg>
              </div>
              <div className="absolute h-[68px] translate-y-[-50px] translate-x-[30px] z-0">
                <Image
                  src="/imgs/involved_arrow_down.svg"
                  alt="Downward Arrow"
                  width={365}
                  height={68}
                />
              </div>
              <div className="absolute h-[68px] translate-y-[50px] translate-x-[363px] z-0 scale-y-[-1]">
                <Image
                  src="/imgs/involved_arrow_down.svg"
                  alt="Downward Arrow"
                  width={364}
                  height={68}
                />
              </div>
              <div className="absolute h-[68px] translate-y-[-50px] translate-x-[696px] z-0">
                <Image
                  src="/imgs/involved_arrow_down.svg"
                  alt="Downward Arrow"
                  width={364}
                  height={68}
                />
              </div>
              <div className="absolute h-[68px] translate-y-[63px] z-0 scale-x-[-1] translate-x-[777px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1212"
                  height="105"
                  viewBox="0 0 1212 105"
                  preserveAspectRatio="xMaxYMid meet"
                  fill="none"
                >
                  <path
                    d="M0 42H950C955.523 42 960 37.5228 960 32V-50"
                    stroke="#A5D0F2"
                    strokeWidth="4"
                  />
                </svg>
              </div>
            </div>

            {/* Application text */}
            <div className="flex max-w-[1181px] mx-auto items-start gap-[90px]">
              <div className="flex w-[243px] flex-col items-start gap-[20px]">
                <h3 className="text-[28px] font-medium leading-[1.5] tracking-[-0.56px] text-[#012060]">
                  Complete the Application Form
                </h3>
                <p className="text-[16px] font-normal leading-[1.5] text-[#5D5D5D]">
                  Submit a short online application sharing your background, interests, and how
                  you'd like to be involved with F3.
                </p>
              </div>

              <div className="flex w-[243px] flex-col items-start gap-[20px]">
                <h3 className="text-[28px] font-medium leading-[1.5] tracking-[-0.56px] text-[#012060] w-[224px]">
                  Application Review
                </h3>
                <p className="text-[16px] font-normal leading-[1.5] text-[#5D5D5D]">
                  Our team reviews applications on a rolling basis to ensure alignment with
                  F3&apos;s mission and values.
                </p>
              </div>

              <div className="flex w-[243px] flex-col items-start gap-[20px]">
                <h3 className="text-[28px] font-medium leading-[1.5] tracking-[-0.56px] text-[#012060]">
                  Confirmation &amp; Onboarding
                </h3>
                <p className="text-[16px] font-normal leading-[1.5] text-[#5D5D5D]">
                  Accepted members receive a confirmation email with next steps, onboarding
                  resources, and access to the F3 community.
                </p>
              </div>

              <div className="flex w-[182px] flex-col items-start gap-[20px]">
                <h3 className="text-[28px] font-medium leading-[1.5] tracking-[-0.56px] text-[#012060]">
                  Get Involved
                </h3>
                <p className="text-[16px] font-normal leading-[1.5] text-[#5D5D5D]">
                  Once onboarded, members can participate in projects, initiatives, and
                  collaborative opportunities within F3.
                </p>
              </div>
            </div>
          </div>
        </div>
        <FaqAccordion items={faqItems} />
        <ContactUs />
      </div>
    </>
  );
}
