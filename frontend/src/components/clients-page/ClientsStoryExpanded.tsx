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
      className="flex flex-col justify-center items-center gap-5 rounded-[10px] bg-white shadow-[0_4px_10px_rgba(0,0,0,0.25)] w-full max-w-[1147px] mb-8 lg:mb-[50px] mt-5 mx-auto p-6 sm:p-8 lg:p-[50px] cursor-pointer"
    >
      <div className="rounded-[10px] bg-gray-300 w-full">
        <Image
          src={image}
          alt="Client highlight"
          width={1046}
          height={437}
          className="w-full h-auto lg:h-[437px] rounded-[10px] object-cover"
        />
      </div>

      <div className="w-full flex flex-col items-start text-left">
        <p className="text-gray-700 leading-relaxed mb-6">{fullText}</p>
        <button className="text-lg font-semibold text-gray-900 bg-transparent border-none p-0 cursor-pointer hover:text-gray-600 transition-colors duration-200">
          Show Less
        </button>
      </div>
    </div>
  );
};

export default ClientsStoryExpanded;