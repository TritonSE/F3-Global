export type FooterLinkItem = {
  text: string;
  href?: string;
  action?: "contact" | "terms";
};

export const footerLinkSections = {
  services: [
    { text: "Donors", href: "/donors" },
    { text: "Clients", href: "/clients" },
    { text: "Members", href: "/members" },
    { text: "What We Do", href: "/about-us" },
    { text: "Contact", action: "contact" },
    {
      text: "Member Application",
      href: "https://my-apply.vercel.app/org/f3-global-foundation",
    },
  ],
  company: [
    { text: "About", href: "/about-us" },
    { text: "News", href: "/newsletters" },
    { text: "Home", href: "/" },
    { text: "Meet The Team", href: "/meet-the-team" },
    { text: "Privacy Policy", href: "/privacy-policy" },
    { text: "Terms & Conditions", action: "terms" },
  ],
} as const satisfies Record<string, readonly FooterLinkItem[]>;

export const footerSocialLinks = [
  {
    href: "https://www.linkedin.com/company/f3global/",
    alt: "LinkedIn",
    src: "/imgs/linkedin.png",
  },
  {
    href: "https://www.instagram.com/futureforwardfoundation?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    alt: "Instagram",
    src: "/imgs/instagram.png",
  },
] as const;

export const footerContact = {
  phone: "949.668.3568",
  email: "info@f3-global.org",
  addressHref: "https://maps.app.goo.gl/M1onQnhbgSESpYtU6",
  addressLines: ["8 The Green STE A", "Dover, DE 19901"],
} as const;

export const footerCopyright =
  "©2025 F3Global. All rights reserved.\nF3 Global is a 501(c)(3) non-profit organization.";
