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
      className="z-10 w-[3.95rem] h-[3.05rem] px-4 py-3 border-[#56A430] border-[2px]  hover:border-none  hover:bg-[#123524] transform duration-300 group-ease-in-out transition-colors rounded-full group flex justify-center items-center cursor-pointer"
      onClick={handleAddToCartVisibility}
    >
      <RiShoppingCart2Line className="text-gray-500 group-hover:text-white group-hover:hidden" />
      <RiShoppingCart2Fill className="group-hover:flex hidden fill-white" />
    </button>
  );
};
