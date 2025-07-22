import { memo } from "react";
import Image from "next/image";

export const Hamburg =memo(() => {
  return (
    <div className="z-10 new-sm:flex md:hidden new-sm:w-[2.9rem] new-sm:h-[3.0625rem] border-t-[1.6px] border-l-[1.6px] new-sm:border-b-[1.6px] rounded-l-[5.25rem] bg-[#56A430] border-[#FFF6F4] justify-center items-center pl-[0.5rem]">
      <div className="relative w-[1.5rem] h-[1.5rem]">
        <Image
          src={"/assets/images/MobileView/menu.svg"}
          alt="menu"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
});
