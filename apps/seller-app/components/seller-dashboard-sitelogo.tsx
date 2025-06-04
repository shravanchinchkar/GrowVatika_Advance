import Image from "next/image";
import Link from "next/link";

export const SellerDashboardSiteLogo = () => {
  return (
    <Link
      href={"/"}
      className="z-10 lg:w-[14rem] lg:h-[4rem] xl:w-[15.7rem] xl:h-[3.8125rem] flex items-center lg:justify-between cursor-pointer ml-[1rem]"
    >
      {/* Following div consist of logo */}
      <div className="relative lg:w-[4rem] lg:h-[3rem] xl:w-[3.9705rem] xl:h-[2.80025rem]">
        <Image
          className="object-cover"
          src="./assets/images/HeaderImages/site-logo.svg"
          alt="site-logo"
          fill
        />
      </div>

      {/* Following div consist of site-name and tag-line */}
      <div className="h-max text-[#123524]">
        <div className="lg:w-[8rem] lg:h-max xl:w-[11.25rem] h-[2.9375rem] lg:text-[30px] xl:text-[2.00613rem] font-[impact]">
          GrowVatika
        </div>
        <div className="font-[Poppins] w-[9.5625rem] h-[1.3125rem] lg:text-[12px] xl:text-[0.72975rem] font-normal leading-[5px]">
          Nursery For Everyone
        </div>
      </div>
    </Link>
  );
};
