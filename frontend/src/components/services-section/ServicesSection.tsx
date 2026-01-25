"use client";

import React, { useState } from "react";

import { ImageDeck } from "./ImageDeck";
import { ServiceAccordian } from "./ServiceAccordian";

export const ServicesSection = () => {
  const [activeID, setActiveID] = useState("Microloans");

  return (
    <section className="w-full py-20 px-[100px] bg-white lg:py-[60px] lg:px-10">
      <div className="flex flex-col gap-10 max-w-[1400px] mx-auto lg:gap-[30px]">
        <h2 className="text-[#172447] font-dm-sans text-5xl font-medium tracking-[-0.96px] leading-[1.5] m-0">
          Services We Offer
        </h2>
        <div className="flex flex-col gap-[60px] lg:flex-row lg:justify-between lg:items-start lg:gap-[50px]">
          <ImageDeck activeID={activeID} />
          <ServiceAccordian activeID={activeID} onServiceChange={(id) => setActiveID(id)} />
        </div>
      </div>
    </section>
  );
};
