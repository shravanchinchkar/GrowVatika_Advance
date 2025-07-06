import { ExploreCard } from "./explore-card";
import { ExploreMoreSectionData } from "../data/exploreMoreSectionData";

export const ExploreSection = () => {
  return (
    <div className="new-sm:pb-[1.37rem] new-sm-1:pb-0 lg:mt-[12rem] xl:mt-[15rem] 2xl:mt-[8rem] bg-custom-gradient">
      {/* Following is the top div */}

      <div className="flex flex-col justify-center items-center new-sm:mt-0 sm:mt-1 mt-[1rem] font-[Poppins]">

        <div className="new-sm:text-[1.1rem]  sm:text-[1.3rem] lg:text-[1.5rem] xl:text-[2.25rem] font-medium uppercase new-sm:w-[22rem] sm:w-max new-sm:h-[1.5rem] sm:h-[2rem] lg:h-[3.375rem] text-center text-[#123524] mt-[1rem]">
          Explore <span className="font-bold ">a World of Green</span> – Plants,
          Tools & Essentials!
        </div>
        <div className="new-sm:hidden new-sm-1:block lg:w-[55rem] xl:w-[63.375rem] h-[5.4375rem]  text-[#1f4b10] font-normal xl:text-[1rem] 2xl:text-[1.22669rem] text-center">
          Step into a world of lush greenery with GrowVatika! From vibrant
          plants and stylish planters to essential gardening tools and
          nutrient-rich soil, find everything you need to create your perfect
          green space. Shop from trusted nurseries, explore top-rated products,
          and bring nature home with ease!
        </div>
      </div>

      <div className="new-sm:mx-[2rem] new-sm:pt-[2.5rem] new-sm-1:px-[5rem] new-sm-1:py-[3rem] new-sm:grid new-sm:grid-cols-2 new-sm-1:flex gap-[1.5rem]">
        {ExploreMoreSectionData.map((item) => {
          return <ExploreCard key={item.id} cardData={item} />
        })}
      </div>

    </div>
  );
};