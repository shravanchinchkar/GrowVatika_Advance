import { memo } from "react";
import { SiteLogo } from "@repo/ui/brand-logo";
import { ProductSearchBar, SearchBarWorkType } from "./product-search-bar";

export const HeaderSectionOne = memo(
  ({ isLanding }: { isLanding: boolean }) => {
    return (
      <div className="new-sm:w-[95%] md:w-[70%] 2xl:w-[72%] md:h-[4.05rem] flex new-sm:flex-col new-sm:items-center md:flex-row md:justify-between md:items-center gap-[0.3rem]">
        {/* Brand Logo */}
        <SiteLogo />

        {/* Following div consist of search bar */}
        {isLanding && (
          <div className="z-10 new-sm:w-[95%] new-sm:h-[2.8rem] md:w-[55%] md:h-[3.05rem]">
            <ProductSearchBar
              parentClassName="w-[100%] h-[100%]"
              searchInputClassName="new-sm:pl-[0.8rem] new-sm-1:pl-[1rem] md:pl-[0.8rem] lg:pl-[1.5rem] new-sm:text-[0.79rem] new-sm-1:text-[1rem] sm:text-[1.1rem] md:text-[0.89rem] lg:text-[1rem] xl:text-[1.1rem] 2xl:text-[1.22669rem]"
              searchButtonClassName="new-sm:w-[35%] sm:w-[25%] w-[15%] new-sm:text-[0.7rem]"
              placeholder="Find your Plants, Pots, Tools..."
            />
          </div>
        )}
      </div>
    );
  }
);
