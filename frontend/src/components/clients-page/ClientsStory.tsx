"use client";

import React from "react";

type ClientStoryProps = {
  image: string;
  title: string;
  description: string;
  onShowMore?: () => void;
};

const ClientsStory: React.FC<ClientStoryProps> = ({ image, title, description, onShowMore }) => {
  return (
    <div className="flex justify-center items-center gap-[50px] p-[50px] rounded-[10px] bg-white shadow-[0_4px_10px_rgba(0,0,0,0.25)] w-[1147px] mb-[50px] mt-5 mx-auto">
      {/* Image Section */}
      <div className="flex-shrink-0 w-[546px]">
        <img src={image} alt={title} className="w-full h-auto rounded-[10px] object-cover" />
      </div>

      {/* Content Section */}
      <div className="flex-1">
        <h3 className="text-2xl font-bold mb-4 text-gray-900">{title}</h3>
        <p className="text-gray-700 leading-relaxed mb-6">{description}</p>

        <button
          onClick={onShowMore}
          className="text-lg font-semibold text-gray-900 bg-transparent border-none p-0 cursor-pointer hover:text-gray-600 transition-colors duration-200"
        >
          Show More
        </button>
      </div>
    </div>
  );
};

export default ClientsStory;
