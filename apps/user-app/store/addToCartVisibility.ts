import { create } from "zustand";

export const addToCartVisibilityStore = create((set) => ({
  addToCartDropDownVisibility: false,
  updateAddToCartDropDownVisibility: (newVisibility: boolean) =>
    set({
      addToCartDropDownVisibility: newVisibility,
    }),
}));
