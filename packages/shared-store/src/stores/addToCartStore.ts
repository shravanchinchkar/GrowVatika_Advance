import { create } from "zustand";
import { TProductData } from "@repo/common-types";
import { persist, createJSONStorage } from "zustand/middleware";

type AddToCardProps = {
  productData: TProductData[];
  quantities: { [key: string]: number };
  clearProducts: () => void;
  addNewProduct: (newProduct: TProductData) => void;
  setQuantities: (productId: string, quantity: number) => void;
  removeProduct: (newProduct: TProductData, updatedQuantities: any) => void;
};

const checkIsProductPresent = (
  productData: TProductData[],
  newProduct: TProductData
) => {
  for (const product of productData) {
    if (product.id === newProduct.id) {
      return true;
    }
  }
  return false;
};
export const useAddToCardStore = create<AddToCardProps>()(
  persist(
    (set, get) => ({
      productData: [],
      quantities: {},
      setQuantities: (productId: string, quantity: number) =>
        set((state) => ({
          quantities: { ...state.quantities, [productId]: quantity },
        })),
      addNewProduct: (newProduct: TProductData) =>
        set((state) => ({
          productData: checkIsProductPresent(state.productData, newProduct)
            ? state.productData
            : [...state.productData, newProduct],
        })),
      removeProduct: (newProduct: TProductData, newQuantity: any) =>
        set((state) => ({
          productData: state.productData.filter(
            (item: TProductData) => item !== newProduct
          ),
          quantities: newQuantity,
        })),
      clearProducts: () => set({ productData: [], quantities: {} }),
    }),
    {
      name: "cart-storage", // unique name for localStorage key
      storage: createJSONStorage(() => localStorage), // default is localStorage
    }
  )
);
