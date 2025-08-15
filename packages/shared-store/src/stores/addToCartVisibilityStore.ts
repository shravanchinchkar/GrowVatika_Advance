import { create } from "zustand";
interface AddToCartVisibilityProps {
  isAddToCartVisible: boolean;
  setVisibilityOfAddToCart: (value: boolean) => void;
}

export const useAddToCartVisibilityStore = create<AddToCartVisibilityProps>(
  (set) => ({
    isAddToCartVisible: false,
    setVisibilityOfAddToCart: (newValue: boolean) =>
      set({ isAddToCartVisible: newValue }),
  })
);
