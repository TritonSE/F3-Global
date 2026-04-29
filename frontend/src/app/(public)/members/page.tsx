import Image from "next/image";

import { getFaq } from "@/api/faq";
import { Button } from "@/components/button";
import { ContactUs } from "@/components/ContactUs";
import { FaqAccordion } from "@/components/FaqAccordion";
import EligibileCard from "@/components/members-page/EligibileCard";

const involvementSteps = [
  {
    title: "Complete the Application Form",
    description:
      "Submit a short online application sharing your background, interests, and how you'd like to be involved with F3.",
  },
  {
    title: "Application Review",
    description:
      "Our team reviews applications on a rolling basis to ensure alignment with F3's mission and values.",
  },
  {
    title: "Confirmation & Onboarding",
    description:
      "Accepted members receive a confirmation email with next steps, onboarding resources, and access to the F3 community.",
  },
  {
    title: "Get Involved",
    description:
      "Once onboarded, members can participate in projects, initiatives, and collaborative opportunities within F3.",
  },
];

export default async function Members() {
  const faqItems = await getFaq("members");
  return (
    <>
      <div className="flex flex-col bg-white overflow-x-hidden">
        {/* Hero Section */}
        <div className="flex w-full flex-col items-center gap-[20px] px-[30px] pt-[50px] text-center md:min-h-screen md:flex-row md:items-center md:justify-between md:gap-0 md:self-stretch md:px-[100px] md:pt-0 md:text-left">
          <div className="order-2 flex w-full max-w-[580px] flex-col items-center gap-[20px] md:order-1 md:w-[639px] md:max-w-none md:items-start md:gap-[50px]">
            <h1 className="mt-[20px] font-ethic text-4xl leading-tight font-light text-[#172447] md:mt-0 md:text-[64px] md:leading-[1.1]">
              Become <span className="italic">Part</span> of Our <br /> Team Today!
            </h1>
            <p className="max-w-[279px] font-dm-sans text-[14px] leading-[20px] font-normal text-[#5D5D5D] md:w-[80%] md:max-w-none md:text-[20px] md:leading-[32px]">
              Join F3 Global as a volunteer and make a meaningful impact in underserved communities
              worldwide.
            </p>
            <div className="pb-[50px] md:pb-0">
              <Button
                text="APPLY NOW"
                onClick_link="https://my-apply.vercel.app/org/f3-global-foundation"
                className="flex cursor-pointer items-center justify-center gap-2.5 rounded-full bg-[#172447] px-[15px] py-[10px] transition-colors duration-450 ease-in-out hover:bg-[#1169B0] md:px-5 md:py-[15px]"
                textClassName="text-center font-dm-sans text-[12px] font-semibold leading-[20px] text-white md:text-base md:leading-6"
              />
            </div>
          </div>
          <div className="order-1 relative aspect-[646/581] w-full overflow-hidden rounded-[10px] md:order-2 md:h-[581px] md:w-[646px] md:flex-shrink-0">
            <Image
              src="/imgs/members_hero.png"
              alt="Volunteers Working with Children"
              fill
              sizes="646px"
              className="object-cover object-center"
              priority
            />
          </div>
        </div>
        {/* Mission Epic */}
        <div className="relative flex w-full flex-col items-center gap-[50px] overflow-hidden border-t border-[#F4F4F4] px-[30px] pt-[50px] pb-[0px] md:flex-row md:content-end md:px-[100px] md:py-[50px]">
          <div className="relative order-2 flex h-[330px] w-full flex-col md:static md:order-1 md:h-auto md:min-h-[700px] md:flex-4">
            <div className="absolute left-[75px] top-[0px] z-10 h-[82px] w-[123px] flex-shrink-0 flex-grow-0 overflow-hidden rounded-[16px] md:left-[80px] md:top-[40px] md:ml-8 md:h-[193px] md:w-[291px]">
              <Image
                src="/imgs/members_mission_1.webp"
                alt="People Walking at Sunset"
                fill
                className="object-cover object-center"
                priority
              />
            </div>
            <div className="absolute left-[0px] top-[45px] z-0 h-[207px] w-[270px] flex-shrink-0 flex-grow-0 overflow-hidden rounded-[16px] bg-[#172447] md:top-[145px] md:h-[491px] md:w-[643px]">
              <Image
                src="/imgs/members_mission_4.jpg"
                alt="People Walking at Sunset"
                fill
                className="object-cover object-center"
                priority
              />
              <div className="absolute inset-0 rounded-[16px] bg-[#172447] opacity-100 mix-blend-color pointer-events-none" />
            </div>
            <div className="absolute left-[220px] top-[65px] z-20 m-0 h-[151px] w-[120px] flex-shrink-0 flex-grow-0 overflow-hidden rounded-[16px] p-0 md:left-[500px] md:right-auto md:top-[200px] md:h-[358px] md:w-[285px]">
              <Image
                src="/imgs/members_mission_2.jpg"
                alt="People Walking at Sunset"
                fill
                className="object-cover object-center"
                priority
              />
            </div>
            <div className="absolute bottom-0 left-[165px] top-[195px] z-10 m-0 h-[73px] w-[81px] overflow-hidden rounded-[16px] p-0 md:bottom-auto md:left-[360px] md:top-[530px] md:h-[173px] md:w-[192px]">
              <Image
                src="/imgs/members_mission_3.jpg"
                alt="People Walking at Sunset"
                fill
                className="object-cover object-center"
                priority
              />
            </div>
          </div>
          <div className="order-1 flex flex-col items-start gap-[20px] md:order-2 md:flex-3">
            <h2 className="font-dm-sans text-[28px] leading-[150%] font-medium tracking-[-0.56px] text-[#172447] md:text-[48px] md:font-normal md:tracking-[-0.96px]">
              Our Mission
            </h2>
            <p className="max-w-[575px] font-dm-sans text-[12px] leading-[16px] font-normal text-[#1E1E1E] md:text-[20px] md:leading-[1.6]">
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
        <div className="flex w-full flex-col gap-[30px] overflow-hidden border-t border-[#F4F4F4] py-[50px] md:gap-[100px]">
          {/* Section title*/}
          <div className="flex flex-col items-start gap-[20px] px-[30px] text-left md:px-[100px]">
            <h2 className="self-stretch font-dm-sans text-[28px] leading-[120%] font-medium tracking-[-0.56px] text-[#172447] md:text-[48px] md:leading-normal md:tracking-[-0.96px]">
              Who We're Looking For
            </h2>
            <p className="w-full font-dm-sans text-[12px] leading-[16px] font-normal text-[#1e1e1e] md:text-[16px] md:leading-[24px]">
              F3 membership is open to individuals who are passionate about entrepreneurship,
              innovation, and community impact, including:
            </p>
          </div>
          {/* Eligibility Criteria */}
          <div className="grid w-full grid-cols-2 justify-center gap-x-[30px] gap-y-[18px] px-[30px] md:inline-flex md:w-auto md:flex-row md:gap-[24px] md:px-0">
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
              mobileTitle="Young professionals"
              description="interested in mentorship, collaboration, and giving back"
            />
          </div>
        </div>
        {/* How You Get Involved Section*/}
        <div className="flex w-full flex-col gap-[30px] self-stretch overflow-hidden border-t border-[#F4F4F4] px-[30px] py-[50px] text-left md:gap-[100px] md:px-[100px]">
          <h2 className="self-stretch font-dm-sans text-[28px] leading-[150%] font-medium tracking-[-0.56px] text-[#172447] md:text-[48px] md:tracking-[-0.96px]">
            How You Get Involved
          </h2>
          <div className="grid grid-cols-[40px_minmax(0,1fr)] gap-x-[35px] pl-[30px] md:hidden">
            {involvementSteps.map((step, index) => (
              <div key={step.title} className="contents">
                <div className="flex flex-col items-center">
                  <div className="z-10 flex h-[40px] w-[40px] shrink-0 aspect-square items-center justify-center rounded-full border-[3px] border-[#172447] bg-white font-dm-sans text-[20px] leading-none font-semibold text-[#172447]">
                    {index + 1}
                  </div>
                  {index < involvementSteps.length - 1 ? (
                    <div className="flex flex-col items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="63"
                        height="121"
                        viewBox="0 0 63 121"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path d="M31.5 0L31.5 105" stroke="#A5D0F2" strokeWidth="4" />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M16.5188 93.3938C17.544 92.3687 19.206 92.3687 20.2312 93.3938L31.5 104.663L42.7688 93.3938C43.794 92.3687 45.456 92.3687 46.4812 93.3938C47.5063 94.419 47.5063 96.081 46.4812 97.1062L33.3562 110.231C32.331 111.256 30.669 111.256 29.6438 110.231L16.5188 97.1062C15.4937 96.081 15.4937 94.419 16.5188 93.3938Z"
                          fill="#A5D0F2"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M16.5188 103.394C17.544 102.369 19.206 102.369 20.2312 103.394L31.5 114.663L42.7688 103.394C43.794 102.369 45.456 102.369 46.4812 103.394C47.5063 104.419 47.5063 106.081 46.4812 107.106L33.3562 120.231C32.331 121.256 30.669 121.256 29.6438 120.231L16.5188 107.106C15.4937 106.081 15.4937 104.419 16.5188 103.394Z"
                          fill="#A5D0F2"
                        />
                      </svg>
                    </div>
                  ) : null}
                </div>
                <div
                  className={`mr-[30px] flex flex-col items-start gap-[8px] md:mr-0 ${
                    index < involvementSteps.length - 1 ? "pb-[30px]" : "pb-0"
                  }`}
                >
                  <h3 className="font-dm-sans text-[18px] leading-[120%] font-medium tracking-[-0.36px] text-[#012060]">
                    {step.title}
                  </h3>
                  <p className="font-dm-sans text-[12px] leading-[16px] font-normal text-[#5D5D5D]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="relative hidden flex-col items-center justify-center gap-[80px] px-[80px] md:flex">
            {/* Application flowchart */}
            <div className="flex flex-row items-center gap-[273px] max-w-[1181px] mx-auto w-full">
              {/* Number icons */}
              <div className="w-[60px] z-10">
                <div className="flex size-[60px] bg-[#FFFFFF] border-[#172447] border-4 font-dm-sans text-[30px] font-semibold leading-none text-[#172447] items-center justify-center rounded-full">
                  1
                </div>
              </div>
              <div className="w-[60px] z-10">
                <div className="flex size-[60px] bg-[#FFFFFF] border-[#172447] border-4 font-dm-sans text-[30px] font-semibold leading-none text-[#172447] items-center justify-center rounded-full">
                  2
                </div>
              </div>
              <div className="w-[60px] z-10">
                <div className="flex size-[60px] bg-[#FFFFFF] border-[#172447] border-4 font-dm-sans text-[30px] font-semibold leading-none text-[#172447] items-center justify-center rounded-full">
                  3
                </div>
              </div>
              <div className="w-[60px] z-10">
                <div className="flex size-[60px] bg-[#FFFFFF] border-[#172447] border-4 font-dm-sans text-[30px] font-semibold leading-none text-[#172447] items-center justify-center rounded-full">
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
