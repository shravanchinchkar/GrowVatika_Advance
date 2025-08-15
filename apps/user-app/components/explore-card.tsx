"use client";

import { memo } from "react";
import { v4 as uuidv4 } from "uuid";
import { SiteButton } from "./shop-button";
import { useRouter } from "next/navigation";
import Image, { StaticImageData } from "next/image";
import {
  useFilterProduct,
  usefilterProductByCategoryStore,
} from "@repo/shared-store";

type CardData = {
  id: string;
  title: string;
  image: StaticImageData;
  onHover: string[];
};
type ExploreCardProps = {
  cardData: CardData;
};

export const ExploreCard: React.FC<ExploreCardProps> = memo(({ cardData }) => {
  const router = useRouter();

  const { addFilter } = useFilterProduct();
  const { setCategory } = usefilterProductByCategoryStore();

  const handleNavigation = (category: string) => {
    setCategory(category);
    router.push("/explore");
  };

  const handleSelectedProduct = (filterProduct: string) => {
    console.log("filter data:", filterProduct);
    addFilter(filterProduct);
    router.push("/explore");
  };
  return (
    <div
      key={cardData.id}
      className="group relative flex new-sm:w-[9.5rem] new-sm-1:w-[10.68413rem] new-sm:h-[9.09rem] new-sm-2:w-[12rem] new-sm-2:h-[11rem] md:w-[15rem] md:h-[10rem] lg:w-[17rem] lg:h-[13em] xl:w-[19.6875rem] xl:h-[16.75rem] rounded-[28px] overflow-hidden shadow-explorecrad-custom-boxShadow cursor-pointer"
    >
      {/* Following div appear by-default */}
      <div className="absolute inset-0 grid grid-cols-2 transform transition-transform duration-300 group-hover:-translate-y-full">
        <div className="bg-white new-sm:px-[0.7rem] new-sm:py-[0.5rem] new-sm-2:p-[0.6rem] lg:p-[0.5rem] xl:p-[1rem] flex flex-col justify-between">
          <div className="uppercase new-sm:text-[0.7rem] new-sm-2:text-[0.9rem] md:text-[12px] lg:text-[16px] font-medium">
            {cardData.title}
          </div>
          <div>
            <SiteButton buttonName={"Explore"} />
          </div>
        </div>

        <div className="lg:w-[8rem] xl:w-[9rem] new-xl:w-[10.0452rem]  lg:h-[13rem] xl:h-[16.7419rem] relative">
          <Image
            className="object-cover"
            src={cardData.image}
            alt={cardData.id}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            placeholder="blur"
          />
        </div>
      </div>

      {/* Following div appears on hover */}
      <div className="transform transition-transform duration-300 translate-y-full group-hover:translate-y-0 font-[Poppins] bg-[#123524B8] w-[100%] flex flex-col items-start lg:gap-0 xl:gap-[0.2rem]">
        <div className="new-sm:h-[2rem] md:h-max lg:h-[4rem] new-sm:px-[1.2rem] md:px-[2rem] new-sm:py-[0.5rem] md:py-[0.5rem] lg:py-[0.5rem] xl:py-[1rem] new-sm:text-[0.8rem] new-sm-2:text-[0.9rem] md:text-[1rem] lg:text-[1.22688rem] font-semibold text-white">
          {cardData.title}
        </div>

        <div className="text-[#CBD0D3] new-sm:text-[0.8rem] new-sm-2:text-[0.9rem] md:text-[0.8rem] lg:text-[1rem] font-normal w-[100%] flex flex-col">
          {cardData.onHover.map((item: string) => {
            return (
              <div
                key={uuidv4()}
                className="w-[100%] new-sm:h-[25px] new-sm-2:h-[32px] md:h-[25px] lg:h-[40px] flex items-center new-sm:pl-[1.2rem] md:pl-[2rem] hover:bg-[#123524] hover:drop-shadow-lg"
                onClick={() => handleSelectedProduct(item)}
              >
                {item}
              </div>
            );
          })}
        </div>

        <div className="new-sm:ml-[1.2rem] md:ml-[1.5rem] new-sm:mt-[0.25rem] new-sm-2:mt-[0.5rem] lg:mt-[0.5rem]">
          <SiteButton
            buttonName={"Explore"}
            onClick={() => handleNavigation(cardData.id)}
          />
        </div>
      </div>
    </div>
  );
});
