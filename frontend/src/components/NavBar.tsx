"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function NavLinks({
  isActive,
  isDropdownOpen,
  isClosing,
  onToggleDropdown,
  onLogoClick,
  buttonRef,
  //isBlinking,
}: {
  isActive: (href: string) => boolean;
  isDropdownOpen: boolean;
  isClosing: boolean;
  onToggleDropdown: () => void;
  onLogoClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  //isBlinking: boolean;
}) {
  return (
    <>
      <div className="hidden md:flex w-full max-w-[1512px] mx-auto justify-between items-center px-[30px] py-[20px] min-[1115px]:pt-[30px] min-[1115px]:pb-[20px] leading-none gap-[20px] min-[1115px]:gap-0">
        <div className="flex items-center min-[1115px]:min-w-[190px] h-[55px] flex-shrink-0">
          <Link
            href="/"
            onClick={onLogoClick}
            className="flex items-center min-[1115px]:gap-[12px] gap-0 h-[55px] cursor-pointer"
          >
            <div className="flex h-[55px] w-[55px] flex-shrink-0 items-center justify-center">
              <Image
                src="/imgs/f3-logo.svg"
                alt="F3 Global Logo"
                width={55}
                height={55}
                className="block w-[55px] h-[55px] object-contain"
              />
            </div>
            <div className="flex flex-col justify-center items-center h-full hidden min-[1115px]:flex">
              <span className="text-[#172447] text-[12px] font-[900] leading-[110%] tracking-[2.64px] font-dm">
                <span className="block">FUTURE</span>
                <span className="block">FORWARD</span>
                <span className="block">FOUNDATION</span>
              </span>
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-0 min-[1115px]:gap-[10px] flex-nowrap">
          <Link
            href="/"
            className={`flex px-[10px] py-[8px] min-[1115px]:px-[15px] min-[1115px]:py-[10px] justify-center items-center gap-[10px] rounded-full text-[#5D5D5D] text-[16px] min-[1115px]:text-[20px] font-normal leading-[24px] min-[1115px]:leading-[32px] font-dm hover:bg-[#E6E6E6] transition-all duration-300 ease-in-out cursor-pointer whitespace-nowrap ${
              isActive("/") ? "bg-[#E6E6E6] text-[#172447]" : ""
            }`}
          >
            Home
          </Link>
          <Link
            href="/about-us"
            className={`flex px-[10px] py-[8px] min-[1115px]:px-[15px] min-[1115px]:py-[10px] justify-center items-center gap-[10px] rounded-full text-[#5D5D5D] text-[16px] min-[1115px]:text-[20px] font-normal leading-[24px] min-[1115px]:leading-[32px] font-dm hover:bg-[#E6E6E6] transition-all duration-300 ease-in-out cursor-pointer whitespace-nowrap ${
              isActive("/about-us") ? "bg-[#E6E6E6] text-[#172447]" : ""
            }`}
          >
            <span className="min-[1115px]:hidden">About</span>
            <span className="hidden min-[1115px]:inline">About Us</span>
          </Link>
          <Link
            href="/meet-the-team"
            className={`flex px-[10px] py-[8px] min-[1115px]:px-[15px] min-[1115px]:py-[10px] justify-center items-center gap-[10px] rounded-full text-[#5D5D5D] text-[16px] min-[1115px]:text-[20px] font-normal leading-[24px] min-[1115px]:leading-[32px] font-dm hover:bg-[#E6E6E6] transition-all duration-300 ease-in-out cursor-pointer whitespace-nowrap ${
              isActive("/meet-the-team") ? "bg-[#E6E6E6] text-[#172447]" : ""
            }`}
          >
            <span className="min-[1115px]:hidden">Team</span>
            <span className="hidden min-[1115px]:inline">Meet the Team</span>
          </Link>

          <button
            ref={buttonRef}
            onClick={onToggleDropdown}
            className={`get-involved-btn flex w-auto items-center gap-[5px] px-[10px] py-[8px] min-[1115px]:px-[15px] min-[1115px]:py-[10px] text-[16px] min-[1115px]:text-[20px] font-normal text-[#5D5D5D] leading-[24px] min-[1115px]:leading-[32px] font-dm rounded-full hover:bg-[#E6E6E6] transition-all duration-300 ease-in-out cursor-pointer whitespace-nowrap flex-shrink-0 ${
              isDropdownOpen ||
              isClosing ||
              isActive("/donors") ||
              isActive("/members") ||
              isActive("/clients")
                ? "bg-[#E6E6E6] text-[#172447]"
                : ""
            }`}
            // style={{
            //   color:
            //     isBlinking && !(isActive("/donors") || isActive("/members") || isActive("/clients"))
            //       ? "rgba(244, 244, 244, 0.70)"
            //       : "#5D5D5D",
            // }}
          >
            <span className="min-[1115px]:hidden">Involvement</span>
            <span className="hidden min-[1115px]:inline">Get Involved</span>
            <Image
              src="/imgs/ic_arrowdown.svg"
              alt="Dropdown Arrow"
              width={16}
              height={16}
              className={`transition-transform duration-300 ease-in-out min-[1115px]:w-[24px] min-[1115px]:h-[24px] w-[16px] h-[16px] ${
                isClosing ? "spin-180-right" : isDropdownOpen ? "spin-180-left" : "rotate-0"
              }`}
            />
          </button>

          <Link
            href="/newsletters"
            className={`flex px-[10px] py-[8px] min-[1115px]:px-[15px] min-[1115px]:py-[10px] justify-center items-center gap-[10px] rounded-full text-[#5D5D5D] text-[16px] min-[1115px]:text-[20px] font-normal leading-[24px] min-[1115px]:leading-[32px] font-dm hover:bg-[#E6E6E6] transition-all duration-300 ease-in-out cursor-pointer whitespace-nowrap ${
              isActive("/newsletters") ? "bg-[#E6E6E6] text-[#172447]" : ""
            }`}
          >
            <span className="min-[1115px]:hidden">News</span>
            <span className="hidden min-[1115px]:inline">Newsletter</span>
          </Link>

          <Link
            href="https://www.zeffy.com/en-US/donation-form/donate-to-make-a-difference-7390"
            target="_blank"
            rel="noopener noreferrer"
            className="flex ml-[20px] min-[1115px]:ml-0 px-[20px] py-[10px] justify-center items-center gap-[5px] min-[1115px]:gap-[10px] rounded-full border border-[#C7C7C7] bg-[#FFF] text-[#012060] text-[16px] min-[1115px]:text-[20px] font-semibold leading-[24px] min-[1115px]:leading-[30px] font-dm hover:bg-[#172447] hover:border-[#172447] hover:text-[#FFF] transition-all duration-300 ease-in-out group cursor-pointer whitespace-nowrap flex-shrink-0"
          >
            DONATE
            <div className="w-[24px] h-[24px] min-[1115px]:w-[36px] min-[1115px]:h-[36px] flex items-center justify-center flex-shrink-0">
              <Image
                src="/imgs/ic_arrowforward_blue.svg"
                alt="Redirect Arrow"
                width={24}
                height={24}
                className="group-hover:hidden w-full h-full"
              />
              <Image
                src="/imgs/ic_arrowforward_white.svg"
                alt="Redirect Arrow"
                width={24}
                height={24}
                className="hidden group-hover:block w-full h-full"
              />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

function DropdownCard({
  href,
  title,
  description,
  imageSrc,
  imageAlt,
}: {
  href: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}) {
  return (
    <Link
      href={href}
      className="group flex w-[226px] h-[268px] min-[1115px]:w-[400px] min-[1115px]:h-[411px] flex-col items-stretch pt-[32px] pb-[25px] gap-[15px] min-[1115px]:gap-[35px] min-[1115px]:gap-[30px] rounded-[10px] border-2 border-[#C7C7C7] bg-white hover:bg-[#172447] hover:border-[#172447] transition-all duration-300 ease-in-out"
    >
      <div className="flex flex-col items-start gap-[12px] self-stretch">
        <h3 className="px-[19px] min-[1115px]:px-[29px] text-[18px] min-[1115px]:text-[24px] font-dm font-[500] leading-[27px] min-[1115px]:leading-[36px] tracking-[-0.36px] min-[1115px]:tracking-[-0.48px] text-[#1E1E1E] group-hover:text-white transition-all duration-300 ease-in-out">
          {title}
        </h3>
        <p className="px-[19px] min-[1115px]:px-[29px] text-[14px] min-[1115px]:text-[16px] font-dm font-[400] leading-[20px] min-[1115px]:leading-[24px] text-[#1E1E1E] group-hover:text-white transition-all duration-300 ease-in-out">
          {description}
        </p>
      </div>
      <div className="flex flex-col justify-end items-center gap-[20px] flex-1 self-stretch">
        <div className="flex flex-1 self-stretch px-[20px] min-[1115px]:px-[29px] hidden min-[1115px]:flex">
          <div className="relative w-full h-full overflow-hidden rounded-[8px]">
            <Image src={imageSrc} alt={imageAlt} fill className="object-cover" />
          </div>
        </div>
        <div className="px-[19px] min-[1115px]:px-[29px] self-stretch">
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
  );
}

function MobileNavBar({
  isActive,
  isOpen,
  onToggle,
  onLinkClick,
  containerRef,
}: {
  isActive: (href: string) => boolean;
  isOpen: boolean;
  onToggle: () => void;
  onLinkClick: () => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const mobileLinks: { href: string; label: string }[] = [
    { href: "/", label: "Home" },
    { href: "/about-us", label: "About Us" },
    { href: "/meet-the-team", label: "Meet The Team" },
    { href: "/donors", label: "Donors" },
    { href: "/members", label: "Members" },
    { href: "/clients", label: "Clients" },
    { href: "/newsletters", label: "Newsletters" },
  ];

  return (
    <div
      ref={containerRef}
      className="md:hidden flex flex-col w-full px-[30px] py-[15px] box-border"
    >
      <div className="flex items-center justify-between w-full">
        <Link
          href="/"
          onClick={onLinkClick}
          className="relative z-10 flex items-center h-[30px] w-[30px] flex-shrink-0"
          aria-label="F3 Global home"
        >
          <Image
            src="/imgs/f3-logo.svg"
            alt="F3 Global Logo"
            width={30}
            height={30}
            className="block w-[30px] h-[30px] object-contain"
          />
        </Link>

        <button
          type="button"
          onClick={onToggle}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          className="relative z-10 flex items-center justify-center w-[30px] h-[30px] text-[#172447] cursor-pointer"
        >
          <span
            className="absolute inset-0 flex items-center justify-center"
            style={{
              opacity: isOpen ? 0 : 1,
              transition: "opacity 0.3s linear",
            }}
            aria-hidden="true"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 5.5H17M3 10H17M3 14.5H17"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span
            className="absolute inset-0 flex items-center justify-center"
            style={{
              opacity: isOpen ? 1 : 0,
              transition: "opacity 0.3s linear",
            }}
            aria-hidden="true"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.5 4.5L15.5 15.5M15.5 4.5L4.5 15.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </button>
      </div>

      <div
        className="w-full"
        style={{
          transform: "translateY(-30px)",
          marginBottom: isOpen ? "-30px" : "0px",
          transition: "margin-bottom 0.3s cubic-bezier(0.45, 0, 0.55, 1)",
        }}
      >
        <div
          className="grid w-full"
          style={{
            gridTemplateRows: isOpen ? "1fr" : "0fr",
            transition: "grid-template-rows 0.3s cubic-bezier(0.45, 0, 0.55, 1)",
          }}
          aria-hidden={!isOpen}
        >
          <div className="overflow-hidden">
            <div
              className="flex flex-col gap-[15px] items-end w-full"
              style={{
                opacity: isOpen ? 1 : 0,
                transition: "opacity 0.2s linear",
              }}
            >
              <div className="flex flex-col gap-[10px] items-center w-full">
                <p className="text-[10px] font-[700] leading-[1.5] text-[#C7C7C7] text-center font-dm">
                  PAGES
                </p>
                {mobileLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={onLinkClick}
                    tabIndex={isOpen ? 0 : -1}
                    className={`text-[14px] leading-[20px] font-[400] font-dm text-center ${
                      isActive(href) ? "text-[#172447] font-[600]" : "text-black"
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </div>

              <Link
                href="https://www.zeffy.com/en-US/donation-form/donate-to-make-a-difference-7390"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onLinkClick}
                tabIndex={isOpen ? 0 : -1}
                className="flex items-center justify-center gap-[10px] w-full px-[20px] py-[7px] rounded-full bg-[#172447] border border-[#172447] text-white text-[14px] font-[600] leading-[1.5] font-dm"
              >
                DONATE
                <Image
                  src="/imgs/ic_arrowforward_white.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="w-[20px] h-[20px]"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DropdownContent() {
  return (
    <div className="px-[30px] py-[30px] max-w-[1512px] mx-auto">
      <div className="flex justify-center gap-[10] min-[1115px]:gap-[50px]">
        <DropdownCard
          href="/donors"
          title="Donors"
          description="Support F3 Global by donating to our cause! Your contributions empower underserved communities and provide vital resources for aspiring entrepreneurs."
          imageSrc="/imgs/donors_image.png"
          imageAlt="Donors"
        />
        <DropdownCard
          href="/members"
          title="Members"
          description="Join F3 Global as a volunteer and help make an impact in underserved communities through outreach, fundraising, and business support for aspiring entrepreneurs."
          imageSrc="/imgs/members.png"
          imageAlt="Members"
        />
        <DropdownCard
          href="/clients"
          title="Clients"
          description="Partner with F3 Global, providing microloans, guidance, and resources designed to support small business owners and entrepreneurs on their path to long-term success."
          imageSrc="/imgs/clients.webp"
          imageAlt="Clients"
        />
      </div>
    </div>
  );
}

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = (href: string) => pathname === href;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  //const [isBlinking, setIsBlinking] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (mobileNavRef.current && target && !mobileNavRef.current.contains(target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);

    if (!isDropdownOpen) {
      return;
    }

    setIsClosing(true);

    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }

    closeTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
      setIsClosing(false);
    }, 250);

    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, [pathname]);

  if (pathname === "/login") return null;

  const handleToggleDropdown = () => {
    if (isDropdownOpen) {
      setIsClosing(true);
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }

      closeTimeoutRef.current = setTimeout(() => {
        setIsDropdownOpen(false);
        setIsClosing(false);
      }, 250);
    } else {
      //setIsBlinking(true);
      setTimeout(() => {
        //setIsBlinking(false);
      }, 80);
      setIsDropdownOpen(true);
    }
  };

  const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isDropdownOpen) {
      return;
    }

    event.preventDefault();
    setIsClosing(true);

    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }

    closeTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
      setIsClosing(false);
      router.push("/");
    }, 250);
  };

  const wrapperClass =
    "fixed top-0 left-0 right-0 z-50 w-full font-dm shadow-[0_301px_84px_0_rgba(0,0,0,0.00),0_12px_26px_0_rgba(0,0,0,0.10)]";

  return (
    <>
      <div aria-hidden="true" className="h-[60px] md:h-[97px] w-full" />
      <div className={wrapperClass}>
        <div
          className="md:hidden absolute inset-0 -z-20 bg-[#ececec] pointer-events-none"
          style={{
            opacity: isMobileMenuOpen ? 1 : 0,
            transition: "opacity 0.2s linear",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 -z-10 bg-[rgba(236,236,236,0.70)] backdrop-blur-[10.85px] pointer-events-none"
          aria-hidden="true"
        />
        <nav className="w-full flex justify-between items-center">
          <NavLinks
            isActive={isActive}
            isDropdownOpen={isDropdownOpen}
            isClosing={isClosing}
            onToggleDropdown={handleToggleDropdown}
            onLogoClick={handleLogoClick}
            buttonRef={buttonRef}
            //isBlinking={isBlinking}
          />
          <MobileNavBar
            isActive={isActive}
            isOpen={isMobileMenuOpen}
            onToggle={() => {
              setIsMobileMenuOpen((v) => !v);
            }}
            onLinkClick={() => {
              setIsMobileMenuOpen(false);
            }}
            containerRef={mobileNavRef}
          />
        </nav>

        {isDropdownOpen && (
          <div
            className="hidden md:block origin-top"
            style={{
              animation: isClosing
                ? "slideUp 0.25s cubic-bezier(0.4, 0, 0.2, 1) forwards"
                : "slideDown 0.35s cubic-bezier(0.0, 0, 0.2, 1) forwards",
            }}
          >
            <DropdownContent />
          </div>
        )}

        <style jsx global>{`
          .spin-180-left {
            animation: spinToUp 0.35s ease-in-out forwards;
          }

          @keyframes spinToUp {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(180deg);
            }
          }

          .spin-180-right {
            animation: spinToDown 0.45s ease-in-out forwards;
          }

          @keyframes spinToDown {
            0% {
              transform: rotate(180deg);
            }
            100% {
              transform: rotate(0deg);
            }
          }

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
