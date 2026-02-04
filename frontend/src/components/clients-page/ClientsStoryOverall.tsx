"use client";

import React, { useState } from "react";

import ClientsStory from "./ClientsStory";
import ClientsStoryExpanded from "./ClientsStoryExpanded";

type ParagraphData = {
  paragraph: number;
  text: string;
};

type ClientStoryProps = {
  image: string;
  title: string;
  description: string;
  expandedDescription?: ParagraphData[];
  onShowMore?: () => void;
};

const ClientsStoryOverall: React.FC<ClientStoryProps> = ({
  image,
  title,
  description,
  expandedDescription,
  onShowMore,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFading, setIsFading] = useState(false);

  const handleShowMore = () => {
    setIsFading(true);
    setTimeout(() => {
      setIsExpanded(true);
      setIsFading(false);
    }, 300);
    onShowMore?.();
  };

  const handleShowLess = () => {
    setIsFading(true);
    setTimeout(() => {
      setIsExpanded(false);
      setIsFading(false);
    }, 300);
  };

  return (
    <div className={`transition-opacity duration-1000 ${isFading ? "opacity-0" : "opacity-100"}`}>
      {isExpanded ? (
        <ClientsStoryExpanded
          image={image}
          title={title}
          paragraphs={expandedDescription || []}
          onShowLess={handleShowLess}
        />
      ) : (
        <ClientsStory
          image={image}
          title={title}
          description={description}
          onShowMore={handleShowMore}
        />
      )}
    </div>
  );
};

export default ClientsStoryOverall;
