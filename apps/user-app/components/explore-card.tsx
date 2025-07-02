"use client";

import Image, { StaticImageData } from "next/image";
import { SiteButton } from "./shop-button";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

type CardData = {
  id: string;
  title: string;
  image: StaticImageData;
  onHover: string[];
};
type ExploreCardProps = {
  cardData: CardData;
};

export const ExploreCard: React.FC<ExploreCardProps> = ({ cardData }) => {
  const router=useRouter();

  const handleNavigation = () => {
    router.push("/explore")
  };
  return (
    <div
      key={cardData.id}
      className="border-red-500 group border-[2px] relative flex justify-self-center new-sm:w-[9rem] new-sm:h-[8rem] new-sm-1:w-[17rem] new-sm-1:h-[13rem] lg:w-[17rem] lg:h-[13rem] xl:w-[19.6875rem] xl:h-[16.75rem] new-sm:rounded-[0.99rem] new-sm-1:rounded-[28px] overflow-hidden shadow-explore-custom cursor-pointer"
    >
      {/* Following div appear by-default */}
      <div className="absolute inset-0 grid grid-cols-2 transform transition-transform duration-300 group-hover:-translate-y-full">
        <div className="bg-white lg:p-[0.5rem] xl:p-[1rem] flex flex-col justify-between">
          <div className="uppercase text-[16px] font-medium">
            {cardData.title}
          </div>
          <div>
            <SiteButton buttonName={"Explore"} />
          </div>
        </div>

        <div
          className={`lg:w-[8rem] xl:w-[9rem] new-xl:w-[10.0452rem]  lg:h-[13rem] xl:h-[16.7419rem] relative`}
        >
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
        <div className="px-[2rem] lg:py-[0.5rem] xl:py-[1rem] text-[1.22688rem] font-semibold text-white">
          {cardData.title}
        </div>

        <div className="text-[#CBD0D3] text-[1rem] font-normal w-[100%] flex flex-col">
          {cardData.onHover.map((item: string) => {
            return (
              <div
                key={uuidv4()}
                className="w-[100%] lg:h-[30px] xl:h-[40px] flex items-center pl-[2rem] hover:bg-[#123524]  hover:drop-shadow-lg"
              >
                {item}
              </div>
            );
          })}
        </div>

        <div className="ml-[1.5rem] lg:mt-[1rem]">
          <SiteButton buttonName={"Explore"} onClick={handleNavigation} />
        </div>
      </div>
    </div>
  );
};
