"use client";

import { memo } from "react";
import { RiHeart3Fill, RiHeart3Line } from "@remixicon/react";
import {
  useWishListStore,
  useWishListVisibilityStore,
} from "@repo/shared-store";

export const LikeProductIcon = memo(() => {
  //Following are the Zustand States
  const { likeProductData } = useWishListStore();
  const { setVisibilityOfWishList } = useWishListVisibilityStore();

  const handleWishListVisibility = () => {
    setVisibilityOfWishList(true);
  };
  return (
    <button
      className="relative z-10 new-sm:w-[2.9rem] new-sm:h-[3.0625rem] md:w-[3.5rem] md:h-[3rem] lg:w-[3.95rem] lg:h-[3.05rem] new-sm:pl-[0.5rem] md:px-4 md:py-3 border-[#56A430] new-sm:border-t-[1.6px] new-sm:border-l-[1.6px] new-sm:border-b-[1.6px]  md:border-[1.6px]  hover:border-none  hover:bg-[#123524] transform duration-300 group-ease-in-out transition-colors new-sm:rounded-l-[5.25rem] md:rounded-full group flex justify-center items-center cursor-pointer bg-[#fff]"
      onClick={handleWishListVisibility}
    >
      {likeProductData.length > 0 && (
        <div className="absolute top-[-0.5rem] right-0 w-[1.5rem] h-[1.5rem] rounded-full flex justify-center items-center bg-[#EA4335] text-[1.22688rem] text-[#FFFFFF] font-medium">
          {likeProductData.length}
        </div>
      )}
      <RiHeart3Line className="text-gray-500 group-hover:text-white group-hover:hidden" />
      <RiHeart3Fill className="group-hover:flex hidden fill-white" />
    </button>
  );
});
