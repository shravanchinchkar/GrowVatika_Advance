import { create } from "zustand";
type TNurseryCount = {
  newNurseries: number;
  approvedNurseries: number;
  suspendedNurseries: number;
  removedNurseries: number;
};
type TCountOfNurseries = {
  countOfNurseries: TNurseryCount;
  setCountOfNurseries: (newCountData: TNurseryCount) => void;
};

export const useCountOfNurseries = create<TCountOfNurseries>((set) => ({
  countOfNurseries: {
    newNurseries: 0,
    approvedNurseries: 0,
    suspendedNurseries: 0,
    removedNurseries: 0,
  },
  setCountOfNurseries: (newCountData: TNurseryCount) =>
    set({ countOfNurseries: newCountData }),
}));
