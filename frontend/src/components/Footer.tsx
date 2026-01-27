"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { FooterMiniBtn } from "./FooterMiniBtn";

export const Footer = function Footer() {
  const router = useRouter();
  // looks for header tags that contain `contact`
  const handleContactClick = () => {
    const headings = Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6"));
    const contactSection = headings.find((heading) => {
      const text = heading.textContent?.toLowerCase() || "";
      return text.includes("contact us");
    });

    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    } else {
      // defaults to home page if not found
      router.push("/?contact=true");
    }
  };
  return (
    <div id="contact" className="flex flex-col items-center self-stretch py-[100px] bg-[#f4f4f4]">
      <div className="flex w-[1313px] justify-between items-start">
        <div className="flex flex-col items-start gap-[15px] ">
          <div className="flex flex-col w-[392px] h-[60px] justify-center">
            <p
              className="text-[#172447] text-[64px]"
              style={{ fontFamily: '"Ethic New", sans-serif' }}
            >
              <i>F3</i>GLOBAL
            </p>
          </div>

          <p>949.668.3568</p>
          <a
            className="hover:underline decoration-[7%] decoration-solid underline-offset-2"
            href="mailto:info@f3-global.org"
          >
            info@f3-global.org
          </a>
          <a
            href="https://maps.app.goo.gl/M1onQnhbgSESpYtU6"
            target="_blank"
            className="hover:underline decoration-[7%] decoration-solid underline-offset-2"
          >
            8 The Green STE <br /> A Dover, DE 19901
          </a>
          <div className="flex items-start gap-[30px]">
            <a href="https://www.linkedin.com/company/f3global/" target="_blank">
              <Image
                src="/imgs/linkedin.png"
                alt="linkedin icon"
                width={40}
                height={40}
                className="aspect-square rounded-lg hover:opacity-60"
              />
            </a>

            <a
              href="https://www.instagram.com/futureforwardfoundation?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
            >
              <Image
                src="/imgs/instagram.png"
                alt="instagram icon"
                width={40}
                height={40}
                className="aspect-square rounded-lg hover:opacity-60"
              />
            </a>
          </div>
          <p className="text-[#5d5d5d]">
            ©2025 F3Global. All rights reserved. <br />
            F3 Global is a 501(c)(3) non-profit organization.
          </p>
        </div>
        <div className="flex w-[554px] items-start gap-[70px] shrink-0">
          <div className="flex flex-col items-start gap-[15px]">
            <h3 className="font-semibold">Services</h3>
            <FooterMiniBtn text="Donors" link="/donors" />
            <FooterMiniBtn text="Clients" link="/clients" />
            <FooterMiniBtn text="Members" link="/members" />
            <FooterMiniBtn text="What We Do" link="/about-us" />
            <FooterMiniBtn text="Contact" onClick={handleContactClick} />
            <FooterMiniBtn
              text="Member Application"
              link="https://my-apply.vercel.app/org/f3-global-foundation"
            />
          </div>
          <div className="flex flex-col items-start gap-[15px]">
            <h3 className="font-semibold">Company</h3>
            <FooterMiniBtn text="About" link="/about-us" />
            <FooterMiniBtn text="News" />
            <FooterMiniBtn text="Events" />
            <FooterMiniBtn text="Meet The Team" link="/meet-the-team" />
            <FooterMiniBtn text="Privacy Policy" />
            <FooterMiniBtn text="Terms & Conditions" />
          </div>
        </div>
      </div>
    </div>
  );
};
