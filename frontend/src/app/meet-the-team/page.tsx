import type { CountryData } from "@/components/InteractiveWorldMap";

import { InteractiveWorldMap } from "@/components/InteractiveWorldMap";

export default function MeetTheTeam() {
  const countryData: CountryData[] = [
    { code: "USA", name: "United States", employeeCount: 6 },
    { code: "CAN", name: "Canada", employeeCount: 4 },
    { code: "AUS", name: "Australia", employeeCount: 2 },
    { code: "ESP", name: "Spain", employeeCount: 2 },
    { code: "ITA", name: "Italy", employeeCount: 2 },
    { code: "CHN", name: "China", employeeCount: 2 },
    { code: "IND", name: "India", employeeCount: 2 },
  ];
  return (
    <div className="mx-auto flex flex-col justify-center bg-white w-full">
      <p className="text-center text-4xl font-bold mt-10 text-black">Meet The Team Test</p>
      <InteractiveWorldMap data={countryData} />
    </div>
  );
}
