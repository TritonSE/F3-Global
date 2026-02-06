import Image from "next/image";
import Link from "next/link";
import React from "react";

export type Member = {
  _id: string;
  name: string;
  location: string;
  role: string;
  linkedin: string;
  email: string;
  headshot: string;
};

type MemberCardProps = {
  member: Member;
};

const getLinkedInUsername = (url: string) => {
  try {
    const cleanUrl = url.endsWith("/") ? url.slice(0, -1) : url;
    const parts = cleanUrl.split("/");
    return parts[parts.length - 1];
  } catch {
    return "LinkedIn";
  }
};

export const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
  const linkedInUsername = getLinkedInUsername(member.linkedin);
  return (
    <>
      <div className="flex flex-col flex-start gap-[30px]">
        <div className="relative" style={{ width: 250, height: 250 }}>
          <Image
            src={member.headshot}
            alt="Member headshot image"
            fill
            className="object-cover object-center bg-cover bg-no-repeat bg-center rounded-[250px] "
          />
        </div>
        <div className="flex flex-col items-start gap-[10px] self-stretch">
          <h1 className="font-dm-sans text-[24px] font-bold leading-[150%] tracking-[0.48px] self-stretch text-[#172447]">
            {member.name}
          </h1>
          <p className="font-dm-sans text-[16px] font-normal leading-[24px] self-stretch text-[#172447]">
            {member.role}
          </p>
          <div className="flex flex-col items-start">
            <Link
              href={member.linkedin}
              target="_blank"
              className="flex items-center gap-[11px] group transition-all duration-300"
            >
              <div className="relative w-[20px] h-[20px] text-[#1E1E1E] group-hover:text-[#1169B0] transition-colors duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M13.3337 6.66663C14.6597 6.66663 15.9315 7.19341 16.8692 8.13109C17.8069 9.06877 18.3337 10.3405 18.3337 11.6666V17.5H15.0003V11.6666C15.0003 11.2246 14.8247 10.8007 14.5122 10.4881C14.1996 10.1756 13.7757 9.99996 13.3337 9.99996C12.8916 9.99996 12.4677 10.1756 12.1551 10.4881C11.8426 10.8007 11.667 11.2246 11.667 11.6666V17.5H8.33366V11.6666C8.33366 10.3405 8.86044 9.06877 9.79812 8.13109C10.7358 7.19341 12.0076 6.66663 13.3337 6.66663Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.00033 7.49996H1.66699V17.5H5.00033V7.49996Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3.33366 4.99996C4.25413 4.99996 5.00033 4.25377 5.00033 3.33329C5.00033 2.41282 4.25413 1.66663 3.33366 1.66663C2.41318 1.66663 1.66699 2.41282 1.66699 3.33329C1.66699 4.25377 2.41318 4.99996 3.33366 4.99996Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="font-dm-sans text-[16px] font-normal text-[#1E1E1E] leading-[24px] text-[#1E1E1E] group-hover:text-[#1169B0] transition-colors duration-300">
                {linkedInUsername}
              </p>
            </Link>
            <Link
              href={`mailto:${member.email}`}
              className="flex items-center gap-[11px] group transition-all duration-300"
            >
              <div className="relative w-[20px] h-[20px] text-[#1E1E1E] group-hover:text-[#1169B0] transition-colors duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M18.3337 5.00004C18.3337 4.08337 17.5837 3.33337 16.667 3.33337H3.33366C2.41699 3.33337 1.66699 4.08337 1.66699 5.00004M18.3337 5.00004V15C18.3337 15.9167 17.5837 16.6667 16.667 16.6667H3.33366C2.41699 16.6667 1.66699 15.9167 1.66699 15V5.00004M18.3337 5.00004L10.0003 10.8334L1.66699 5.00004"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="font-dm-sans text-[16px] font-normal text-[#1E1E1E] leading-[24px] text-[#1E1E1E] group-hover:text-[#1169B0] transition-colors duration-300">
                {member.email}
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
