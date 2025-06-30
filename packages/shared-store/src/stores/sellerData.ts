import { create } from "zustand";
import {SellerData} from "@repo/common-types"

// Define the interface for your store state
interface SellerDataStore {
  sellerData: SellerData;
  updateSellerData: (newSellerData: Partial<SellerData>) => void;
}

export const useSellerDataStore = create<SellerDataStore>((set) => ({
  sellerData: {
    nurseryName: "",
    nurseryBio: "",
    address: "",
    phoneNumber: "",
    email: "",
    businesshours: "",
    location: "",
    specialities: [],
    profilePictureURL:""
  },
  updateSellerData: (newSellerData: Partial<SellerData>) =>
    set((state) => ({
      sellerData: { ...state.sellerData, ...newSellerData },
    })),
}));
