import { create } from "zustand";
import { SellerProductData } from "@repo/common-types";
import { persist, createJSONStorage } from "zustand/middleware";

type AddToCardProps = {
  productData: SellerProductData[];
  quantities: { [key: string]: number };
  clearProducts: () => void;
  setTAddToCart: (product: SellerProductData[]) => void;
  setQuantities: (productId: string, quantity: number) => void;
  removeProduct: (newProduct: SellerProductData) => void;
  toggleProduct: (newProduct: SellerProductData) => void;
  addNewProduct: (newProduct: SellerProductData) => void;
};

const checkIsProductPresent = (
  productData: SellerProductData[],
  newProduct: SellerProductData
) => {
  for (const product of productData) {
    if (product.id === newProduct.id) {
      return true;
    }
  }
  return false;
};
export const useAddToCard = create<AddToCardProps>()(
  persist(
    (set, get) => ({
      productData: [],
      quantities: {},
      setTAddToCart: (newProductData: SellerProductData[]) =>
        set({ productData: newProductData }),
      setQuantities: (productId: string, quantity: number) =>
        set((state) => ({
          quantities: { ...state.quantities, [productId]: quantity },
        })),
      addNewProduct: (newProduct: SellerProductData) =>
        set((state) => ({
          productData: checkIsProductPresent(state.productData, newProduct)
            ? state.productData
            : [...state.productData, newProduct],
        })),
      removeProduct: (newProduct: SellerProductData) =>
        set((state) => ({
          productData: state.productData.filter(
            (item: SellerProductData) => item !== newProduct
          ),
        })),
      toggleProduct: (newProduct: SellerProductData) =>
        set((state) => ({
          productData: state.productData.includes(newProduct)
            ? state.productData.filter(
                (item: SellerProductData) => item !== newProduct
              )
            : [...state.productData, newProduct],
        })),
      clearProducts: () => set({ productData: [] }),
    }),
    {
      name: "cart-storage", // unique name for localStorage key
      storage: createJSONStorage(() => localStorage), // default is localStorage
    }
  )
);
