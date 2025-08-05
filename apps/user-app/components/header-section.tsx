"use client";

import { Navbar } from "./navbar";
import { Hamburg } from "./hamburg";
import { ShoppingCartIcon } from "./cart-icon";
import { memo, useEffect, useState } from "react";
import { SelectTagUser } from "./select-tag-user";
import { UserAuthButton } from "./user-auth-button";
import { HeaderSectionOne } from "./header-section-1";
import { UserProfileIcon } from "./user-profile-icon";
import { LikeProductIcon } from "./like-product-icon";

interface HeaderSectionProp {
  explore?: boolean;
  explorebyseller?: boolean;
  singleProduct?: boolean;
  isLanding:boolean;
}

export const HeaderSection = memo(
  ({ explore, explorebyseller, singleProduct,isLanding}: HeaderSectionProp) => {
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

    return (
      <div
        className={`new-sm:w-[100%] md:w-[100%] lg:w-[90%] mx-auto z-40 flex flex-col items-center justify-center gap-[1rem] new-sm:h-max md:h-[10rem] md:mt-[1rem] py-[0.5rem] ${isScrollingUp && "sticky top-[1rem] bg-[#FFF6F4] md:border-[#56A430] md:border-[1.6px] md:rounded-[1rem] transition-all md:duration-300"}`}
      >
        <div className="new-sm:w-[100%] md:w-[96.5%] h-max flex justify-between new-sm:items-start md:items-center">
          <HeaderSectionOne isLanding={isLanding}/>
          <div className="flex new-sm:flex-col md:hidden items-center new-sm:gap-[0.3rem] new-sm-1:gap-[0.3rem] md:gap-0">
            <ShoppingCartIcon />
            <Hamburg />
            <UserProfileIcon />
            {(explore || explorebyseller || singleProduct) && (
              <LikeProductIcon />
            )}
          </div>

          <div className="new-sm:hidden md:flex items-center md:gap-[1rem] xl:gap-[1.5rem]">
            <div className="new-sm:hidden lg:block">
              <UserProfileIcon />
            </div>
            {(explore || explorebyseller || singleProduct) && (
              <LikeProductIcon />
            )}
            <ShoppingCartIcon />
          </div>
        </div>

        <div className="new-sm:hidden md:flex md:w-[96.5%] justify-between items-center z-10 font-[Poppins]">
          <Navbar />
          {!explore && !explorebyseller && !singleProduct && <UserAuthButton />}
          {(explore || singleProduct) && (
            <div className="flex md:w-[15rem] lg:w-[18rem] xl:w-[22.5rem] md:h-[3.5rem] lg:h-[3.7rem] xl:h-[4.05rem] justify-between">
              <SelectTagUser
                values={["All", "Plants", "Pots", "Soil", "Fertilizers"]}
                className="md:w-[7rem] lg:w-[8.5rem] xl:w-[10.5rem]"
                custom_Id="Category"
                isCategory={true}
              />
              <SelectTagUser
                activeValue="Explore"
                values={["Explore", "Explore by seller"]}
                className="md:w-[7rem] lg:w-[8.5rem] xl:w-[10.5rem]"
                custom_Id="ExploreType"
                isCategory={false}
              />
            </div>
          )}

          {explorebyseller && (
            <div className="md:w-[12rem] lg:w-[15rem] 2xl:w-[22.5rem] md:h-[3.5rem] lg:h-[3.7rem] xl:h-[4.05rem] flex justify-between">
              <SelectTagUser
                activeValue="Explore by seller"
                values={["Explore", "Explore by seller"]}
                className="w-[100%]"
                custom_Id="ExploreType"
                isCategory={false}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
);
