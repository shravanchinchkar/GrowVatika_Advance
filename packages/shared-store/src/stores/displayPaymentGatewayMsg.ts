import { create } from "zustand";

type TMessage = {
  isPaymentMessageVisible: boolean;
  setVisibilityOfPaymentGateway: (value: boolean) => void;
};

export const usePaymentMessageStore = create<TMessage>((set) => ({
  isPaymentMessageVisible: false,
  setVisibilityOfPaymentGateway: (value: boolean) =>
    set({ isPaymentMessageVisible: value }),
}));
