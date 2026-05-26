"use client";

import Image from "next/image";
import React from "react";

type ClientStoryProps = {
  image: string;
  description: string;
  onShowMore?: () => void;
};

const ClientsStory: React.FC<ClientStoryProps> = ({ image, description, onShowMore }) => {
  return (
    <div
      onClick={onShowMore}
      className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-[50px] p-6 sm:p-8 lg:p-[50px] rounded-[10px] bg-white shadow-[0_4px_10px_rgba(0,0,0,0.25)] w-full max-w-[1147px] mb-8 lg:mb-[50px] mt-5 mx-auto cursor-pointer"
    >
      <div className="relative w-full lg:w-[546px] lg:flex-shrink-0 aspect-video h-auto lg:h-[338px]">
        <Image src={image} alt="Client highlight" fill className="object-cover rounded-[10px]" />
      </div>
      <div className="flex-1 flex flex-col items-start text-left">
        <p className="text-gray-700 leading-relaxed mb-6 line-clamp-3 sm:line-clamp-4 lg:line-clamp-none">
          {description}
        </p>
        <button className="text-lg font-semibold text-gray-900 bg-transparent border-none p-0 cursor-pointer hover:text-gray-600 transition-colors duration-200">
          Show More
        </button>
      </div>
    </div>
  );
};

export default ClientsStory;
