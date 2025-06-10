import { atom } from "recoil";

export const activeSideBarAtom = atom<string>({
  key: "activeSideBarAtom",
  default: "dashboard",
});
