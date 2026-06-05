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
    <section className="flex flex-col-reverse items-center justify-between gap-[30px] px-[30px] pb-[40px] pt-[50px] xl:h-[774px] xl:flex-row xl:gap-[clamp(24px,3vw,50px)] xl:px-[100px] xl:py-0">
      <div className="flex w-full min-w-0 flex-col items-start gap-[24px] xl:max-w-[639px] xl:flex-1 xl:gap-[50px]">
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
          <h1 className="w-full font-ethic text-[36px] font-light leading-[1.1] text-[#1e1e1e] md:text-[48px] xl:text-[64px]">
            {newsletter.title}
          </h1>
          <p className="line-clamp-3 w-full font-dm-sans text-[14px] leading-[20px] font-normal text-[#5d5d5d] md:text-[16px] md:leading-[24px] xl:max-w-[611px] xl:line-clamp-6">
            {newsletter.blurb}
          </p>
        </div>
        <a
          href={`/newsletters/${newsletter._id}`}
          className="flex items-center justify-center gap-[10px] py-[12px] pr-[15px] transition-opacity hover:opacity-70"
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
      <div className="relative aspect-[342/190] w-full overflow-hidden rounded-[10px] md:aspect-[646/360] xl:aspect-[646/581] xl:w-[min(43vw,646px)] xl:min-w-[360px] xl:shrink">
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
