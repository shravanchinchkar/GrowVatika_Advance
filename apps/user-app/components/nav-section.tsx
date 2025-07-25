"use client";

import { useState } from "react";
import { NavLinks } from "./nav-links";

export const Navbar = () => {
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);

  return (
    <div className="sm:hidden md:block lg:w-[40rem] xl:w-[50rem] 2xl:w-[58.3rem] h-[4.05rem] bg-gradient-to-r from-[#B0BF78] to-[#759D61] rounded-full shadow-custom-boxshadow backdrop-blur-xl">
      <div className="relative w-[100%] h-[100%] flex items-center justify-between">
        <NavLinks linkName={"Home"} linkNumber={"1"} />
        <NavLinks
          linkName={"Collections"}
          onMouseEnter={() => {
            setIsCollectionsOpen(true);
          }}
          onMouseLeave={() => {
            setIsCollectionsOpen(false);
          }}
          isCollectionsOpen={isCollectionsOpen}
        />
        <NavLinks linkName={"Offers"} />
        <NavLinks linkName={"About"} />
        <NavLinks linkName={"Contact Us"} linkNumber={"5"} />
      </div>
    </div>
  );
};
