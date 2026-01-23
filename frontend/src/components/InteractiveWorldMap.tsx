"use client";

import {
  ComposableMap,
  createCoordinates,
  Geographies,
  Geography,
} from "@vnedyalk0v/react19-simple-maps";
import React, { useEffect, useMemo, useState } from "react";

import type { Feature, FeatureCollection, Geometry } from "geojson";

export type CountryData = {
  code: string; // ISO 3 letter country code so : "USA" "JPN" "GBR" etc.
  name: string; // just for clarity on country name
  employeeCount: number;
};

type WorldMapProps = {
  data?: CountryData[];
};

type GeoJsonProperties = {
  ISO_A3?: string;
  adm0_a3?: string;
  [key: string]: string | number | undefined;
};

type GeoJsonFeature = Feature<Geometry, GeoJsonProperties> & {
  rsmKey: string;
};

type RotationAngles = [number, number, number] & { __brand: "rotationAngles" };

// highest res 10:1 geo.json causes some lag on my goated machine so opted
// for this 50:1, can go lower yet to `/lowest-res.geo.json` but it looks kinda trash
const GEO_URL = "/medium-res.geo.json";

const COLORS = {
  default: "#CCCCCC",
  lightBlue: "#1169B0",
  darkBlue: "#012060",
  hover: "#A5D0F2",
  border: "#FFFFFF",
};

// Ex input data:
/* 
const countryData: CountryData[] = [
  { code: "USA", name: "United States", employeeCount: 10 },
  { code: "CAN", name: "Canada", employeeCount: 3 },
  { code: "BRA", name: "Brazil", employeeCount: 6 },
  { code: "FRA", name: "France", employeeCount: 2 },
  { code: "DEU", name: "Germany", employeeCount: 8 },
  { code: "CHN", name: "China", employeeCount: 1 },
  { code: "AUS", name: "Australia", employeeCount: 5 },
  { code: "GRC", name: "Greece", employeeCount: 4 },
  { code: "ZAF", name: "South Africa", employeeCount: 7 },
  { code: "IND", name: "India", employeeCount: 12 },
  { code: "JPN", name: "Japan", employeeCount: 3 },
];
*/

// CONTAINS LEGEND & TITLE
export const InteractiveWorldMap: React.FC<WorldMapProps> = ({ data = [] }) => {
  const [geoData, setGeoData] = useState<FeatureCollection | null>(null);

  useEffect(() => {
    fetch(GEO_URL)
      .then(async (res) => {
        if (!res.ok) throw new Error("network response was not ok");
        return res.json() as Promise<FeatureCollection>;
      })
      .then((fetchedData) => setGeoData(fetchedData))
      .catch((err) => console.error("failed to load map data:", err));
  }, []);

  const countryLookup = useMemo(() => {
    const lookup: Record<string, number> = {};
    data.forEach((d) => {
      lookup[d.code] = d.employeeCount;
    });
    return lookup;
  }, [data]);

  const handleCountryClick = (geoId: string) => {
    const count = countryLookup[geoId];
    if (!count) return;

    // constructs id and finds it on page, if it exists, smooth scroll to it
    const sectionId = `members-${geoId}`;
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="w-full bg-white flex flex-col justify-center items-center py-12 px-4 relative">
      <div className="w-full max-w-[1400px] flex flex-col items-start mb-6 px-4">
        <div className="flex flex-col gap-3 mb-6">
          <div className="flex items-center gap-3 ml-8">
            <div
              className="w-8 h-8 rounded-full"
              style={{ backgroundColor: COLORS.darkBlue }}
            ></div>
            <span className="text-[#1E1E1E] text-center font-['DM_Sans'] text-base font-normal leading-6">
              Countries with 5+ F3 Global Team Members
            </span>
          </div>
          <div className="flex items-center gap-3 ml-8">
            <div
              className="w-8 h-8 rounded-full"
              style={{ backgroundColor: COLORS.lightBlue }}
            ></div>
            <span className="text-[#1E1E1E] text-center font-['DM_Sans'] text-base font-normal leading-6">
              Countries with F3 Global Team Members
            </span>
          </div>
        </div>

        <div className="w-full text-center">
          <p className="text-[#5D5D5D] font-['DM_Sans'] text-base italic font-normal leading-6">
            Click a country to meet our team members connected to that region.
          </p>
        </div>
      </div>

      <div className="w-full h-240 min-h-[400px]">
        {geoData ? (
          <ComposableMap
            projection="geoMercator"
            width={980}
            height={450}
            projectionConfig={{
              rotate: [-10, 0, 0] as unknown as RotationAngles,
              scale: 145,
              center: createCoordinates(0, 45),
            }}
            style={{ width: "100%", height: "100%" }}
          >
            <Geographies geography={geoData}>
              {({ geographies }: { geographies: any[] }) =>
                geographies.map((geoItem, i) => {
                  const geo = geoItem as GeoJsonFeature;

                  const uniqueKey = geo.rsmKey || geo.properties?.ISO_A3 || geo.id || `geo-${i}`;

                  const props = geo.properties || {};

                  const rawId = typeof geo.id === "number" ? String(geo.id) : geo.id || "";
                  const curCountryCode = props.ISO_A3 || props.adm0_a3 || rawId; // normalizes the country code

                  const count = countryLookup[curCountryCode] || 0;

                  let fillColor = COLORS.default;
                  let isClickable = false;

                  if (count > 0) {
                    isClickable = true;
                    fillColor = count >= 5 ? COLORS.darkBlue : COLORS.lightBlue;
                  }

                  return (
                    <Geography
                      key={uniqueKey}
                      geography={geo}
                      onClick={() => handleCountryClick(curCountryCode)}
                      style={{
                        default: {
                          fill: fillColor,
                          stroke: COLORS.border,
                          strokeWidth: 0.5,
                          outline: "none",
                          transition: "all 250ms",
                        },
                        hover: {
                          fill: isClickable ? COLORS.hover : fillColor,
                          stroke: COLORS.border,
                          strokeWidth: 0.5,
                          outline: "none",
                          cursor: isClickable ? "pointer" : "default",
                        },
                        pressed: {
                          fill: isClickable ? COLORS.darkBlue : fillColor,
                          stroke: COLORS.border,
                          strokeWidth: 0.5,
                          outline: "none",
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            Loading Map...
          </div>
        )}
      </div>
    </div>
  );
};
