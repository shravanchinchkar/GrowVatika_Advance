import { create } from "zustand";
import { TAddtoCartandWishList } from "@repo/common-types";
import { persist, createJSONStorage } from "zustand/middleware";

type AddToCardProps = {
  productData: TAddtoCartandWishList[];
  quantities: { [key: string]: number };
  clearProducts: () => void;
  addNewProduct: (newProduct: TAddtoCartandWishList) => void;
  setQuantities: (productId: string, quantity: number) => void;
  removeProduct: (
    newProduct: TAddtoCartandWishList,
    updatedQuantities: any
  ) => void;
};

const checkIsProductPresent = (
  productData: TAddtoCartandWishList[],
  newProduct: TAddtoCartandWishList
) => {
  for (const product of productData) {
    if (product.id === newProduct.id) {
      return true;
    }
  }
  return false;
};
const checkProductWithSameIdDiffSize = (
  productData: TAddtoCartandWishList[],
  newProduct: TAddtoCartandWishList
) => {
  for (const product of productData) {
    if (product.id === newProduct.id) {
      if (product.productSize !== newProduct.productSize) {
        return true;
      }
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
      addNewProduct: (newProduct: TAddtoCartandWishList) =>
        set((state) => {
          const hasSameIdDiffSize = checkProductWithSameIdDiffSize(
            state.productData,
            newProduct
          );
          if (hasSameIdDiffSize) {
            // Filter out the existing product and add the new one
            const updatedProductData = [
              ...state.productData.filter((item) => item.id !== newProduct.id),
              newProduct,
            ];
            
            // Set quantity to 1 for the new product
            const updatedQuantities = {
              ...state.quantities,
              [newProduct.id]: 1,
            };
            
            return {
              productData: updatedProductData,
              quantities:updatedQuantities
            };
          }
          if (checkIsProductPresent(state.productData, newProduct)) {
            return state; // No change if product already exists with same size
          }
          // Add new product and set its quantity to 1
          return {
            productData: [...state.productData, newProduct],
            quantities: {
              ...state.quantities,
              [newProduct.id]: 1,
            },
          };
        }),
      removeProduct: (newProduct: TAddtoCartandWishList, newQuantity: any) =>
        set((state) => ({
          productData: state.productData.filter(
            (item: TAddtoCartandWishList) => item !== newProduct
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
