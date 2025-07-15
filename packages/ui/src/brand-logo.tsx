import Image from "next/image";
import Link from "next/link";

export const SiteLogo = () => {
  return (
    <Link
      href={"/"}
      className="new-sm:w-[4.43rem] new-sm-1:w-[14rem] lg:w-[14rem] xl:w-[16.3rem] new-sm:h-[2.21rem] new-sm-1:h-[4rem] lg:h-[4rem] xl:h-[3.8125rem] flex items-center justify-between cursor-pointer outline-none"
    >
      {/* Following div consist of logo */}
      <div className="relative new-sm:w-[1.4rem] new-sm-1:w-[4rem] lg:w-[4rem] xl:w-[4.75rem] new-sm:h-[1rem] new-sm-1:h-[3rem] lg:h-[3rem] xl:h-[3.35rem]">
        <Image
          className="object-cover"
          src="./assets/images/HeaderImages/site-logo.svg"
          alt="site-logo"
          fill
        />
      </div>

      {/* Following div consist of site-name and tag-line */}
      <div className="text-[#123524] new-sm:leading-none new-sm-1:leading-[25px]">
        <div className="new-sm:w-[3rem] new-sm-1:w-[8rem] lg:w-[8rem] xl:w-[11.25rem] new-sm:h-[0.6rem] new-sm-1:h-max lg:h-max h-[2.9375rem] new-sm:text-[8px] new-sm-1:text-[30px] lg:text-[30px] xl:text-[38.4px] font-[impact]">
          GrowVatika
        </div>
        <div className="font-[Poppins] new-sm:w-[3rem] new-sm-1:w-[9.5625rem] w-[9.5625rem] new-sm:h-[0.4rem] new-sm-1:h-[1.3125rem] h-[1.3125rem] new-sm:text-[3.5px] new-sm-1:text-[12px] lg:text-[12px] xl:text-[13.97px] font-normal">
          Nursery For Everyone
        </div>
      </div>
    </Link>
  );
};
