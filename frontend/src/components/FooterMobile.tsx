"use client";

import Image from "next/image";

import { footerContact, footerCopyright, footerLinkSections, footerSocialLinks } from "./footerData";
import { FooterMiniBtn } from "./FooterMiniBtn";

type FooterMobileProps = {
  onContactClick: () => void;
  onTermsClick: () => void;
};

function renderFooterLinks(
  items: readonly (typeof footerLinkSections.services)[number][],
  onContactClick: () => void,
  onTermsClick: () => void,
) {
  return items.map((item) => (
    <FooterMiniBtn
      key={item.text}
      text={item.text}
      link={item.href}
      onClick={item.action === "contact" ? onContactClick : item.action === "terms" ? onTermsClick : undefined}
      className="text-left text-[14px] leading-6"
    />
  ));
}

export function FooterMobile({ onContactClick, onTermsClick }: FooterMobileProps) {
  return (
    <footer className="mx-auto w-full overflow-hidden rounded-b-[44px] bg-[#f4f4f4] px-[24px] pb-[28px] pt-[28px] shadow-[0_18px_30px_rgba(0,0,0,0.12)]">
      <div className="grid grid-cols-2 gap-x-10 gap-y-6 pb-6">
        <div className="flex flex-col items-start gap-[14px]">
          <h3 className="text-[16px] font-semibold text-[#172447]">Services</h3>
          {renderFooterLinks(footerLinkSections.services, onContactClick, onTermsClick)}
        </div>

        <div className="flex flex-col items-start gap-[14px]">
          <h3 className="text-[16px] font-semibold text-[#172447]">Company</h3>
          {renderFooterLinks(footerLinkSections.company, onContactClick, onTermsClick)}
        </div>
      </div>

      <div className="h-px w-full bg-[#d6d6d6]" />

      <div className="mt-6 flex flex-col items-start gap-4">
        <p className="text-[14px]">{footerContact.phone}</p>
        <a
          className="text-[14px] underline-offset-2 decoration-[7%] decoration-solid hover:underline"
          href={`mailto:${footerContact.email}`}
        >
          {footerContact.email}
        </a>
        <a
          className="text-[14px] underline-offset-2 decoration-[7%] decoration-solid hover:underline"
          href={footerContact.addressHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          {footerContact.addressLines[0]}
          <br />
          {footerContact.addressLines[1]}
        </a>

        <div className="flex items-start gap-[12px]">
          {footerSocialLinks.map((social) => (
            <a
              key={social.alt}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={social.src}
                alt={`${social.alt} icon`}
                width={40}
                height={40}
                className="aspect-square rounded-lg hover:opacity-60"
              />
            </a>
          ))}
        </div>

        <p className="max-w-[270px] text-[13px] leading-5 text-[#5d5d5d]">
          {footerCopyright}
        </p>

        <p
          className="pt-2 text-[#172447]"
          style={{ fontFamily: '"Ethic New", sans-serif', fontSize: "clamp(3.6rem, 14vw, 5.75rem)", lineHeight: 0.9 }}
        >
          <i>F3</i>GLOBAL
        </p>
      </div>
    </footer>
  );
}