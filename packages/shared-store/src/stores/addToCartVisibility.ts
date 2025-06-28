import { create } from "zustand";

export const useAddToCartVisibilityStore = create((set) => ({
  addToCartDropDownVisibility: false,
  updateAddToCartDropDownVisibility: (newVisibility: boolean) =>
    set({
      addToCartDropDownVisibility: newVisibility,
    }),
}));
