"use client";

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
  return (
    <div className="flex flex-col gap-[10px] flex-1 min-w-0">
      <div className="flex flex-col gap-[10px]">
        <label htmlFor={`question-${id}`} className="font-dm-sans text-[12px] text-[#5D5D5D]">
          Question
        </label>
        <textarea
          id={`question-${id}`}
          value={question}
          onChange={(e) => onChange(id, "question", e.target.value)}
          rows={2}
          className="bg-[#F4F4F4] border border-[#C7C7C7] rounded-[8px] px-[15px] py-[10px] font-dm-sans text-[16px] text-[#5D5D5D] w-full resize-none focus:outline-none focus:border-[#1169B0]"
        />
      </div>
      <div className="flex flex-col gap-[10px]">
        <label htmlFor={`answer-${id}`} className="font-dm-sans text-[12px] text-[#5D5D5D]">
          Answer
        </label>
        <textarea
          id={`answer-${id}`}
          value={answer}
          onChange={(e) => onChange(id, "answer", e.target.value)}
          rows={4}
          className="bg-[#F4F4F4] border border-[#C7C7C7] rounded-[8px] px-[15px] py-[10px] font-dm-sans text-[16px] text-[#5D5D5D] w-full resize-none focus:outline-none focus:border-[#1169B0]"
        />
      </div>
    </div>
  );
}
