"use client";

import { usePathname, useRouter } from "next/navigation";

import { FooterDesktop } from "./footer/FooterDesktop";
import { FooterMobile } from "./footer/FooterMobile";

export const Footer = function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/login") return null;

  const scrollToContact = (element: Element) => {
    const headerOffset = window.matchMedia("(min-width: 768px)").matches ? 120 : 80;
    const top = element.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  // looks for header tags that contain `contact`
  const handleContactClick = () => {
    const contactSection =
      document.getElementById("contact") ??
      Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6")).find((heading) => {
        const text = heading.textContent?.toLowerCase() || "";
        return text.includes("contact us");
      });

    if (contactSection) {
      scrollToContact(contactSection);
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
