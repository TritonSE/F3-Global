import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
  //javascript variables will go here
  // -> drop down
  // -> underline under current page
  // -> hovering over shows button
  return (
    <nav className="bg-[#F4F4F4B2] backdrop-blur-[10.85px] flex justify-between items-center w-full px-[30px] pt-[30px] pb-[20px]">
      <div className="flex items-venter gap-4">
        <Link href="/">
          <Image
            src="/imgs/f3logo_nobg.png"
            alt="F3 Global Logo"
            width={55}
            height={55}
            className="flex-shrink-0"
          />
        </Link>
        <span className="text-[#172447] text-[12px] front-[900] leading[110%] tracking-[2.64px] font-['DM-Sans']">
          {/* figure out fonts */}
          <span className="block">FUTURE</span>
          <span className="block">FORWARD</span>
          <span className="block">FOUNDATION</span>
        </span>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-[#172447] hover:opacity-70">
            Home
          </Link>
          <Link href="/about-us" className="text-[#172447] hover:opacity-70">
            About Us
          </Link>
          <Link href="/members" className="text-[#172447] hover:opacity-70">
            Members
          </Link>
        </div>
        <button className="bg-[#172447] text-white px-6 py-2 rounded hover:opacity-90">
          DONATE
        </button>
      </div>
    </nav>
  );
}
