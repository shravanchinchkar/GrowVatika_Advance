import { create } from "zustand";
type TMessage = {
  display: boolean;
  nurseryName: string;
  nurseryId: string;
  tag: string;
};

type TRemoveNurseryMessage = {
  message: TMessage;
  setMessage: (newMessage: TMessage) => void;
};

export const useRemoveNurseryMessageStore = create<TRemoveNurseryMessage>(
  (set) => ({
    message: {
      display: false,
      nurseryId: "",
      nurseryName: "",
      tag: "",
    },
    setMessage: (newMessage: TMessage) => set({ message: newMessage }),
  })
);
