"use client"

import { Hamburg } from "./hamburg";
import { Navbar } from "./nav-section";
import { ShoppingCartIcon } from "./cart-icon";
import { memo, useEffect, useState } from "react";
import { UserAuthButton } from "./user-auth-button";
import { HeaderSectionOne } from "./header-section-1";
import { UserProfileIcon } from "./user-profile-icon";
import { LikeProductIcon } from "./like-product-icon";
import { CustomSelectTag } from "./custom-select-tag";

interface HeaderSectionProp {
  explore?: boolean;
  explorebyseller?: boolean;
  singleProduct?:boolean
}

export const HeaderSection = memo(
  ({ explore, explorebyseller,singleProduct }: HeaderSectionProp) => {
    const [isScrollingUp, setIsScrollingUp] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;

        // Check if scrolling up
        if (currentScrollY < lastScrollY && currentScrollY > 0) {
          setIsScrollingUp(true);
        } else {
          setIsScrollingUp(false);
        }

        setLastScrollY(currentScrollY);
      };

      // Add scroll event listener
      window.addEventListener("scroll", handleScroll, { passive: true });

      // Cleanup
      return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    // 2xl:w-[87rem]
    return (
      <div
        className={`new-sm:w-[100%] md:w-[60rem] xl:w-[70rem] 2xl:w-[90%] mx-auto z-40 flex flex-col items-center justify-center gap-[1rem] new-sm:h-max md:h-[10rem] md:mt-[1rem] py-[0.5rem] ${isScrollingUp && "sticky top-[1rem] bg-[#FFF6F4] md:border-[#56A430] md:border-[1.6px] md:rounded-[1rem] transition-all md:duration-300"}`}
      >
        <div className="new-sm:w-[100%] md:w-[96.5%] h-max flex justify-between items-start">
          <HeaderSectionOne />
          <div className="flex new-sm:flex-col md:hidden items-center new-sm:gap-[0.3rem] new-sm-1:gap-[0.3rem] md:gap-0">
            <ShoppingCartIcon />
            <Hamburg />
            <UserProfileIcon />
            {(explore || explorebyseller || singleProduct) && <LikeProductIcon />}
          </div>
          <div className="new-sm:hidden md:flex items-center gap-[1.5rem]">
            <UserProfileIcon />
            {(explore || explorebyseller || singleProduct) && <LikeProductIcon />}
            <ShoppingCartIcon />
          </div>
        </div>

        <div className="new-sm:hidden md:flex md:w-[96.5%] justify-between items-center z-10 font-[Poppins]">
          <Navbar />
          {!explore && !explorebyseller && <UserAuthButton />}
          {explore && (
            <div className="h-[4.05rem] w-[22.5rem] flex justify-between">
              <CustomSelectTag
                width={"10.5"}
                activeValue="Plants"
                values={["Plant", "Soil", "Pots", "Fertilizers"]}
                explore={true}
              />
              <CustomSelectTag
                width={"10.5"}
                activeValue="Explore"
                values={["Explore", "Explore by seller"]}
                explore={true}
              />
            </div>
          )}

          {explorebyseller && (
            <div className="h-[4.05rem] w-[22.5rem] flex justify-between">
              <CustomSelectTag
                activeValue="Explore by seller"
                values={["Explore", "Explore by seller"]}
                explore={false}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
);
