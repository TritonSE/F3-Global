import type { CountryData } from "@/components/InteractiveWorldMap";

import { InteractiveWorldMap } from "@/components/InteractiveWorldMap";

export default function MeetTheTeam() {
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
  return (
    <div className="mx-auto flex flex-col justify-center bg-white w-full">
      <p className="text-center text-4xl font-bold mt-10 text-black">Meet The Team Test</p>
      <InteractiveWorldMap data={countryData} />
      <div className="w-full max-w-5xl px-4 py-12 space-y-24">
        {countryData.map((country) => (
          <section
            key={country.code}
            id={`members-${country.code}`}
            className="scroll-mt-24 p-6 bg-gray-50"
          >
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">{country.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: country.employeeCount }).map((_, i) => (
                <div key={i} className="bg-white p-4 rounded  flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-200 flex-shrink-0"></div>
                  <div>
                    <p className="font-semibold">Team Member {i + 1}</p>
                    <p className="text-sm text-gray-500">Software Engineer</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
