"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

import {
  footerContact,
  footerCopyright,
  type FooterLinkItem,
  footerLinkSections,
  footerSocialLinks,
} from "./footerData";
import { FooterMiniBtn } from "./FooterMiniBtn";

type FooterDesktopProps = {
  onContactClick: () => void;
  onTermsClick: () => void;
};

export const FooterDesktop = function Footer({ onContactClick, onTermsClick }: FooterDesktopProps) {
  const pathname = usePathname();

  if (pathname === "/login") return null;

  const getFooterAction = (item: FooterLinkItem) => {
    if (item.action === "contact") return onContactClick;
    if (item.action === "terms") return onTermsClick;
    return undefined;
  };

  const getFooterHref = (item: FooterLinkItem) => item.href;

  return (
    <div className="mx-auto flex flex-col justify-center px-[5vw] py-[100px] bg-[#f4f4f4] w-full">
      <div className="flex w-full justify-between items-center">
        <div className="flex flex-col items-start gap-[15px] ">
          <div className="flex flex-col w-[392px] h-[60px] justify-center">
            <p
              className="text-[#172447] text-[64px]"
              style={{ fontFamily: '"Ethic New", sans-serif' }}
            >
              <i>F3</i>GLOBAL
            </p>
          </div>

          <p>{footerContact.phone}</p>
          <a
            className="hover:underline decoration-[7%] decoration-solid underline-offset-2"
            href={`mailto:${footerContact.email}`}
          >
            {footerContact.email}
          </a>
          <a
            href={footerContact.addressHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline decoration-[7%] decoration-solid underline-offset-2"
          >
            {footerContact.addressLines[0]} <br /> {footerContact.addressLines[1]}
          </a>
          <div className="flex items-start gap-[20px]">
            {footerSocialLinks.map((social) => (
              <a key={social.alt} href={social.href} target="_blank" rel="noopener noreferrer">
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
          <p className="whitespace-pre-wrap text-[#5d5d5d]">{footerCopyright}</p>
        </div>
        <div className="flex w-[554px] items-start gap-[70px] shrink-0">
          <div className="flex flex-col items-start gap-[15px]">
            <h3 className="font-semibold">Services</h3>
            {footerLinkSections.services.map((item) => (
              <FooterMiniBtn
                key={item.text}
                text={item.text}
                link={getFooterHref(item)}
                onClick={getFooterAction(item)}
              />
            ))}
          </div>
          <div className="flex flex-col items-start gap-[15px]">
            <h3 className="font-semibold">Company</h3>
            {footerLinkSections.company.map((item) => (
              <FooterMiniBtn
                key={item.text}
                text={item.text}
                link={getFooterHref(item)}
                onClick={getFooterAction(item)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
