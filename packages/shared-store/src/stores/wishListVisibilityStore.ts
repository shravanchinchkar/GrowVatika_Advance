import { create } from "zustand";

interface WishListVisibilityProps {
  isWishListVisible: boolean;
  setVisibilityOfWishList: (newValue: boolean) => void;
}

export const useWishListVisibilityStore = create<WishListVisibilityProps>(
  (set) => ({
    isWishListVisible: false,
    setVisibilityOfWishList: (newValue: boolean) =>
      set({ isWishListVisible: newValue }),
  })
);
