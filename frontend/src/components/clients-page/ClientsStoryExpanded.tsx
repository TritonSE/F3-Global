"use client";

import Image from "next/image";
import React from "react";

type ClientStoryProps = {
  image: string;
  fullText: string;
  onShowLess?: () => void;
};

const ClientsStoryExpanded: React.FC<ClientStoryProps> = ({ image, fullText, onShowLess }) => {
  return (
    <div
      onClick={onShowLess}
      className="mx-auto mb-[50px] mt-5 flex w-full max-w-[1147px] cursor-pointer flex-col items-center justify-center gap-5 rounded-[10px] bg-white px-4 py-6 shadow-[0_4px_10px_rgba(0,0,0,0.25)] sm:px-6 lg:px-[50px] lg:py-[50px]"
    >
      {/* Image Section */}
      <div className="relative h-[240px] w-full overflow-hidden rounded-[10px] bg-gray-300 sm:h-[320px] lg:h-[437px]">
        <Image src={image} alt="Client highlight" fill className="rounded-[10px] object-cover" />
      </div>

      {/* Content Section */}
      <div className="w-full">
        <p className="text-gray-700 leading-relaxed mb-6">{fullText}</p>
        <button className="text-lg font-semibold text-gray-900 bg-transparent border-none p-0 cursor-pointer hover:text-gray-600 transition-colors duration-200">
          Show Less
        </button>
      </div>
    </div>
  );
};

export default ClientsStoryExpanded;
