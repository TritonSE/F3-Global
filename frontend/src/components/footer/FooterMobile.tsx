"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

import { footerContact, footerCopyright, footerSocialLinks } from "./footerData";
import { FooterMiniBtn } from "./FooterMiniBtn";

type FooterMobileProps = {
  onContactClick: () => void;
  onTermsClick: () => void;
};

export function FooterMobile({ onContactClick, onTermsClick }: FooterMobileProps) {
  const pathname = usePathname();

  if (pathname === "/login") return null;

  return (
    <footer className="w-full overflow-hidden rounded-b-[44px] bg-[#f4f4f4] px-[30px] pb-[50px] pt-[50px] shadow-[0_18px_30px_rgba(0,0,0,0.12)]">
      <div className="grid grid-cols-2 gap-x-10 gap-y-6 pb-6">
        <div className="flex flex-col items-start gap-[14px]">
          <h3 className="text-[16px] font-semibold text-[#172447]">Services</h3>
          <FooterMiniBtn 
            text="Donors"
            link="/donors"
            className="text-left text-[12px] leading-6"
          />
          <FooterMiniBtn
            text="Clients"
            link="/clients"
            className="text-left text-[12px] leading-6"
          />
          <FooterMiniBtn
            text="Members"
            link="/members"
            className="text-left text-[12px] leading-6"
          />
          <FooterMiniBtn
            text="What We Do"
            link="/about-us"
            className="text-left text-[12px] leading-6"
          />
          <FooterMiniBtn
            text="Contact"
            onClick={onContactClick}
            className="text-left text-[12px] leading-6"
          />
          <FooterMiniBtn
            text="Member Application"
            link="https://my-apply.vercel.app/org/f3-global-foundation"
            className="text-left text-[12px] leading-6"
          />
        </div>

        <div className="flex flex-col items-start gap-[14px]">
          <h3 className="text-[16px] font-semibold text-[#172447]">Company</h3>
          <FooterMiniBtn
            text="About"
            link="/about-us"
            className="text-left text-[12px] leading-6"
          />
          <FooterMiniBtn text="News" className="text-left text-[12px] leading-6" />
          <FooterMiniBtn text="Events" className="text-left text-[12px] leading-6" />
          <FooterMiniBtn
            text="Meet The Team"
            link="/meet-the-team"
            className="text-left text-[12px] leading-6"
          />
          <FooterMiniBtn
            text="Privacy Policy"
            link="/privacy-policy"
            className="text-left text-[12px] leading-6"
          />
          <FooterMiniBtn
            text="Terms & Conditions"
            onClick={onTermsClick}
            className="text-left text-[12px] leading-6"
          />
        </div>
      </div>

      <div className="h-px w-full bg-[#d6d6d6]" />

      <div className="mt-6 flex flex-col items-start gap-[15px]">
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

        <div className="flex w-[392px] h-[60px] flex-col justify-center text-[#5d5d5d] font-dm-sans text-[12px] font-normal leading-[16px]">
          <p className="whitespace-pre-wrap">{footerCopyright}</p>
        </div>

        <p
          className="pt-2 text-[#172447]"
          style={{
            fontFamily: '"Ethic New", sans-serif',
            fontSize: "clamp(3.6rem, 19vw, 5.75rem)",
            lineHeight: 0.9,
          }}
        >
          <i>F3</i>GLOBAL
        </p>
      </div>
    </footer>
  );
}
