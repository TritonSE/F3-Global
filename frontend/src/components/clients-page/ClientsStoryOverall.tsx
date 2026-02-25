"use client";

import React, { useState } from "react";

import ClientsStory from "./ClientsStory";
import ClientsStoryExpanded from "./ClientsStoryExpanded";

type ClientStoryProps = {
  image: string;
  description: string;
  fullText: string;
};

const ClientsStoryOverall: React.FC<ClientStoryProps> = ({
  image,
  description,
  fullText,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFading, setIsFading] = useState(false);

  const handleShowMore = () => {
    setIsFading(true);
    setTimeout(() => {
      setIsExpanded(true);
      setIsFading(false);
    }, 300);
  };

  const handleShowLess = () => {
    setIsFading(true);
    setTimeout(() => {
      setIsExpanded(false);
      setIsFading(false);
    }, 300);
  };

  return (
    <div className="flex justify-center">
      <div className="mt-50px mb-50px" style={{ width: "1347px" }}>
        <h1 className="text-[48px] font-[500] leading-[150%] tracking-[-0.96px] font-['DM Sans'] text-[var(--F3-Blue,#172447)] mb-40px">
          Real Impact, Real Stories
        </h1>
        <div
          className={`transition-opacity duration-1000 ${isFading ? "opacity-0" : "opacity-100"}`}
        >
          {isExpanded ? (
            <ClientsStoryExpanded
              image={image}
              fullText={fullText}
              onShowLess={handleShowLess}
            />
          ) : (
            <ClientsStory
              image={image}
              description={description}
              onShowMore={handleShowMore}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientsStoryOverall;
