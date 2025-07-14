import Image from "next/image";
import Link from "next/link";

export const SiteLogo = () => {
  return (
    <Link
      href={"/"}
      className="z-10 lg:w-[14rem] lg:h-[4rem] xl:w-[16.3rem] xl:h-[3.8125rem] flex items-center lg:justify-between cursor-pointer outline-none"
    >
      {/* Following div consist of logo */}
      <div
        className="
          relative 
          new-sm:w-[3.75rem] new-sm:h-[2.125rem]
          new-sm-1:w-[4.4375rem] new-sm-1:h-[2.125rem]
          sm:w-[4.75rem] sm:h-[2.125rem]
          md:w-[5rem] md:h-[2.5rem]
          lg:w-[4rem] lg:h-[3rem] 
          xl:w-[4.75rem] xl:h-[3.35rem]
        "
      >
        <Image
          className="object-cover"
          src="./assets/images/HeaderImages/site-logo.svg"
          alt="site-logo"
          fill
        />
      </div>

      {/* Following div consist of site-name and tag-line */}

      <div className="text-[#123524] leading-[25px]">
        <div className="lg:w-[8rem] lg:h-max xl:w-[11.25rem] h-[2.9375rem] lg:text-[30px] xl:text-[38.4px] font-[impact]">
          GrowVatika
        </div>
        <div className="font-[Poppins] w-[9.5625rem] h-[1.3125rem] lg:text-[12px] xl:text-[13.97px] font-normal">
          Nursery For Everyone
        </div>
      </div>
    </Link>
  );
};
