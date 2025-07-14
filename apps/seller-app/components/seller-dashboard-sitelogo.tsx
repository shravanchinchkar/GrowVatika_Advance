import Image from "next/image";
import Link from "next/link";

export const SellerDashboardSiteLogo = () => {
  return (
    <Link
      href={"/"}
      className="z-10 lg:w-[14rem] lg:h-[4rem] new-lg:w-[15rem] 2xl:w-[15.7rem] 2xl:h-[3.8125rem] flex items-center lg:justify-between new-lg:justify-evenly 2xl:justify-between cursor-pointer lg:ml-[0.5rem] xl:ml-[1rem]"
    >
      {/* Following div consist of logo */}
      <div className="relative lg:w-[3rem] lg:h-[2rem] new-lg:w-[3.2rem] new-lg:h-[2.5rem] 2xl:w-[3.9705rem] 2xl:h-[2.80025rem]">
        <Image
          className="lg:object-contain 2xl:object-cover"
          src="./assets/images/HeaderImages/site-logo.svg"
          alt="site-logo"
          fill
        />
      </div>

      {/* Following div consist of site-name and tag-line */}
      <div className="h-max text-[#123524] flex flex-col justify-center lg:pt-[0.5rem] 2xl:pt-0">
        <div className="lg:w-[8rem] lg:h-max 2xl:w-[11.25rem] h-[2.9375rem] lg:text-[25px] 2xl:text-[2.00613rem] font-[impact]">
          GrowVatika
        </div>
        <div className="font-[Poppins] w-[9.5625rem] h-[1.3125rem] lg:text-[12px] 2xl:text-[0.72975rem] font-normal leading-[5px]">
          Nursery For Everyone
        </div>
      </div>

    </Link>
  );
};
