"use client";
import Skeleton from "@/app/loading";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface NavLinksProps {
  linkName: string;
  linkNumber?: string;
  isCollectionsOpen?: boolean;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
}
export const NavLinks = ({
  linkName,
  linkNumber,
  isCollectionsOpen,
  onMouseEnter,
  onMouseLeave,
}: NavLinksProps) => {
  const router = useRouter();
  const pathname = usePathname();

  // Function to handle navigation and scrolling
  const handleNavigation = (e: React.MouseEvent) => {
    e.preventDefault();

    // Define section mappings
    const sectionMap: { [key: string]: string } = {
      "About": "about",
      "Contact Us": "contact-us",
      "Offers": "offers",
      "Home":"/"
    };

    const sectionId = sectionMap[linkName];

    if (!sectionId) return;

    // If we're already on the home page, just scroll
    if (pathname === "/") {
      scrollToSection(sectionId);
    } else {
      // Navigate to home page first, then scroll
      router.push("/");
      // Use setTimeout to ensure the page has loaded before scrolling
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 2000);
    }
  };

  // Function to smoothly scroll to a section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Determine if this link should handle section scrolling
  const isSectionLink = ["About", "Contact Us", "Offers", "Home"].includes(
    linkName
  );
  return (
    <div
      className={
        linkNumber === "1"
          ? "flex flex-col w-[100%] h-[100%] uppercase justify-center items-center transition-all duration-300 ease-in-out hover:bg-[#8FAA83] hover:text-lg hover:font-bold overflow-hidden cursor-pointer rounded-l-full"
          : linkNumber === "5"
            ? "flex flex-col w-[100%] h-[100%] uppercase justify-center items-center transition-all duration-300 ease-in-out hover:bg-[#8FAA83] hover:text-lg hover:font-bold overflow-hidden cursor-pointer rounded-r-full pr-[1rem]"
            : "flex flex-col w-[100%] h-[100%] uppercase justify-center items-center transition-all duration-300 ease-in-out hover:bg-[#8FAA83] hover:text-lg  overflow-hidden cursor-pointer hover:font-semibold"
      }
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div>
        {isSectionLink ? (
          // Use button for section navigation
          <button
            onClick={handleNavigation}
            className="text-white w-[10rem] h-[10rem] flex items-center font-Poppins lg:text-[16px] xl:text-[19.63px] leading-[29.44px] tracking-wider justify-center"
          >
            {linkName}
          </button>
        ) : (
          // Use Link for regular navigation (Collections)
          <Link
            href={linkName === "Collections" ? "/explore" : "/"}
            className="text-white w-[10rem] h-[10rem] flex items-center font-Poppins lg:text-[16px] xl:text-[19.63px] leading-[29.44px] tracking-wider justify-center"
          >
            {linkName}
          </Link>
        )}
      </div>

      {/* Following is the dropdown */}
      {linkName === "Collections" ? (
        <div
          className={`absolute lg:w-[7.9rem] xl:w-[11.49rem] h-[8rem] top-full lg:left-[7.9rem] xl:left-[11.57rem] bg-[#649173] rounded-b-3xl shadow-lg transition-none duration-300 overflow-hidden ${
            isCollectionsOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <div className="flex flex-col gap-[1rem] font-[Poppins] w-[100%] overflow-hidden">
            <Link
              href="/explore"
              className="flex items-center text-white h-[50px] font-Poppins text-[16px] hover:bg-[#123524] w-[100%] px-[1rem]"
            >
              EXPLORE
            </Link>
            <Link
              href="/explorebyseller"
              className="flex items-center h-[60px] rounded-b-lg  text-white font-Poppins text-[16px] hover:bg-[#123524] w-[100%] px-[1rem]"
            >
              EXPLORE BY SELLER
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
};
