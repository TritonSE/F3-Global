"use client";

import { usePathname, useRouter } from "next/navigation";

import { FooterDesktop } from "./FooterDesktop";
import { FooterMobile } from "./FooterMobile";

export const Footer = function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/login") return null;
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

  const handleTermsClick = () => {
    router.push("/terms-and-conditions", { scroll: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="md:hidden">
        <FooterMobile onContactClick={handleContactClick} onTermsClick={handleTermsClick} />
      </div>
      <div className="hidden md:block">
        <FooterDesktop onContactClick={handleContactClick} onTermsClick={handleTermsClick} />
      </div>
    </>
  );
};
