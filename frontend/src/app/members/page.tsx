import Image from "next/image";

import { Button } from "@/components/button";
import { FaqSection } from "@/components/FaqAccordion";

export default function Members() {
  return (
    <>
      <div className="bg-white overflow-x-hidden">
        <div className="flex w-full items-center justify-between self-stretch px-[100px] h-[774px]">
          <div className="flex flex-col">
            <h1 className="text-[#172447] text-[64px] font-ethic font-light leading-[1.1]">
              Become <span className="italic">Part</span> of Our
            </h1>
            <h1 className="text-[#172447] text-[64px] font-ethic font-light leading-[1.1]">
              Team Today!
            </h1>
            <p className="font-dm-sans mt-5 text-[24px] font-normal leading-[32px] text-[#5D5D5D] w-[70%]">
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
        <div
          className="flex flex-row w-full px-[50px] py-[200px] content-end items-center gap-[50px] border-t border-[#F4F4F4] relative"
          style={{
            boxShadow: "0 19px 43px 0 rgba(0, 0, 0, 0.10)",
          }}
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
            <p className="text-[#1E1E1E] font-dm-sans text-[24px] font-normal leading-[32px] mr-2">
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
      </div>
      <div className="flex flex-col w-full py-[50px] gap-[10px] border-t border-[#F4F4F4]">
        <h1 className="text-[48px] px-[5vw] font-medium self-stretch text-[#172447]">
          Who We're Looking For
        </h1>
        <div className="inline-flex flex-row gap-[50px] justify-center">
          <div className="flex flex-col w-[333px] h-max items-center">
            <div className="flex w-[120px] h-[120px] items-center justify-center rounded-[60px] bg-[#012060] relative z-10 -mb-[50px]">
              <Image src="/imgs/ic_goal.svg" alt="Goal Icon" width={60} height={60} />
            </div>
            <div className="flex flex-col w-[333px] h-[278px] pt-[60px] pb-[20px] px-[50px] items-center justify-center gap-[20px] rounded-[10px] bg-[#F4F4F4]">
              <h2 className=" self-center text-center self-stretch text-[#s1E1E1E] font-dm-sans text-[32px] font-bold leading-[150%] tracking-[-0.46px]">
                Commitment to the Mission
              </h2>
              <p className="text-center">
                Demonstrated interest in and alignment with F3's values and goals.
              </p>
            </div>
          </div>
          <div className="flex flex-col w-[333px] h-max items-center">
            <div className="flex w-[120px] h-[120px] items-center justify-center rounded-[60px] bg-[#012060] relative z-10 -mb-[50px]">
              <Image src="/imgs/ic_time.svg" alt="Goal Icon" width={60} height={60} />
            </div>
            <div className="flex flex-col w-[333px] h-[278px] pt-[60px] pb-[20px] px-[50px] items-center justify-center gap-[20px] rounded-[10px] bg-[#F4F4F4]">
              <h2 className=" self-center text-center self-stretch text-[#s1E1E1E] font-dm-sans text-[32px] font-bold leading-[150%] tracking-[-0.46px]">
                Availability & Reliability
              </h2>
              <p className="text-center">
                Ability to commit the required time and participate consistently.
              </p>
            </div>
          </div>
          <div className="flex flex-col w-[333px] h-max items-center">
            <div className="flex w-[120px] h-[120px] items-center justify-center rounded-[60px] bg-[#012060] relative z-10 -mb-[50px]">
              <Image src="/imgs/ic_collab.svg" alt="Goal Icon" width={60} height={60} />
            </div>
            <div className="flex flex-col w-[333px] h-[278px] pt-[60px] pb-[20px] px-[50px] items-center justify-center gap-[20px] rounded-[10px] bg-[#F4F4F4]">
              <h2 className=" self-center text-center self-stretch text-[#s1E1E1E] font-dm-sans text-[32px] font-bold leading-[150%] tracking-[-0.46px]">
                Respectful Collaboration
              </h2>
              <p className="text-center">
                Willingness to work respectfully with diverse communities and members.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full py-[50px] gap-[10px] border-t border-[#F4F4F4]">
        <h1 className="px-[5vw] text-[48px] font-medium self-stretch text-[#172447] mb-[60px]">
          How You Get Involved
        </h1>
        <div className="flex flex-col relative">
          <div className="relative h-[108px] mb-[-40px] max-w-[1097px] mx-auto w-full">
            <div className="absolute left-[86.5px] top-0 w-[264px] h-[108px] text-[#A5D0F2]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="264"
                height="110"
                viewBox="0 0 264 110"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 109.978V12C2 6.4687 6.49041 1.98803 12.0217 2.00005L222.022 2.45651C227.536 2.46849 232 6.94212 232 12.4565V43.4783"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <g transform="translate(200.5 2.5)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16.5188 24.3938C17.544 23.3687 19.206 23.3687 20.2312 24.3938L31.5 35.6627L42.7688 24.3938C43.794 23.3687 45.456 23.3687 46.4812 24.3938C47.5063 25.419 47.5063 27.081 46.4812 28.1062L33.3562 41.2312C32.331 42.2563 30.669 42.2563 29.6438 41.2312L16.5188 28.1062C15.4937 27.081 15.4937 25.419 16.5188 24.3938Z"
                    fill="currentColor"
                  />
                </g>
                <g transform="translate(200.5 14.5)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16.5188 24.3938C17.544 23.3687 19.206 23.3687 20.2312 24.3938L31.5 35.6627L42.7688 24.3938C43.794 23.3687 45.456 23.3687 46.4812 24.3938C47.5063 25.419 47.5063 27.081 46.4812 28.1062L33.3562 41.2312C32.331 42.2563 30.669 42.2563 29.6438 41.2312L16.5188 28.1062C15.4937 27.081 15.4937 25.419 16.5188 24.3938Z"
                    fill="currentColor"
                  />
                </g>
              </svg>
            </div>
            <div className="absolute left-[546.5px] top-0 w-[264px] h-[108px] text-[#A5D0F2]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="264"
                height="110"
                viewBox="0 0 264 110"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 109.978V12C2 6.4687 6.49041 1.98803 12.0217 2.00005L222.022 2.45651C227.536 2.46849 232 6.94212 232 12.4565V43.4783"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <g transform="translate(200.5 2.5)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16.5188 24.3938C17.544 23.3687 19.206 23.3687 20.2312 24.3938L31.5 35.6627L42.7688 24.3938C43.794 23.3687 45.456 23.3687 46.4812 24.3938C47.5063 25.419 47.5063 27.081 46.4812 28.1062L33.3562 41.2312C32.331 42.2563 30.669 42.2563 29.6438 41.2312L16.5188 28.1062C15.4937 27.081 15.4937 25.419 16.5188 24.3938Z"
                    fill="currentColor"
                  />
                </g>
                <g transform="translate(200.5 14.5)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16.5188 24.3938C17.544 23.3687 19.206 23.3687 20.2312 24.3938L31.5 35.6627L42.7688 24.3938C43.794 23.3687 45.456 23.3687 46.4812 24.3938C47.5063 25.419 47.5063 27.081 46.4812 28.1062L33.3562 41.2312C32.331 42.2563 30.669 42.2563 29.6438 41.2312L16.5188 28.1062C15.4937 27.081 15.4937 25.419 16.5188 24.3938Z"
                    fill="currentColor"
                  />
                </g>
              </svg>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between max-w-[1097px] mx-auto w-full relative z-10">
            <div
              className="absolute top-1/2 right-full -translate-y-1/2 h-[4px] w-[max(0px,calc((100vw-1097px)/2))] bg-[#A5D0F2]"
              aria-hidden="true"
            />
            <div
              className="absolute top-1/2 left-full -translate-y-1/2 h-[4px] w-[max(0px,calc((100vw-1097px)/2))] bg-[#A5D0F2]"
              aria-hidden="true"
            />
            <div className="flex w-[177px] h-[76px] bg-[#172447] text-dm-sans text-[24px] font-semibold leading-[150%] text-white items-center justify-center rounded-[10px]">
              Apply
            </div>
            <div className="flex w-[177px] h-[76px] bg-[#FFFFFF] text-dm-sans text-[24px] font-semibold leading-[150%] text-[#172447] border-[#172447] border-4 items-center justify-center rounded-[10px]">
              Review
            </div>
            <div className="flex w-[177px] h-[76px] bg-[#172447] text-dm-sans text-[24px] font-semibold leading-[150%] text-white items-center justify-center rounded-[10px]">
              Interview
            </div>
            <div className="flex w-[177px] h-[76px] bg-[#FFFFFF] text-dm-sans text-[24px] font-semibold leading-[150%] text-[#172447] border-[#172447] border-4 items-center justify-center rounded-[10px]">
              Decision
            </div>
            <div className="flex w-[177px] h-[76px] bg-[#172447] text-dm-sans text-[24px] font-semibold leading-[150%] text-white items-center justify-center rounded-[10px]">
              Onboarding
            </div>
          </div>
          <div className="relative h-[108px] max-w-[1097px] mx-auto w-full mt-[-40px]">
            <div className="absolute left-[316.5px] top-0 w-[264px] h-[108px] text-[#A5D0F2]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="264"
                height="110"
                viewBox="0 0 264 110"
                fill="none"
                aria-hidden="true"
              >
                <g transform="translate(0, 110) scale(1, -1)">
                  <path
                    d="M2 109.978V12C2 6.4687 6.49041 1.98803 12.0217 2.00005L222.022 2.45651C227.536 2.46849 232 6.94212 232 12.4565V43.4783"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <g transform="translate(200.5 2.5)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.5188 24.3938C17.544 23.3687 19.206 23.3687 20.2312 24.3938L31.5 35.6627L42.7688 24.3938C43.794 23.3687 45.456 23.3687 46.4812 24.3938C47.5063 25.419 47.5063 27.081 46.4812 28.1062L33.3562 41.2312C32.331 42.2563 30.669 42.2563 29.6438 41.2312L16.5188 28.1062C15.4937 27.081 15.4937 25.419 16.5188 24.3938Z"
                      fill="currentColor"
                    />
                  </g>
                  <g transform="translate(200.5 14.5)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.5188 24.3938C17.544 23.3687 19.206 23.3687 20.2312 24.3938L31.5 35.6627L42.7688 24.3938C43.794 23.3687 45.456 23.3687 46.4812 24.3938C47.5063 25.419 47.5063 27.081 46.4812 28.1062L33.3562 41.2312C32.331 42.2563 30.669 42.2563 29.6438 41.2312L16.5188 28.1062C15.4937 27.081 15.4937 25.419 16.5188 24.3938Z"
                      fill="currentColor"
                    />
                  </g>
                </g>
              </svg>
            </div>

            <div className="absolute left-[776.5px] top-0 w-[264px] h-[108px] text-[#A5D0F2]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="264"
                height="110"
                viewBox="0 0 264 110"
                fill="none"
                aria-hidden="true"
              >
                <g transform="translate(0, 110) scale(1, -1)">
                  <path
                    d="M2 109.978V12C2 6.4687 6.49041 1.98803 12.0217 2.00005L222.022 2.45651C227.536 2.46849 232 6.94212 232 12.4565V43.4783"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <g transform="translate(200.5 2.5)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.5188 24.3938C17.544 23.3687 19.206 23.3687 20.2312 24.3938L31.5 35.6627L42.7688 24.3938C43.794 23.3687 45.456 23.3687 46.4812 24.3938C47.5063 25.419 47.5063 27.081 46.4812 28.1062L33.3562 41.2312C32.331 42.2563 30.669 42.2563 29.6438 41.2312L16.5188 28.1062C15.4937 27.081 15.4937 25.419 16.5188 24.3938Z"
                      fill="currentColor"
                    />
                  </g>
                  <g transform="translate(200.5 14.5)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.5188 24.3938C17.544 23.3687 19.206 23.3687 20.2312 24.3938L31.5 35.6627L42.7688 24.3938C43.794 23.3687 45.456 23.3687 46.4812 24.3938C47.5063 25.419 47.5063 27.081 46.4812 28.1062L33.3562 41.2312C32.331 42.2563 30.669 42.2563 29.6438 41.2312L16.5188 28.1062C15.4937 27.081 15.4937 25.419 16.5188 24.3938Z"
                      fill="currentColor"
                    />
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <FaqSection page="members" />
    </>
  );
}
