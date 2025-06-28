import { create } from "zustand";

export const useWishListVisibilityStore = create((set) => ({
  wishListDropDownVisibility: false,
  updateWishListDropDownVisibility: (newVisibility: boolean) =>
    set({
      wishListDropDownVisibility: newVisibility,
    }),
}));
