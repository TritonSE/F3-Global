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
      className="mx-auto flex w-full max-w-[1147px] cursor-pointer flex-col items-stretch gap-6 rounded-[10px] bg-white px-4 py-6 shadow-[0_4px_10px_rgba(0,0,0,0.25)] sm:px-6 lg:flex-row lg:gap-[50px] lg:px-[50px] lg:py-[50px]"
    >
      {/* Image Section */}
      <div className="relative h-[220px] w-full flex-shrink-0 overflow-hidden rounded-[10px] sm:h-[280px] lg:h-[338px] lg:w-[546px]">
        <Image src={image} alt="Client highlight" fill className="rounded-[10px] object-cover" />
      </div>

      {/* Content Section */}
      <div className="flex-1">
        <p className="text-gray-700 leading-relaxed mb-6">{description}</p>

        <button className="text-lg font-semibold text-gray-900 bg-transparent border-none p-0 cursor-pointer hover:text-gray-600 transition-colors duration-200">
          Show More
        </button>
      </div>
    </div>
  );
};

export default ClientsStory;
