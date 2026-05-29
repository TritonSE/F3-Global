"use client";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Section } from "@/components/admin-portal/Section";
import { auth } from "@/firebase/firebase";

export default function AdminPortal() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) return null;

  const HomeComponents = [
    {
      name: "Rotating Cities",
      description:
        "Edit city names by clicking into the text box, reorder by dragging, or add/delete cities.",
      tags: ["Homepage"],
      href: "/cities-editor",
    },
    {
      name: "Impact Metrics",
      description:
        "Input total money raised, how many members F3 has worldwide, and how many organizations have been supported, along with the date last updated.",
      tags: ["Homepage", "Donors"],
      href: "/impact-metrics-editor",
    },
    {
      name: "Client Highlights",
      description: "Edit 3 different client stories and their pictures. One story must be primary.",
      tags: ["Homepage", "About Us", "Donors"],
      href: "/client-highlights-editor",
    },
  ];

  const AboutComponents = [
    {
      name: "Interactive Timeline",
      description:
        "Edit the year, description, and image of each of the five slots available in the timeline component that shows F3’s growth.",
      tags: ["About Us"],
      href: "/timeline-editor",
    },
    {
      name: "Clients Logos",
      description: "Replace client logos, reorder by dragging, or add/remove logos.",
      tags: ["About Us"],
      href: "/client-logos-editor",
    },
    {
      name: "Client Highlights",
      description: "Edit 3 different client stories and their pictures. One story must be primary.",
      tags: ["Homepage", "About Us", "Donors"],
      href: "/client-highlights-editor",
    },
    {
      name: "Affiliation Logos",
      description: "Replace affiliation logos, reorder by dragging, or add/remove logos.",
      tags: ["About Us"],
      href: "/affiliates-logos-editor",
    },
  ];

  const TeamComponents = [
    {
      name: "College Logos",
      description: "Replace college logos, reorder by dragging, or add/remove logos.",
      tags: ["Meet the Team"],
      href: "/college-logos-editor",
    },
    {
      name: "Edit Team Members",
      description:
        "Add or remove current F3 team members, or edit information including member locations, image, and contact links.",
      tags: ["Meet the Team"],
      href: "/members-editor",
    },
  ];

  const DonorComponents = [
    {
      name: "Client Highlights",
      description: "Edit 3 different client stories and their pictures. One story must be primary.",
      tags: ["Homepage", "About Us", "Donors"],
      href: "/client-highlights-editor",
    },
    {
      name: "Impact Metrics",
      description:
        "Input total money raised, how many members F3 has worldwide, and how many organizations have been supported, along with the date last updated.",
      tags: ["Homepage", "Donors"],
      href: "/impact-metrics-editor",
    },
    {
      name: "Frequently Asked Questions",
      description:
        "Reorder FAQs by dragging, or easily add, edit, or remove questions and answers.",
      tags: ["Donors", "Members", "Clients"],
      href: "/faqs-editor",
    },
  ];

  const MemberComponents = [
    {
      name: "Frequently Asked Questions",
      description:
        "Reorder FAQs by dragging, or easily add, edit, or remove questions and answers.",
      tags: ["Donors", "Members", "Clients"],
      href: "/faqs-editor",
    },
  ];

  const ClientComponents = [
    {
      name: "Client Highlights",
      description: "Edit 3 different client stories and their pictures. One story must be primary.",
      tags: ["Homepage", "About Us", "Donors"],
      href: "/client-highlights-editor",
    },
    {
      name: "Frequently Asked Questions",
      description:
        "Reorder FAQs by dragging, or easily add, edit, or remove questions and answers.",
      tags: ["Donors", "Members", "Clients"],
      href: "/faqs-editor",
    },
  ];

  const NewsletterComponents = [
    {
      name: "Edit Newsletter Articles",
      description:
        "Add or remove newsletter articles, or edit information including the newsletter external PDF link and summary. Track how many views each article has. By default, articles appear sorted by date of upload, and the Featured article is always sticky to the top.",
      tags: ["Newsletter"],
      href: "/newsletter-editor",
    },
  ];

  return (
    <div className="flex">
      <div className="flex flex-1 flex-col items-start gap-[40px] p-[50px]">
        <div className="flex gap-[10px] -mb-[10px]">
          <p className="text-[#1E1E1E] text-[32px] font-bold -tracking-[0.64px]">Welcome,</p>
          <p className="text-[#172447] text-[32px] font-bold -tracking-[0.64px]">F3 Global!</p>
        </div>

        <div id="home" className="w-full">
          <Section name={"HOME"} components={HomeComponents} />
        </div>
        <div id="about-us" className="w-full">
          <Section name={"ABOUT US"} components={AboutComponents} />
        </div>
        <div id="meet-the-team" className="w-full">
          <Section name={"MEET THE TEAM"} components={TeamComponents} />
        </div>
        <div id="donate" className="w-full">
          <Section name={"DONATE"} components={DonorComponents} />
        </div>
        <div id="members" className="w-full">
          <Section name={"MEMBERS"} components={MemberComponents} />
        </div>
        <div id="clients" className="w-full">
          <Section name={"CLIENTS"} components={ClientComponents} />
        </div>
        <div id="newsletter" className="w-full">
          <Section name={"NEWSLETTER"} components={NewsletterComponents} />
        </div>
      </div>
    </div>
  );
}
