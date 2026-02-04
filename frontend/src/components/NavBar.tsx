"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";

function NavLinks({
  isActive,
  isDropdownOpen,
  onToggleDropdown,
  buttonRef,
  isBlinking,
}: {
  isActive: (href: string) => boolean;
  isDropdownOpen: boolean;
  onToggleDropdown: () => void;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  isBlinking: boolean;
}) {
  return (
    <>
      <div className="flex items-center gap-[12px] w-[274.5px] flex-shrink-0">
        <Link href="/">
          <Image
            src="/imgs/f3logo_nobg 2.png"
            alt="F3 Global Logo"
            width={55}
            height={55}
            className="flex-shrink-0"
          />
        </Link>
        <span className="text-[#172447] text-[12px] font-[900] leading-[110%] tracking-[2.64px] font-dm">
          <span className="block">FUTURE</span>
          <span className="block">FORWARD</span>
          <span className="block">FOUNDATION</span>
        </span>
      </div>

      <div className="flex items-center gap-8">
        <Link
          href="/"
          className={`flex px-[20px] py-[10px] justify-center items-center gap-[10px] rounded-full text-[#5D5D5D] text-[24px] font-[500] leading-[36px] tracking-[-0.48px] font-dm hover:bg-[#E6E6E6] transition-all duration-300 ease-in-out ${
            isActive("/") ? "bg-[#E6E6E6] text-[#172447]" : ""
          }`}
        >
          Home
        </Link>
        <Link
          href="/about-us"
          className={`flex px-[20px] py-[10px] justify-center items-center gap-[10px] rounded-full text-[#5D5D5D] text-[24px] font-[500] leading-[36px] tracking-[-0.48px] font-dm hover:bg-[#E6E6E6] transition-all duration-300 ease-in-out ${
            isActive("/about-us") ? "bg-[#E6E6E6] text-[#172447]" : ""
          }`}
        >
          About Us
        </Link>
        <Link
          href="/meet-the-team"
          className={`flex px-[20px] py-[10px] justify-center items-center gap-[10px] rounded-full text-[#5D5D5D] text-[24px] font-[500] leading-[36px] tracking-[-0.48px] font-dm hover:bg-[#E6E6E6] transition-all duration-300 ease-in-out ${
            isActive("/meet-the-team") ? "bg-[#E6E6E6] text-[#172447]" : ""
          }`}
        >
          Meet the Team
        </Link>

        <button
          ref={buttonRef}
          onClick={onToggleDropdown}
          className="get-involved-btn flex items-center gap-[10px] px-[20px] py-[10px] text-[24px] font-[500] leading-[36px] tracking-[-0.48px] font-dm rounded-full hover:bg-[#E6E6E6] transition-all duration-300 ease-in-out"
          style={{
            color: isBlinking ? "rgba(244, 244, 244, 0.70)" : "#5D5D5D",
          }}
        >
          Get Involved
          {isDropdownOpen ? (
            <Image src="/imgs/ic_arrowup.svg" alt="Upward Arrow" width={24} height={24} />
          ) : (
            <Image src="/imgs/ic_arrowdown.svg" alt="Downward Arrow" width={24} height={24} />
          )}
        </button>

        <Link
          href=""
          className={`flex px-[20px] py-[10px] justify-center items-center gap-[10px] rounded-full text-[#5D5D5D] text-[24px] font-[500] leading-[36px] tracking-[-0.48px] font-dm hover:bg-[#E6E6E6] transition-all duration-300 ease-in-out ${
            isActive("") ? "bg-[#E6E6E6] text-[#172447]" : ""
          }`}
        >
          Newsletter
        </Link>

        <Link
          href="https://www.zeffy.com/en-US/donation-form/donate-to-make-a-difference-7390"
          target="_blank"
          rel="noopener noreferrer"
          className="flex px-[20px] py-[10px] justify-center items-center gap-[10px] rounded-full border border-[#C7C7C7] bg-[#FFF] text-[#172447] text-[24px] font-[600] leading-[36px] font-dm hover:bg-[#172447] hover:border-[#172447] hover:text-[#FFF] transition-all duration-300 ease-in-out group"
        >
          DONATE
          <Image
            src="/imgs/ic_arrowforward_blue.svg"
            alt="Redirect Arrow"
            width={36}
            height={36}
            className="group-hover:hidden"
          />
          <Image
            src="/imgs/ic_arrowforward_white.svg"
            alt="Redirect Arrow"
            width={36}
            height={36}
            className="hidden group-hover:block"
          />
        </Link>
      </div>
    </>
  );
}

function DropdownContent() {
  return (
    <div className="px-[30px] py-[30px]">
      <div className="flex justify-center gap-[50px]">
        <Link
          href="/donors"
          className="group flex w-[400px] h-[411px] flex-col items-start pt-[32px] pb-[20px] gap-[30px] rounded-[10px] border-2 border-[#C7C7C7] bg-white hover:bg-[#172447] hover:border-[#172447] transition-all duration-300 ease-in-out"
        >
          <div className="flex flex-col items-start gap-[12px] self-stretch">
            <h3 className="px-[29px] text-[24px] font-dm font-[500] leading-[36px] tracking-[-0.48px] text-[#1E1E1E] group-hover:text-white transition-all duration-300 ease-in-out">
              Donors
            </h3>
            <p className="px-[29px] text-[16px] font-dm font-[400] leading-[24px] text-[#1E1E1E] group-hover:text-white transition-all duration-300 ease-in-out">
              Support F3 Global by donating to our cause! Your contributions empower underserved
              communities and provide vital resources for aspiring entrepreneurs.
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-[20px] flex-1 self-stretch">
            <div className="flex flex-1 self-stretch px-[29px]">
              <div className="relative w-full h-full overflow-hidden rounded-[8px]">
                <Image src="/imgs/donors_image.png" alt="Donors" fill className="object-cover" />
              </div>
            </div>
            <div className="px-[29px] self-stretch">
              <div className="relative h-[12px] w-[344px]">
                <svg
                  width="34"
                  height="12"
                  viewBox="0 0 34 12"
                  className="absolute left-0 top-0 text-[#1E1E1E] group-hover:opacity-0 transition-all duration-300 ease-in-out"
                  fill="currentColor"
                >
                  <path d="M33.7054 6.70711C34.0959 6.31658 34.0959 5.68342 33.7054 5.29289L28.7057 0.292893C28.3152 -0.097631 27.682 -0.097631 27.2915 0.292893C26.901 0.683417 26.901 1.31658 27.2915 1.70711L30.5843 5H0.99995C0.447692 5 0 5.44772 0 6C0 6.55228 0.447692 7 0.99995 7H30.5843L27.2915 10.2929C26.901 10.6834 26.901 11.3166 27.2915 11.7071C27.682 12.0976 28.3152 12.0976 28.7057 11.7071L33.7054 6.70711Z" />
                </svg>
                <svg
                  width="344"
                  height="12"
                  viewBox="0 0 344 12"
                  className="absolute left-0 top-0 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out"
                  fill="currentColor"
                >
                  <path d="M343.705 6.70711C344.096 6.31658 344.096 5.68342 343.705 5.29289L338.705 0.292893C338.315 -0.097631 337.681 -0.097631 337.291 0.292893C336.9 0.683417 336.9 1.31658 337.291 1.70711L340.584 5H0.999994C0.447712 5 0 5.44772 0 6C0 6.55228 0.447712 7 0.999994 7H340.584L337.291 10.2929C336.9 10.6834 336.9 11.3166 337.291 11.7071C337.681 12.0976 338.315 12.0976 338.705 11.7071L343.705 6.70711Z" />
                </svg>
              </div>
            </div>
          </div>
        </Link>

        <Link
          href="/members"
          className="group flex w-[400px] h-[411px] flex-col items-start pt-[32px] pb-[20px] gap-[30px] rounded-[10px] border-2 border-[#C7C7C7] bg-white hover:bg-[#172447] hover:border-[#172447] transition-all duration-300 ease-in-out"
        >
          <div className="flex flex-col items-start gap-[12px] self-stretch">
            <h3 className="px-[29px] text-[24px] font-dm font-[500] leading-[36px] tracking-[-0.48px] text-[#1E1E1E] group-hover:text-white transition-all duration-300 ease-in-out">
              Members
            </h3>
            <p className="px-[29px] text-[16px] font-dm font-[400] leading-[24px] text-[#1E1E1E] group-hover:text-white transition-all duration-300 ease-in-out">
              Join F3 Global as a volunteer and help make an impact in underserved communities
              through outreach, fundraising, and business support for aspiring entrepreneurs.
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-[20px] flex-1 self-stretch">
            <div className="flex flex-1 self-stretch px-[29px]">
              <div className="relative w-full h-full overflow-hidden rounded-[8px]">
                <Image src="/imgs/members.png" alt="Members" fill className="object-cover" />
              </div>
            </div>
            <div className="px-[29px] self-stretch">
              <div className="relative h-[12px] w-[344px]">
                <svg
                  width="34"
                  height="12"
                  viewBox="0 0 34 12"
                  className="absolute left-0 top-0 text-[#1E1E1E] group-hover:opacity-0 transition-all duration-300 ease-in-out"
                  fill="currentColor"
                >
                  <path d="M33.7054 6.70711C34.0959 6.31658 34.0959 5.68342 33.7054 5.29289L28.7057 0.292893C28.3152 -0.097631 27.682 -0.097631 27.2915 0.292893C26.901 0.683417 26.901 1.31658 27.2915 1.70711L30.5843 5H0.99995C0.447692 5 0 5.44772 0 6C0 6.55228 0.447692 7 0.99995 7H30.5843L27.2915 10.2929C26.901 10.6834 26.901 11.3166 27.2915 11.7071C27.682 12.0976 28.3152 12.0976 28.7057 11.7071L33.7054 6.70711Z" />
                </svg>
                <svg
                  width="344"
                  height="12"
                  viewBox="0 0 344 12"
                  className="absolute left-0 top-0 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out"
                  fill="currentColor"
                >
                  <path d="M343.705 6.70711C344.096 6.31658 344.096 5.68342 343.705 5.29289L338.705 0.292893C338.315 -0.097631 337.681 -0.097631 337.291 0.292893C336.9 0.683417 336.9 1.31658 337.291 1.70711L340.584 5H0.999994C0.447712 5 0 5.44772 0 6C0 6.55228 0.447712 7 0.999994 7H340.584L337.291 10.2929C336.9 10.6834 336.9 11.3166 337.291 11.7071C337.681 12.0976 338.315 12.0976 338.705 11.7071L343.705 6.70711Z" />
                </svg>
              </div>
            </div>
          </div>
        </Link>

        <Link
          href="/clients"
          className="group flex w-[400px] h-[411px] flex-col items-start pt-[32px] pb-[20px] gap-[30px] rounded-[10px] border-2 border-[#C7C7C7] bg-white hover:bg-[#172447] hover:border-[#172447] transition-all duration-300 ease-in-out"
        >
          <div className="flex flex-col items-start gap-[12px] self-stretch">
            <h3 className="px-[29px] text-[24px] font-dm font-[500] leading-[36px] tracking-[-0.48px] text-[#1E1E1E] group-hover:text-white transition-all duration-300 ease-in-out">
              Clients
            </h3>
            <p className="px-[29px] text-[16px] font-dm font-[400] leading-[24px] text-[#1E1E1E] group-hover:text-white transition-all duration-300 ease-in-out">
              Partner with F3 Global, providing microloans, guidance, and resources designed to
              support small business owners and entrepreneurs on their path to long-term success.
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-[20px] flex-1 self-stretch">
            <div className="flex flex-1 self-stretch px-[29px]">
              <div className="relative w-full h-full overflow-hidden rounded-[8px]">
                <Image src="/imgs/clients.jpg" alt="Clients" fill className="object-cover" />
              </div>
            </div>
            <div className="px-[29px] self-stretch">
              <div className="relative h-[12px] w-[344px]">
                <svg
                  width="34"
                  height="12"
                  viewBox="0 0 34 12"
                  className="absolute left-0 top-0 text-[#1E1E1E] group-hover:opacity-0 transition-all duration-300 ease-in-out"
                  fill="currentColor"
                >
                  <path d="M33.7054 6.70711C34.0959 6.31658 34.0959 5.68342 33.7054 5.29289L28.7057 0.292893C28.3152 -0.097631 27.682 -0.097631 27.2915 0.292893C26.901 0.683417 26.901 1.31658 27.2915 1.70711L30.5843 5H0.99995C0.447692 5 0 5.44772 0 6C0 6.55228 0.447692 7 0.99995 7H30.5843L27.2915 10.2929C26.901 10.6834 26.901 11.3166 27.2915 11.7071C27.682 12.0976 28.3152 12.0976 28.7057 11.7071L33.7054 6.70711Z" />
                </svg>
                <svg
                  width="344"
                  height="12"
                  viewBox="0 0 344 12"
                  className="absolute left-0 top-0 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out"
                  fill="currentColor"
                >
                  <path d="M343.705 6.70711C344.096 6.31658 344.096 5.68342 343.705 5.29289L338.705 0.292893C338.315 -0.097631 337.681 -0.097631 337.291 0.292893C336.9 0.683417 336.9 1.31658 337.291 1.70711L340.584 5H0.999994C0.447712 5 0 5.44772 0 6C0 6.55228 0.447712 7 0.999994 7H340.584L337.291 10.2929C336.9 10.6834 336.9 11.3166 337.291 11.7071C337.681 12.0976 338.315 12.0976 338.705 11.7071L343.705 6.70711Z" />
                </svg>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default function NavBar() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleToggleDropdown = () => {
    if (isDropdownOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsDropdownOpen(false);
        setIsClosing(false);
      }, 250);
    } else {
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false);
      }, 80);
      setIsDropdownOpen(true);
    }
  };

  if (!isDropdownOpen) {
    return (
      <nav className="sticky top-0 z-50 w-full px-[30px] py-[20px] font-dm flex justify-between items-center bg-[rgba(244,244,244,0.70)] backdrop-blur-[10.85px]">
        <NavLinks
          isActive={isActive}
          isDropdownOpen={isDropdownOpen}
          onToggleDropdown={handleToggleDropdown}
          buttonRef={buttonRef}
          isBlinking={isBlinking}
        />
      </nav>
    );
  }

  return (
    <>
      <div className="h-[95px] w-full" />

      <div className="fixed top-0 left-0 right-0 z-50 w-full font-dm bg-[rgba(244,244,244,0.70)] backdrop-blur-[10.85px] shadow-[0_301px_84px_0_rgba(0,0,0,0.00),0_12px_26px_0_rgba(0,0,0,0.10)]">
        <nav className="px-[30px] py-[20px] flex justify-between items-center">
          <NavLinks
            isActive={isActive}
            isDropdownOpen={isDropdownOpen}
            onToggleDropdown={handleToggleDropdown}
            buttonRef={buttonRef}
            isBlinking={isBlinking}
          />
        </nav>

        <div
          className="origin-top"
          style={{
            animation: isClosing
              ? "slideUp 0.25s cubic-bezier(0.4, 0, 0.2, 1) forwards"
              : "slideDown 0.35s cubic-bezier(0.0, 0, 0.2, 1) forwards",
          }}
        >
          <DropdownContent />
        </div>

        <style jsx global>{`
          @keyframes slideDown {
            0% {
              opacity: 0;
              transform: translateY(-15px);
            }
            60% {
              opacity: 1;
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideUp {
            0% {
              opacity: 1;
              transform: translateY(0);
            }
            40% {
              opacity: 0.5;
            }
            100% {
              opacity: 0;
              transform: translateY(-15px);
            }
          }
        `}</style>
      </div>
    </>
  );
}
