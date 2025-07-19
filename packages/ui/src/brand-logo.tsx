import Image from "next/image";
import Link from "next/link";

export const SiteLogo = () => {
  return (
    <Link
      href={"/"}
      className="new-sm:w-max new-sm:h-max md:w-[14rem] lg:w-[14rem] lg:h-[4rem] xl:w-[16.3rem] xl:h-[3.8125rem] flex items-center new-sm:justify-start md:justify-between cursor-pointer outline-none"
    >
      {/* Following div consist of logo */}
      <div className="relative new-sm:w-[4rem] new-sm:h-[4rem]  new-sm:w-[3rem] new-sm:h-[3rem] md:w-[4rem] xl:w-[4.75rem] xl:h-[3.35rem]">
        <Image
          className="new-sm:object-contain md:object-cover"
          src="./assets/images/HeaderImages/site-logo.svg"
          alt="site-logo"
          fill
        />
      </div>

      {/* Following div consist of site-name and tag-line */}
      <div className="text-[#123524] new-sm:leading-none leading-[25px]">
        <div className="new-sm:w-max lg:w-[8rem] new-sm:h-max xl:w-[11.25rem] h-[2.9375rem] new-sm:text-[20px] lg:text-[30px] xl:text-[38.4px] font-[impact]">
          GrowVatika
        </div>
        <div className="font-[Poppins] new-sm:w-max new-sm:h-max md:w-[9.5625rem] md:h-[1.3125rem] new-sm:text-[10px] lg:text-[12px] xl:text-[13.97px] font-normal">
          Nursery For Everyone
        </div>
      </div>
    </Link>
  );
};
