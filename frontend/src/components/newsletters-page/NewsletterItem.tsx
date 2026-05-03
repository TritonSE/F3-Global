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

export function NewsletterItem({ newsletter }: Props) {
  return (
    <a
      href={`/newsletters/${newsletter._id}`}
      className="flex flex-col gap-[20px] items-center justify-center group cursor-pointer"
    >
      <div className="relative w-full aspect-[415/302] overflow-hidden">
        <Image
          src="/imgs/components_placeholder.png"
          alt={newsletter.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-col gap-[10px] items-start w-full">
        <div className="flex items-center justify-between w-full">
          <div className="flex gap-[8px] items-center">
            <span className="font-dm-sans font-normal text-[12px] leading-[16px] text-[#5d5d5d] whitespace-nowrap">
              {formatDate(newsletter.uploadDate)}
            </span>
            <span className="size-[8px] rounded-full bg-[#A5D0F2] shrink-0" aria-hidden />
            <span className="font-dm-sans font-normal text-[12px] leading-[16px] text-[#5d5d5d] whitespace-nowrap">
              Article
            </span>
          </div>
          <span className="font-dm-sans font-normal text-[12px] leading-[16px] text-[#5d5d5d] whitespace-nowrap">
            {newsletter.views} {newsletter.views === 1 ? "view" : "views"}
          </span>
        </div>
        <h3 className="font-dm-sans font-normal text-[24px] leading-[32px] text-[#1e1e1e] w-full line-clamp-3 group-hover:underline">
          {newsletter.title}
        </h3>
      </div>
    </a>
  );
}
