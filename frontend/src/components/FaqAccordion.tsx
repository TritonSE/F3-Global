import React from "react";

import AccordionItem from "./AccordionItem";

export const FaqSection = ({ page }: { page: string }) => {
  const donorsFaqList = [
    {
      id: 0,
      question: "Lorem ipsum dolor sit amet, consectetur?",
      answer:
        "We take this responsibility seriously because we know you've worked hard for your money and deserve to see real impact. Your donation follows a transparent path: it enters our microloan fund, gets matched with vetted entrepreneurs through our local partner organizations, and is disbursed via secure banking or mobile payment systems that create clear documentation. We provide regular updates showing the specific entrepreneurs your contribution helped, complete with photos, business details, and progress reports. Our **% repayment rate is strong evidence that real people received real capital and built sustainable businesses—you can't repay a loan you never received. Additionally, our financial statements undergo annual independent audits, **% of every dollar goes directly to loans (as verified by third-party review), and we welcome questions anytime you want more details about your donation's impact. We're not perfect, but we're committed to earning and keeping your trust through transparency at every step.",
    },
    {
      id: 1,
      question: "Lorem ipsum dolor sit amet, consectetur?",
      answer:
        "We take this responsibility seriously because we know you've worked hard for your money and deserve to see real impact. Your donation follows a transparent path: it enters our microloan fund, gets matched with vetted entrepreneurs through our local partner organizations, and is disbursed via secure banking or mobile payment systems that create clear documentation. We provide regular updates showing the specific entrepreneurs your contribution helped, complete with photos, business details, and progress reports. Our **% repayment rate is strong evidence that real people received real capital and built sustainable businesses—you can't repay a loan you never received. Additionally, our financial statements undergo annual independent audits, **% of every dollar goes directly to loans (as verified by third-party review), and we welcome questions anytime you want more details about your donation's impact. We're not perfect, but we're committed to earning and keeping your trust through transparency at every step.",
    },
    {
      id: 2,
      question: "Lorem ipsum dolor sit amet, consectetur?",
      answer:
        "We take this responsibility seriously because we know you've worked hard for your money and deserve to see real impact. Your donation follows a transparent path: it enters our microloan fund, gets matched with vetted entrepreneurs through our local partner organizations, and is disbursed via secure banking or mobile payment systems that create clear documentation. We provide regular updates showing the specific entrepreneurs your contribution helped, complete with photos, business details, and progress reports. Our **% repayment rate is strong evidence that real people received real capital and built sustainable businesses—you can't repay a loan you never received. Additionally, our financial statements undergo annual independent audits, **% of every dollar goes directly to loans (as verified by third-party review), and we welcome questions anytime you want more details about your donation's impact. We're not perfect, but we're committed to earning and keeping your trust through transparency at every step.",
    },
    {
      id: 3,
      question: "Lorem ipsum dolor sit amet, consectetur?",
      answer:
        "We take this responsibility seriously because we know you've worked hard for your money and deserve to see real impact. Your donation follows a transparent path: it enters our microloan fund, gets matched with vetted entrepreneurs through our local partner organizations, and is disbursed via secure banking or mobile payment systems that create clear documentation. We provide regular updates showing the specific entrepreneurs your contribution helped, complete with photos, business details, and progress reports. Our **% repayment rate is strong evidence that real people received real capital and built sustainable businesses—you can't repay a loan you never received. Additionally, our financial statements undergo annual independent audits, **% of every dollar goes directly to loans (as verified by third-party review), and we welcome questions anytime you want more details about your donation's impact. We're not perfect, but we're committed to earning and keeping your trust through transparency at every step.",
    },
    {
      id: 4,
      question: "Lorem ipsum dolor sit amet, consectetur?",
      answer:
        "We take this responsibility seriously because we know you've worked hard for your money and deserve to see real impact. Your donation follows a transparent path: it enters our microloan fund, gets matched with vetted entrepreneurs through our local partner organizations, and is disbursed via secure banking or mobile payment systems that create clear documentation. We provide regular updates showing the specific entrepreneurs your contribution helped, complete with photos, business details, and progress reports. Our **% repayment rate is strong evidence that real people received real capital and built sustainable businesses—you can't repay a loan you never received. Additionally, our financial statements undergo annual independent audits, **% of every dollar goes directly to loans (as verified by third-party review), and we welcome questions anytime you want more details about your donation's impact. We're not perfect, but we're committed to earning and keeping your trust through transparency at every step.",
    },
  ];
  const membersFaqList = [
    {
      id: 0,
      question: "Lorem ipsum dolor sit amet, consectetur?",
      answer:
        "We take this responsibility seriously because we know you've worked hard for your money and deserve to see real impact. Your donation follows a transparent path: it enters our microloan fund, gets matched with vetted entrepreneurs through our local partner organizations, and is disbursed via secure banking or mobile payment systems that create clear documentation. We provide regular updates showing the specific entrepreneurs your contribution helped, complete with photos, business details, and progress reports. Our **% repayment rate is strong evidence that real people received real capital and built sustainable businesses—you can't repay a loan you never received. Additionally, our financial statements undergo annual independent audits, **% of every dollar goes directly to loans (as verified by third-party review), and we welcome questions anytime you want more details about your donation's impact. We're not perfect, but we're committed to earning and keeping your trust through transparency at every step.",
    },
    {
      id: 1,
      question: "Lorem ipsum dolor sit amet, consectetur?",
      answer:
        "We take this responsibility seriously because we know you've worked hard for your money and deserve to see real impact. Your donation follows a transparent path: it enters our microloan fund, gets matched with vetted entrepreneurs through our local partner organizations, and is disbursed via secure banking or mobile payment systems that create clear documentation. We provide regular updates showing the specific entrepreneurs your contribution helped, complete with photos, business details, and progress reports. Our **% repayment rate is strong evidence that real people received real capital and built sustainable businesses—you can't repay a loan you never received. Additionally, our financial statements undergo annual independent audits, **% of every dollar goes directly to loans (as verified by third-party review), and we welcome questions anytime you want more details about your donation's impact. We're not perfect, but we're committed to earning and keeping your trust through transparency at every step.",
    },
    {
      id: 2,
      question: "Lorem ipsum dolor sit amet, consectetur?",
      answer:
        "We take this responsibility seriously because we know you've worked hard for your money and deserve to see real impact. Your donation follows a transparent path: it enters our microloan fund, gets matched with vetted entrepreneurs through our local partner organizations, and is disbursed via secure banking or mobile payment systems that create clear documentation. We provide regular updates showing the specific entrepreneurs your contribution helped, complete with photos, business details, and progress reports. Our **% repayment rate is strong evidence that real people received real capital and built sustainable businesses—you can't repay a loan you never received. Additionally, our financial statements undergo annual independent audits, **% of every dollar goes directly to loans (as verified by third-party review), and we welcome questions anytime you want more details about your donation's impact. We're not perfect, but we're committed to earning and keeping your trust through transparency at every step.",
    },
    {
      id: 3,
      question: "Lorem ipsum dolor sit amet, consectetur?",
      answer:
        "We take this responsibility seriously because we know you've worked hard for your money and deserve to see real impact. Your donation follows a transparent path: it enters our microloan fund, gets matched with vetted entrepreneurs through our local partner organizations, and is disbursed via secure banking or mobile payment systems that create clear documentation. We provide regular updates showing the specific entrepreneurs your contribution helped, complete with photos, business details, and progress reports. Our **% repayment rate is strong evidence that real people received real capital and built sustainable businesses—you can't repay a loan you never received. Additionally, our financial statements undergo annual independent audits, **% of every dollar goes directly to loans (as verified by third-party review), and we welcome questions anytime you want more details about your donation's impact. We're not perfect, but we're committed to earning and keeping your trust through transparency at every step.",
    },
    {
      id: 4,
      question: "Lorem ipsum dolor sit amet, consectetur?",
      answer:
        "We take this responsibility seriously because we know you've worked hard for your money and deserve to see real impact. Your donation follows a transparent path: it enters our microloan fund, gets matched with vetted entrepreneurs through our local partner organizations, and is disbursed via secure banking or mobile payment systems that create clear documentation. We provide regular updates showing the specific entrepreneurs your contribution helped, complete with photos, business details, and progress reports. Our **% repayment rate is strong evidence that real people received real capital and built sustainable businesses—you can't repay a loan you never received. Additionally, our financial statements undergo annual independent audits, **% of every dollar goes directly to loans (as verified by third-party review), and we welcome questions anytime you want more details about your donation's impact. We're not perfect, but we're committed to earning and keeping your trust through transparency at every step.",
    },
  ];
  const clientsFaqList = [
    {
      id: 0,
      question: "Lorem ipsum dolor sit amet, consectetur?",
      answer:
        "We take this responsibility seriously because we know you've worked hard for your money and deserve to see real impact. Your donation follows a transparent path: it enters our microloan fund, gets matched with vetted entrepreneurs through our local partner organizations, and is disbursed via secure banking or mobile payment systems that create clear documentation. We provide regular updates showing the specific entrepreneurs your contribution helped, complete with photos, business details, and progress reports. Our **% repayment rate is strong evidence that real people received real capital and built sustainable businesses—you can't repay a loan you never received. Additionally, our financial statements undergo annual independent audits, **% of every dollar goes directly to loans (as verified by third-party review), and we welcome questions anytime you want more details about your donation's impact. We're not perfect, but we're committed to earning and keeping your trust through transparency at every step.",
    },
    {
      id: 1,
      question: "Lorem ipsum dolor sit amet, consectetur?",
      answer:
        "We take this responsibility seriously because we know you've worked hard for your money and deserve to see real impact. Your donation follows a transparent path: it enters our microloan fund, gets matched with vetted entrepreneurs through our local partner organizations, and is disbursed via secure banking or mobile payment systems that create clear documentation. We provide regular updates showing the specific entrepreneurs your contribution helped, complete with photos, business details, and progress reports. Our **% repayment rate is strong evidence that real people received real capital and built sustainable businesses—you can't repay a loan you never received. Additionally, our financial statements undergo annual independent audits, **% of every dollar goes directly to loans (as verified by third-party review), and we welcome questions anytime you want more details about your donation's impact. We're not perfect, but we're committed to earning and keeping your trust through transparency at every step.",
    },
    {
      id: 2,
      question: "Lorem ipsum dolor sit amet, consectetur?",
      answer:
        "We take this responsibility seriously because we know you've worked hard for your money and deserve to see real impact. Your donation follows a transparent path: it enters our microloan fund, gets matched with vetted entrepreneurs through our local partner organizations, and is disbursed via secure banking or mobile payment systems that create clear documentation. We provide regular updates showing the specific entrepreneurs your contribution helped, complete with photos, business details, and progress reports. Our **% repayment rate is strong evidence that real people received real capital and built sustainable businesses—you can't repay a loan you never received. Additionally, our financial statements undergo annual independent audits, **% of every dollar goes directly to loans (as verified by third-party review), and we welcome questions anytime you want more details about your donation's impact. We're not perfect, but we're committed to earning and keeping your trust through transparency at every step.",
    },
    {
      id: 3,
      question: "Lorem ipsum dolor sit amet, consectetur?",
      answer:
        "We take this responsibility seriously because we know you've worked hard for your money and deserve to see real impact. Your donation follows a transparent path: it enters our microloan fund, gets matched with vetted entrepreneurs through our local partner organizations, and is disbursed via secure banking or mobile payment systems that create clear documentation. We provide regular updates showing the specific entrepreneurs your contribution helped, complete with photos, business details, and progress reports. Our **% repayment rate is strong evidence that real people received real capital and built sustainable businesses—you can't repay a loan you never received. Additionally, our financial statements undergo annual independent audits, **% of every dollar goes directly to loans (as verified by third-party review), and we welcome questions anytime you want more details about your donation's impact. We're not perfect, but we're committed to earning and keeping your trust through transparency at every step.",
    },
    {
      id: 4,
      question: "Lorem ipsum dolor sit amet, consectetur?",
      answer:
        "We take this responsibility seriously because we know you've worked hard for your money and deserve to see real impact. Your donation follows a transparent path: it enters our microloan fund, gets matched with vetted entrepreneurs through our local partner organizations, and is disbursed via secure banking or mobile payment systems that create clear documentation. We provide regular updates showing the specific entrepreneurs your contribution helped, complete with photos, business details, and progress reports. Our **% repayment rate is strong evidence that real people received real capital and built sustainable businesses—you can't repay a loan you never received. Additionally, our financial statements undergo annual independent audits, **% of every dollar goes directly to loans (as verified by third-party review), and we welcome questions anytime you want more details about your donation's impact. We're not perfect, but we're committed to earning and keeping your trust through transparency at every step.",
    },
  ];

  let faqList;

  if (page === "donors") {
    faqList = donorsFaqList;
  } else if (page === "members") {
    faqList = membersFaqList;
  } else {
    faqList = clientsFaqList;
  }

  return (
    <div className="mx-auto flex flex-col justify-center items-center w-full border-t border-[#F4F4F4]">
      <div className="mx-auto flex flex-col items-start w-full pt-[50px] pb-[100px] px-[5vw] gap-[40px]">
        <h1 className="text-[48px] font-medium self-stretch text-[#172447]">Questions?</h1>
        <div className="flex flex-col p-[20px] gap-[25px] items-start self-stretch bg-[#F4F4F4] rounded-[10px]">
          {faqList.map((faq, i) => (
            <div key={faq.id} className="flex flex-col gap-[25px] w-full">
              <AccordionItem question={faq.question} answer={faq.answer} />

              {i !== faqList.length - 1 && <span className="h-[2px] w-full bg-[#C7C7C7]" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
