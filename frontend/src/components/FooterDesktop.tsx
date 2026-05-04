"use client";

import Image from "next/image";

import { footerContact, footerCopyright, footerLinkSections, footerSocialLinks } from "./footerData";
import { FooterMiniBtn } from "./FooterMiniBtn";

type FooterDesktopProps = {
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
      className="text-left text-[16px] leading-6"
    />
  ));
}

export function FooterDesktop({ onContactClick, onTermsClick }: FooterDesktopProps) {
  return (
    <footer className="mx-auto flex w-full flex-col justify-center bg-[#f4f4f4] px-[5vw] py-[100px]">
      <div className="flex w-full items-center justify-between gap-10">
        <div className="flex flex-col items-start gap-[15px]">
          <div className="flex h-[60px] w-[392px] flex-col justify-center">
            <p
              className="text-[64px] text-[#172447]"
              style={{ fontFamily: '"Ethic New", sans-serif' }}
            >
              <i>F3</i>GLOBAL
            </p>
          </div>

          <p>{footerContact.phone}</p>
          <a
            className="underline-offset-2 decoration-[7%] decoration-solid hover:underline"
            href={`mailto:${footerContact.email}`}
          >
            {footerContact.email}
          </a>
          <a
            href={footerContact.addressHref}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-2 decoration-[7%] decoration-solid hover:underline"
          >
            {footerContact.addressLines[0]}
            <br />
            {footerContact.addressLines[1]}
          </a>
          <div className="flex items-start gap-[20px]">
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
          <p className="text-[#5d5d5d]">
            {footerCopyright}
          </p>
        </div>

        <div className="flex shrink-0 items-start gap-[70px]">
          <div className="flex flex-col items-start gap-[15px]">
            <h3 className="font-semibold">Services</h3>
            {renderFooterLinks(footerLinkSections.services, onContactClick, onTermsClick)}
          </div>

          <div className="flex flex-col items-start gap-[15px]">
            <h3 className="font-semibold">Company</h3>
            {renderFooterLinks(footerLinkSections.company, onContactClick, onTermsClick)}
          </div>
        </div>
      </div>
    </footer>
  );
}