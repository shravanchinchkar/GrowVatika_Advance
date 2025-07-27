import Image from "next/image";
import { SiteButton } from "./shop-button";
import HangingPot from "../public/assets/images/HeroImages/HangingPot.png";
import FlowerPot from "../public/assets/images/HeroImages/LandingPot.svg";
import MobileHangingPot from "../public/assets/images/MobileView/mobile-hangingpot.png";

export const LandingPot = () => {
  return (
    <div className="new-sm:w-[100%] new-sm:h-[22rem] md:h-[33rem] lg:h-[42rem] md:w-[95%] lg:w-[86.6%] xl:w-[86.5%] 2xl:w-[86.5%] absolute z-30 top-0 new-sm:flex md:grid grid-cols-2 rounded-[28px] overflow-visible md:ml-[1.2rem] lg:ml-[4.3rem] xl:ml-[5.5rem] 2xl:ml-[6.5rem]">

      <div className="w-[100%] relative z-10 rounded-l-[28px] h-[100%] new-sm:hidden md:grid grid-cols-2">
        {/* Following is the Shop now button */}
        <div className="flex md:justify-center lg:justify-start items-end mb-[1rem]">
          <SiteButton buttonName={"Shop Now"} />
        </div>

        {/* Following is the Image */}
        <div className="md:hidden new-md:block absolute md:bottom-[-3rem] xl:bottom-[-4rem] new-md:right-[-5rem] lg:right-[-2rem] xl:right-[-4rem] 2xl:right-[-6rem]">
          <div className="relative new-md:w-[16rem] new-md:h-[16rem] xl:w-[18.1875rem] xl:h-[18.8125rem]  2xl:w-[22.1875rem] 2xl:h-[22.8125rem] justify-self-end drop-shadow-3xl">
            <Image
              className="object-cover"
              src={FlowerPot}
              alt="pot"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              // priority
              // placeholder="blur"
            />
          </div>
        </div>
      </div>

      <div className="w-[100%] z-0 relative flex justify-center rounded-r-[28px] ">

        <div className="absolute new-sm:w-[12rem] new-sm:h-[12rem] new-sm-1:w-[13rem] new-sm-1:h-[16.6875rem]  md:w-[19rem] md:h-[25rem] xl:w-[25rem] xl:h-[35rem] top-0 new-sm:right-0 md:left-[20%] new-md:left-[28%] lg:left-[13.5%] xl:left-[17%] 2xl:left-[25%]">
          <div className="relative new-sm:w-[12rem] new-sm:h-[16rem] new-sm-1:w-[13rem] new-sm-1:h-[16.6875rem] md:w-[19rem] md:h-[25rem] lg:w-[22rem] lg:h-[32rem] xl:w-[25rem] xl:h-[35rem] drop-shadow-3xl shrink-0 ">
            <Image
              className="new-sm:hidden md:block object-cover"
              src={HangingPot}
              alt="pot"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              placeholder="blur"
              priority
            />
            <Image
              className="new-sm:block md:hidden object-cover"
              src={MobileHangingPot}
              alt="pot"
              fill
              // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              placeholder="blur"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};