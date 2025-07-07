import Image from "next/image";
import Link from "next/link";

export const SiteLogo = () => {
  return (
    <Link
      href={"/"}
<<<<<<< HEAD
      className="
        z-10 
        new-sm:w-[12.5rem] new-sm:h-[4rem]
        new-sm-1:w-[13.4375rem] new-sm-1:h-[4rem]
        sm:w-[14rem] sm:h-[4rem]
        md:w-[15rem] md:h-[4rem]
        lg:w-[14rem] lg:h-[4rem] 
        xl:w-[16.3rem] xl:h-[3.8125rem] 
        flex items-center lg:justify-between cursor-pointer
      "
=======
      className="z-10 lg:w-[14rem] lg:h-[4rem] xl:w-[16.3rem] xl:h-[3.8125rem] flex items-center lg:justify-between cursor-pointer outline-none"
>>>>>>> main
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
      <div className="h-max text-[#123524]">
        <div
          className="
            new-sm:w-[6rem] new-sm:text-[1.25rem]
            new-sm-1:w-[7rem] new-sm-1:text-[1.5rem]
            sm:w-[8rem] sm:text-[1.75rem]
            md:w-[9rem] md:text-[1.875rem]
            lg:w-[8rem] lg:text-[1.875rem]
            xl:w-[11.25rem] xl:text-[2.4rem]
            h-[2.9375rem] font-[impact]
          "
        >
          GrowVatika
        </div>
        <div
          className="
            font-[Poppins]
            new-sm:w-[8rem] new-sm:text-[0.625rem]
            new-sm-1:w-[9rem] new-sm-1:text-[0.7rem]
            sm:w-[9rem] sm:text-[0.75rem]
            md:w-[9.5rem] md:text-[0.75rem]
            lg:w-[9.5625rem] lg:text-[0.75rem]
            xl:w-[9.5625rem] xl:text-[0.85rem]
            h-[1.3125rem] font-normal leading-[1.3rem]
          "
        >
          Nursery For Everyone
        </div>
      </div>
    </Link>
  );
};
