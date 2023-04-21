import { atom } from "recoil";

interface IProfile {
  id: number;
  full_name: string;
  email: string;
  phone: string;
}
export const initialManagerProfile: IProfile = {
  id: 0,
  full_name: "",
  email: "",
  phone: "",
};

export const managerProfileAtom = atom({
  key: `MANAGER_PROFILE`,
  default: {
    ...initialManagerProfile,
  },
});
