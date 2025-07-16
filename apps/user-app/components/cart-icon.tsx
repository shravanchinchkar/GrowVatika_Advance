"use client";

import { RiShoppingCart2Fill, RiShoppingCart2Line } from "@remixicon/react";
import { useAddToCartVisibilityStore } from "@repo/shared-store";

export const ShoppingCartIcon = () => {
  const updateAddToCartVisibility = useAddToCartVisibilityStore(
    (state: any) => state.updateAddToCartDropDownVisibility
  );
  const handleAddToCartVisibility = () => {
    updateAddToCartVisibility(true);
  };
  return (
    <button
      className="z-10 new-sm:w-[3.0625rem] new-sm:h-[3.0625rem] md:w-[3.95rem] new-sm:pl-[0.5rem]  md:h-[3.05rem] md:px-4 md:py-3 border-[#56A430] new-sm:border-t-[1.6px] new-sm:border-l-[1.6px] new-sm:border-b-[1.6px]  md:border-[2px]  hover:border-none  hover:bg-[#123524] transform duration-300 group-ease-in-out transition-colors new-sm:rounded-l-[5.25rem] md:rounded-full group flex justify-center items-center cursor-pointer bg-[#fff]"
      onClick={handleAddToCartVisibility}
    >
      <RiShoppingCart2Line className="text-gray-500 group-hover:text-white group-hover:hidden" />
      <RiShoppingCart2Fill className="group-hover:flex hidden fill-white" />
    </button>
  );
};
