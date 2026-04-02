import { Section } from "@/components/admin-portal/Section";

export default function AdminPortal() {
  const HomeComponents = [
    {
      name: "Rotating Cities",
      description:
        "Edit city names by clicking into the text box, reorder by dragging, or add/delete cities.",
      tags: ["Homepage"],
      href: "/rotating-cities-editor",
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
      description:
        "Edit, add, or remove a testimonial from the Clients Carousel which rotates between a set of three client testimonials.",
      tags: ["Homepage", "About Us", "Donors"],
      href: "/affiliation-logos-editor",
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
      href: "/team-members-editor",
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
      href: "/newsletter-articles-editor",
    },
  ];

  return (
    <div className="flex p-[50px] gap-[40px] flex-col items-start">
      <div className="flex gap-[10px] -mb-[10px]">
        <p className="text-[#1E1E1E] text-[32px] font-bold -tracking-[0.64px]">Welcome,</p>
        <p className="text-[#172447] text-[32px] font-bold -tracking-[0.64px]">F3 Global!</p>
      </div>

      <Section name={"HOME"} components={HomeComponents} />
      <Section name={"ABOUT US"} components={AboutComponents} />
      <Section name={"MEET THE TEAM"} components={TeamComponents} />
      <Section name={"DONATE"} components={DonorComponents} />
      <Section name={"MEMBERS"} components={MemberComponents} />
      <Section name={"CLIENTS"} components={ClientComponents} />
      <Section name={"NEWSLETTER"} components={NewsletterComponents} />
    </div>
  );
}
