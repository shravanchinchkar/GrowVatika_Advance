import { create } from "zustand";
import { SellerProductData } from "@repo/common-types/types";

interface SellerProductDataStore {
  productData: SellerProductData[];
  updateSellerProductData: (newSellerProductData: SellerProductData[]) => void;
}

export const sellerProductDataStore = create<SellerProductDataStore>((set) => ({
  productData: [],
  updateSellerProductData: (newSellerProductData: SellerProductData[]) =>
    set(() => ({
      productData: newSellerProductData,
    })),
}));
