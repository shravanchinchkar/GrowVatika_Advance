import { create } from "zustand";

export const wishListVisibilityStore = create((set) => ({
  wishListDropDownVisibility: false,
  updateWishListDropDownVisibility: (newVisibility: boolean) =>
    set({
      wishListDropDownVisibility: newVisibility,
    }),
}));