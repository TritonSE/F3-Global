"use client";

import Image from "next/image";

import type { Newsletter } from "@/api/newsletters";

const formatDate = (iso: string): string => {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "2-digit" });
};

type Props = {
  newsletter: Newsletter;
};

export function NewsletterDescription({ newsletter }: Props) {
  return (
    <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-[40px] md:gap-[50px] px-[30px] md:px-[100px] pt-[50px] pb-[20px] md:py-0 md:h-[774px]">
      <div className="flex flex-col gap-[20px] md:gap-[50px] items-start w-full md:w-[639px] md:shrink-0">
        <div className="flex flex-col gap-[20px] items-start w-full">
          <div className="flex items-center justify-between w-full">
            <div className="flex gap-[8px] items-center">
              <span className="font-dm-sans font-normal text-[14px] leading-[20px] md:text-[16px] md:leading-[24px] text-[#5d5d5d] whitespace-nowrap">
                {formatDate(newsletter.uploadDate)}
              </span>
              <span className="size-[8px] rounded-full bg-[#A5D0F2] shrink-0" aria-hidden />
              <span className="font-dm-sans font-normal text-[14px] leading-[20px] md:text-[16px] md:leading-[24px] text-[#5d5d5d] whitespace-nowrap">
                Article
              </span>
            </div>
            <span className="font-dm-sans font-normal text-[14px] leading-[20px] md:text-[16px] md:leading-[24px] text-[#5d5d5d] whitespace-nowrap">
              {newsletter.views} {newsletter.views === 1 ? "view" : "views"}
            </span>
          </div>
          <h1 className="font-ethic font-light text-[36px] md:text-[64px] leading-[1.1] text-[#1e1e1e] w-full">
            {newsletter.title}
          </h1>
          <p className="font-dm-sans font-normal text-[14px] leading-[20px] md:text-[16px] md:leading-[24px] text-[#5d5d5d] w-full md:w-[611px] line-clamp-3 md:line-clamp-6">
            {newsletter.blurb}
          </p>
        </div>
        <a
          href={`/newsletters/${newsletter._id}`}
          className="hidden md:flex items-center justify-center gap-[10px] py-[12px] pr-[15px] hover:opacity-70 transition-opacity"
        >
          <span className="font-dm-sans font-semibold text-[16px] leading-[1.5] text-[#1e1e1e] whitespace-nowrap">
            Read More
          </span>
          <Image
            src="/imgs/arrow_right_alt.svg"
            alt=""
            width={24}
            height={24}
            className="size-[24px]"
          />
        </a>
      </div>
      <div className="relative w-full aspect-[342/158] md:w-[646px] md:aspect-[646/581] md:shrink-0">
        <Image
          src={newsletter.imageUrl || "/imgs/components_placeholder.png"}
          alt={newsletter.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 646px"
          priority
        />
      </div>
    </section>
  );
}
