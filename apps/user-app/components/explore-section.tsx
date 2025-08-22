import { memo } from "react";
import { ExploreCard } from "./explore-card";
import { ExploreMoreSectionData } from "../data/exploreMoreSectionData";

export const ExploreSection = memo(() => {
  return (
    <div className="new-sm:pb-[1.37rem] new-sm:mt-[1rem] md:pb-0 md:mt-[4rem] new-md:mt-[8rem] bg-explore/about-custom-linear-gradient">
      {/* Following is the top div */}

      <div className="flex flex-col justify-center items-center new-sm:mt-0 sm:mt-1 mt-[1rem] font-poppins">
        <div className="new-sm:text-[0.9375rem] new-sm-2:text-[1.1rem] new-sm-3:text-[1.3rem] sm:text-[1.3rem] lg:text-[1.5rem] xl:text-[2.25rem] font-medium uppercase new-sm:w-[19rem] new-sm-1:w-[21rem] new-sm-2:w-[24rem] new-sm-3:w-[30rem] new-sm:h-max sm:w-max sm:h-[2rem] lg:h-[3.375rem] text-center text-[#123524] mt-[1rem]">
          Explore <span className="font-bold ">a World of Green</span> – Plants,
          Tools & Essentials!
        </div>

        <div className="new-sm:hidden md:block md:w-[45rem] lg:w-[55rem] xl:w-[63.375rem] h-[5.4375rem] text-[#1f4b10] font-normal md:text-[0.9rem] lg:text-[1rem] 2xl:text-[1.22669rem] text-center">
          Step into a world of lush greenery with GrowVatika! From vibrant
          plants and stylish planters to essential gardening tools and
          nutrient-rich soil, find everything you need to create your perfect
          green space. Shop from trusted nurseries, explore top-rated products,
          and bring nature home with ease!
        </div>
      </div>

      <div className="new-sm:mx-[0.5rem] md:px-0 lg:px-[5rem] md:py-[1rem] xl:py-[3rem] new-sm:grid new-sm:grid-cols-2 new-sm:justify-items-center md:flex gap-[1.5rem]">
        {ExploreMoreSectionData.map((item) => {
          return <ExploreCard key={item.id} cardData={item} />;
        })}
      </div>
    </div>
  );
});
