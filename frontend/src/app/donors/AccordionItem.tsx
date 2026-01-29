"use client";
import Image from "next/image";
import { useState } from "react";

export default function FaqAccordion({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="flex w-full flex-col">
      <button
        className="flex justify-between w-full items-center cursor-pointer"
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        <p
          className={`flex text-[28px] font-medium -tracking-[0.56px] ${
            isOpen ? "text-[#012060]" : ""
          }`}
        >
          {question}
        </p>
        {isOpen ? (
          <Image src="/imgs/remove.svg" alt="remove icon" width={42} height={42} />
        ) : (
          <Image src="/imgs/ic_add.svg" alt="add icon" width={42} height={42} />
        )}
      </button>
      <div>{isOpen && <p className="pt-[20px]">{answer}</p>}</div>
    </div>
  );
}
