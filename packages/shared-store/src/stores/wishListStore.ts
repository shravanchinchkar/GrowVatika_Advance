import { create } from "zustand";
import {  TProductData } from "@repo/common-types";
import { persist, createJSONStorage } from "zustand/middleware";

type WishListState = {
  likeProductData: TProductData[];
  clearWishList: () => void;
  removeProductData: (data: TProductData) => void;
  toggleLikeProductData: (data: TProductData) => void;
};

export const isLikeProductPresent = (
  productData: TProductData[],
  newData: TProductData
) => {
  for (const product of productData) {
    if (product.id === newData.id) {
      return true;
    }
  }
  return false;
};

export const useWishListStore = create<WishListState>()(
  persist(
    (set, get) => ({
      likeProductData: [],
      toggleLikeProductData: (data: TProductData) =>
        set((state) => ({
          likeProductData: isLikeProductPresent(state.likeProductData, data)
            ? state.likeProductData.filter((item) => {
                return item.id !== data.id;
              })
            : [...state.likeProductData, data],
        })),
      removeProductData: (data: TProductData) =>
        set((state) => ({
          likeProductData: state.likeProductData.filter((item) => {
            return item.id !== data.id;
          }),
        })),
      clearWishList: () => set({ likeProductData: [] }),
    }),
    {
      name: "wishList-storage", // unique name for localStorage key
      storage: createJSONStorage(() => localStorage), // default is localStorage
    }
  )
);
