import Image from "next/image";
import Link from "next/link";

export const NewBrandLogo = () => {
  return (
    <Link
      className="border-[2px] cursor-pointer"
      href={"/"}
    >
      <div className="relative md:w-[14rem] lg:w-[14rem] lg:h-[4rem] xl:w-[20rem] xl:h-[20rem]">
        <Image
          src={"/assets/images/BrandLogo/brand-logo.png"}
          alt="logo"
          fill
          className="object-contain"
        />
      </div>
    </Link>
  );
};
