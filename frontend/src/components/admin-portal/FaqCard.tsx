"use client";

import { useEffect, useRef } from "react";

function useAutoResize(value: string) {
  const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);
  return ref;
}

export function FaqCard({
  id,
  question,
  answer,
  onChange,
}: {
  id: string;
  question: string;
  answer: string;
  onChange: (id: string, field: "question" | "answer", value: string) => void;
}) {
  const questionRef = useAutoResize(question);
  const answerRef = useAutoResize(answer);

  return (
    <div className="flex flex-col gap-[10px] flex-1 min-w-0">
      <div className="flex flex-col gap-[10px]">
        <label htmlFor={`question-${id}`} className="font-dm-sans text-[12px] text-[#5D5D5D]">
          Question
        </label>
        <textarea
          ref={questionRef}
          id={`question-${id}`}
          value={question}
          onChange={(e) => onChange(id, "question", e.target.value)}
          className="bg-[#F4F4F4] border border-[#C7C7C7] rounded-[8px] px-[15px] py-[10px] font-dm-sans text-[16px] text-[#5D5D5D] w-full resize-none overflow-hidden focus:outline-none focus:border-[#1169B0]"
        />
      </div>
      <div className="flex flex-col gap-[10px]">
        <label htmlFor={`answer-${id}`} className="font-dm-sans text-[12px] text-[#5D5D5D]">
          Answer
        </label>
        <textarea
          ref={answerRef}
          id={`answer-${id}`}
          value={answer}
          onChange={(e) => onChange(id, "answer", e.target.value)}
          className="bg-[#F4F4F4] border border-[#C7C7C7] rounded-[8px] px-[15px] py-[10px] font-dm-sans text-[16px] text-[#5D5D5D] w-full resize-none overflow-hidden focus:outline-none focus:border-[#1169B0]"
        />
      </div>
    </div>
  );
}
