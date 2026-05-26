"use client";

import React, { useState } from "react";

import { ImageDeck } from "./ImageDeck";
import { ServiceAccordian } from "./ServiceAccordian";

export const ServicesSection = () => {
  const [activeID, setActiveID] = useState("Microloans");

  return (
    <section className="w-full bg-white px-[30px] py-[50px] min-[1023px]:px-[100px]">
      <h2 className="m-0 mb-[20px] font-dm-sans text-[28px] font-medium leading-[1.5] tracking-[-0.56px] text-[#172447] min-[1023px]:mb-[80px] min-[1023px]:text-5xl min-[1023px]:tracking-[-0.96px]">
        Services We Offer
      </h2>
      <div className="mx-auto flex max-w-[1400px] flex-col gap-10">
        <div className="flex items-start gap-[50px]">
          <div className="hidden min-w-0 flex-1 min-[1023px]:block">
            <ImageDeck activeID={activeID} />
          </div>
          <ServiceAccordian activeID={activeID} onServiceChange={(id) => setActiveID(id)} />
        </div>
      </div>
    </section>
  );
};
