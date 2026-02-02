import React from "react";

import Background from "./parallax_background";

const parallaxSections = [
  {
    number: 1,
    title1: "You",
    title2: "Donate",
    content:
      "Make a secure online contribution in any amount that feels right for you, whether it's $50, $100, or $500, every dollar makes a meaningful difference in an entrepreneur's life. Our simple donation process takes less than two minutes, accepts all major payment methods, and provides immediate confirmation that your gift is on its way to creating opportunity. Choose between one-time or recurring donations, and rest assured that your financial information is protected with bank-level security.",
  },
  {
    number: 2,
    title1: "We",
    title2: "Process",
    content:
      "Once your donation arrives, our team immediately allocates **% directly to our microloan fund while dedicating **% to essential operations like vetting entrepreneurs, managing loans, and tracking impact. This careful distribution ensures your gift creates maximum sustainable change while maintaining the infrastructure needed to serve entrepreneurs effectively. We match available funds with pre-vetted entrepreneurs who've demonstrated business viability, strong community ties, and clear repayment plans.",
  },
  {
    number: 3,
    title1: "Loans",
    title2: "Disbursed",
    content:
      "Funds reach the entrepreneur quickly through secure channels, often via mobile banking or trusted local partners who understand the community's needs. The entrepreneur receives not just capital but also guidance on how to deploy it effectively—whether purchasing inventory for a market stall, buying equipment for a workshop, or securing supplies for an agricultural venture. This moment transforms abstract hope into tangible possibility as business owners hold the resources they need to build their dreams.",
  },
  {
    number: 4,
    title1: "Business",
    title2: "Grows",
    content:
      "With capital finally in hand, entrepreneurs spring into action—purchasing inventory that fills their shops, buying equipment that increases productivity, or investing in supplies that expand their service offerings. Over the following weeks and months, you'll see businesses transform: a street vendor opens a permanent stall, a seamstress buys additional sewing machines and hires apprentices, a farmer acquires better seeds and tools that triple crop yields. These growing enterprises create jobs for neighbors, generate reliable income for families, and strengthen entire local economies one successful business at a time.",
  },
  {
    number: 5,
    title1: "Impact",
    title2: "Measured",
    content:
      "You'll receive regular updates showing the entrepreneur's journey from loan recipient to thriving business owner, complete with progress photos, revenue growth data, and personal stories about how the opportunity changed their lives. We track key metrics like repayment rates (consistently above 95**%), jobs created, household income increases, and broader community benefits. These aren't just feel-good stories—they're verified results that demonstrate your donation's tangible, measurable impact on real people building real futures for themselves and their families.",
  },
];

export default function Parallax() {
  const totalHeight = `${parallaxSections.length * 100}vh`;

  return (
    <Background style={{ minHeight: totalHeight }}>
      {parallaxSections.map((section) => (
        <div
          key={section.number}
          id={`step-${section.number}`}
          className="h-screen flex items-center"
        >
          <div className="box-border pr-[17.85%] pl-[43.32%] w-full">
            <h1 className="text-white font-['Ethic_New'] text-[64px] font-light leading-[110%] pb-[10px]">
              {section.number}. {section.title1} <i>{section.title2}</i>
            </h1>
            <p className="text-white font-['DM_Sans'] text-base font-normal leading-[24px]">
              {section.content}
            </p>
          </div>
        </div>
      ))}
    </Background>
  );
}
