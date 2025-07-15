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
  const router = useRouter();

  const handleNavigation = () => {
    router.push("/explore")
  };
  return (
    <div
      key={cardData.id}
      className="group border-[2px] relative flex new-sm:w-[9rem] new-sm:h-[8rem] lg:w-[17rem] lg:h-[13em] xl:w-[19.6875rem] xl:h-[16.75rem] rounded-[28px] overflow-hidden shadow-explore-custom cursor-pointer"
    >
      {/* Following div appear by-default */}
      <div className="absolute inset-0 grid grid-cols-2 transform transition-transform duration-300 group-hover:-translate-y-full">
        <div className="bg-white new-sm:p-[0.6rem] new-sm-1:p-[0.6rem] lg:p-[0.5rem] xl:p-[1rem] flex flex-col justify-between">
          <div className="uppercase new-sm:text-[0.6rem] new-sm-1:text-[16px] font-medium">
            {cardData.title}
          </div>
          <div>
            <SiteButton buttonName={"Explore"} />
          </div>
        </div>


        <div
          className="lg:w-[8rem] xl:w-[9rem] new-xl:w-[10.0452rem]  lg:h-[13rem] xl:h-[16.7419rem] relative">

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
      <div className="transform transition-transform duration-300 translate-y-full group-hover:translate-y-0 font-[Poppins] bg-[#123524B8] w-[100%] flex flex-col items-start  lg:gap-0 xl:gap-[0.2rem]">
        <div className="new-sm:h-[2rem] new-sm-1:h-[4rem] new-sm:px-[1.2rem] new-sm-1:px-[2rem] new-sm:py-[0.5rem] new-sm-1:py-[0.5rem] lg:py-[0.5rem] xl:py-[1rem] new-sm:text-[0.8rem] new-sm-1:text-[1.22688rem] font-semibold text-white">
          {cardData.title}
        </div>

        <div className="text-[#CBD0D3] new-sm:text-[0.7rem] new-sm-1:text-[1rem] font-normal w-[100%] flex flex-col">
          {cardData.onHover.map((item: string) => {
            return (
              <div
                key={uuidv4()}
                className="w-[100%] new-sm:h-[16px] new-sm-1:h-[40px] lg:h-[40px] xl:h-[40px] flex items-center new-sm:pl-[1.2rem] new-sm-1:pl-[2rem] hover:bg-[#123524] hover:drop-shadow-lg"
              >
                {item}
              </div>
            );
          })}
        </div>

        <div className="new-sm:ml-[1.2rem] new-sm-1:ml-[1.5rem] new-sm:mt-[0.25rem] new-sm-1:mt-[0.5rem] lg:mt-[0.5rem]">
          <SiteButton buttonName={"Explore"} onClick={handleNavigation} />
        </div>
      </div>
    </div>
  );
};