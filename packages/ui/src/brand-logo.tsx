import { memo } from "react";
import Link from "next/link";
import Image from "next/image";

export const SiteLogo = memo(() => {
  return (
    <>
      {/* <Link
        href={"/"}
        className="new-sm:w-max new-sm:h-max md:w-[14rem] lg:h-[4rem] xl:w-[16.3rem] xl:h-[3.8125rem] flex items-center new-sm:justify-start md:justify-between cursor-pointer outline-none"
      >
        <div className="relative new-sm:w-[3rem] new-sm:h-[3rem] new-sm-3:w-[4rem] new-sm-3:h-[4rem] md:w-[4rem] xl:w-[4.75rem] xl:h-[3.35rem]">
          <Image
            className="object-contain"
            src="/assets/images/BrandLogo/brandLogo_Old.svg"
            alt="site-logo"
            fill
          />
        </div>

        <div className="text-[#123524] leading-none">
          <div className="new-sm:w-max lg:w-[8rem] xl:w-[11.25rem] h-max new-sm:text-[20px] new-sm-3:text-[30px] xl:text-[38.4px] font-[impact]">
            GrowVatika
          </div>
          <div className="font-poppins new-sm:w-max new-sm:h-max md:w-[9.5625rem] md:h-[1.3125rem] new-sm:text-[10px] new-sm-3:text-[12px] xl:text-[13.97px] font-normal">
            Nursery For Everyone
          </div>
        </div>
      </Link> */}

      {/* Following is the new-brand-logo */}
      <Link
        href={"/"}
        className="new-sm:w-max new-sm:h-max md:w-[14rem] lg:w-[14rem] lg:h-[4rem] xl:w-[20.25rem] xl:h-[6.125rem] cursor-pointer outline-none"
      >
        {/* Following div is shown from md and above */}
        <div className="relative new-sm:hidden md:block w-[19rem] h-[5.8rem]">
          <Image
            className="object-contain"
            src="/assets/images/BrandLogo/brandLogo.svg"
            alt="brandLogo"
            fill
          />
        </div>

        {/* Following div is shown in mobile view */}
        <div className=" relative new-sm:block md:hidden w-[10.5625rem] h-[3.4375rem]">
          <Image
            className="object-contain"
            src="/assets/images/BrandLogo/brandLogo_mobile.svg"
            alt="brandLogo"
            fill
          />
        </div>
      </Link>
    </>
  );
});
