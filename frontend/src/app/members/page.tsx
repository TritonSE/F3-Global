import Image from "next/image";

import { FaqSection } from "../../components/FaqAccordion";

export default function Members() {
  return (
    <div className="mx-auto flex flex-col justify-center bg-white w-full">
      <p className="text-center text-4xl font-bold mt-10 text-black">Member Page</p>
      <div className="mx-auto flex flex-col justify-center items-center w-full border-t border-[#F4F4F4]">
        <div className="mx-auto flex flex-col items-start w-full pt-[50px] pb-[100px] px-[5vw] gap-[40px]">
          <h1 className="text-[48px] font-medium self-stretch text-[#172447]">
            Who We're Looking For
          </h1>
          <div className="flex flex-row w-full justify-between gap-[50px]">
            <div className="flex flex-col justify-center items-center bg-[#F4F4F4] rounded-[10px] pt-[60px] pb-[30px] py-[20px] flex-1 text-center gap-[20px] mt-[60px] ">
              <Image
                src="/imgs/ic_goal.svg"
                alt="Icon"
                width={120}
                height={120}
                className="mt-[-60px]"
              />
              <h1 className="">Commitment to the Mission</h1>
              <p>Demonstrated interest in and alignment with F3’s values and goals.</p>
            </div>
            <div>
              <Image src="/imgs/ic_time.svg" alt="Icon" width={120} height={120} />
              <h1>Availability & Reliability</h1>
              <p>Ability to commit the required time and participate consistently.</p>
            </div>
            <div>
              <Image src="/imgs/ic_collab.svg" alt="Goal Icon" width={120} height={120} />
              <h1>Respectful Collaboration</h1>
              <p>Willingness to work respectfully with diverse communities and members.</p>
            </div>
          </div>

          <h1 className="text-[48px] font-medium self-stretch text-[#172447]">
            How You Get Involved
          </h1>
        </div>
      </div>
      <FaqSection page="members" />
    </div>
  );
}
