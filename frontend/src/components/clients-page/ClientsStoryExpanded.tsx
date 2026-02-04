"use client";

import Image from "next/image";
import React from "react";

type ParagraphData = {
  paragraph: number;
  text: string;
};

type ClientStoryProps = {
  image: string;
  title: string;
  paragraphs: ParagraphData[];
  onShowLess?: () => void;
};

const ClientsStoryExpanded: React.FC<ClientStoryProps> = ({
  image,
  title,
  paragraphs,
  onShowLess,
}) => {
  return (
    <div className="flex flex-col justify-center items-center gap-5 rounded-[10px] bg-white shadow-[0_4px_10px_rgba(0,0,0,0.25)] w-[1147px] mx-auto p-[50px]">
      {/* Image Section */}
      <div className="rounded-[10px] bg-gray-300 w-full">
        <Image
          src={image}
          alt={title}
          width={1046}
          height={437}
          className="w-[1046px] h-[437px] rounded-[10px] object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="w-full">
        <h3 className="text-2xl font-bold mb-4 text-gray-900">{title}</h3>
        <div>
          {paragraphs.map((paragraph, index) => (
            <p
              key={paragraph.paragraph}
              className={`text-gray-700 leading-relaxed mb-6 ${index > 0 ? "mt-5" : ""}`}
            >
              {paragraph.text}
            </p>
          ))}
        </div>
        <button
          onClick={onShowLess}
          className="text-lg font-semibold text-gray-900 bg-transparent border-none p-0 cursor-pointer hover:text-gray-600 transition-colors duration-200"
        >
          Show Less
        </button>
      </div>
    </div>
  );
};

export default ClientsStoryExpanded;
