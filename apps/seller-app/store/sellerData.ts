import { SellerData } from "@repo/common-types/types";
import { create } from "zustand";

// Define the interface for your store state
interface SellerDataStore {
  sellerData: SellerData;
  updateSellerData: (newSellerData: Partial<SellerData>) => void;
}

export const sellerDataStore = create<SellerDataStore>((set) => ({
  sellerData: {
    nurseryName: "",
    nurseryBio: "",
    address: "",
    phoneNumber: "",
    email: "",
    businesshours: "",
    location: "",
    specialities: [],
  },
  updateSellerData: (newSellerData: Partial<SellerData>) =>
    set((state) => ({
      sellerData: { ...state.sellerData, ...newSellerData },
    })),
}));
