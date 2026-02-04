"use client";
import Image from "next/image";
import { useRef, useState } from "react";

export default function FaqAccordion({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);
  return (
    <div className="flex w-full flex-col">
      <button
        className="flex justify-between w-full items-center cursor-pointer aria-expanded={isOpen}"
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
        <div className="relative h-[42px] w-[42px]">
          <Image
            src="/imgs/remove.svg"
            alt="remove icon"
            width={42}
            height={42}
            className={`absolute inset-0 transition-opacity duration-200 ease-out ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          />
          <Image
            src="/imgs/ic_add.svg"
            alt="add icon"
            width={42}
            height={42}
            className={`absolute inset-0 transition-opacity duration-200 ease-out ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
        </div>
      </button>
      <div
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0px",
        }}
        className="overflow-hidden transition-[max-height] duration-200 ease-out"
      >
        <div ref={contentRef}>
          <p className="pt-[20px]">{answer}</p>
        </div>
      </div>
    </div>
  );
}
