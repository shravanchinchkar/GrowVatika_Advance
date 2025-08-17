import { create } from "zustand";
import { SellerProductData } from "@repo/common-types";
import { persist, createJSONStorage } from "zustand/middleware";

type WishListState = {
  likeProductData: SellerProductData[];
  clearWishList: () => void;
  removeProductData: (data: SellerProductData) => void;
  toggleLikeProductData: (data: SellerProductData) => void;
};

export const isLikeProductPresent = (
  productData: SellerProductData[],
  newData: SellerProductData
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
      toggleLikeProductData: (data: SellerProductData) =>
        set((state) => ({
          likeProductData: isLikeProductPresent(state.likeProductData, data)
            ? state.likeProductData.filter((item) => {
                return item.id !== data.id;
              })
            : [...state.likeProductData, data],
        })),
      removeProductData: (data: SellerProductData) =>
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
