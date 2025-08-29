import { create } from "zustand";
import { TAddtoCartandWishList } from "@repo/common-types";
import { persist, createJSONStorage } from "zustand/middleware";

type WishListState = {
  likeProductData: TAddtoCartandWishList[];
  clearWishList: () => void;
  removeProductData: (data: TAddtoCartandWishList) => void;
  addLikeProductData: (data: TAddtoCartandWishList) => void;
  toggleLikeProductData: (data: TAddtoCartandWishList) => void;
};

export const isLikeProductPresent = (
  productData: TAddtoCartandWishList[],
  newData: TAddtoCartandWishList
) => {
  for (const product of productData) {
    if (product.id === newData.id) {
      return true;
    }
  }
  return false;
};

const checkProductWithSameIdDiffSize = (
  likeProductData: TAddtoCartandWishList[],
  data: TAddtoCartandWishList
) => {
  for (const product of likeProductData) {
    if (product.id === data.id) {
      if (product.productSize !== data.productSize) {
        return true;
      }
    }
  }
  return false;
};

export const useWishListStore = create<WishListState>()(
  persist(
    (set, get) => ({
      likeProductData: [],
      toggleLikeProductData: (data: TAddtoCartandWishList) =>
        set((state) => ({
          likeProductData: isLikeProductPresent(state.likeProductData, data)
            ? state.likeProductData.filter((item) => {
                return item.id !== data.id;
              })
            : [...state.likeProductData, data],
        })),
      addLikeProductData: (data: TAddtoCartandWishList) =>
        set((state) => {
          const hasSameIdDiffSize = checkProductWithSameIdDiffSize(
            state.likeProductData,
            data
          );
          if (hasSameIdDiffSize) {
            // Filter out the existing product and add the new one
            const updatedLikeProductData = [
              ...state.likeProductData.filter((item) => item.id !== data.id),
              data,
            ];
            return {
              likeProductData: updatedLikeProductData,
            };
          }
          return {
            likeProductData: state.likeProductData,
          };
        }),
      removeProductData: (data: TAddtoCartandWishList) =>
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
