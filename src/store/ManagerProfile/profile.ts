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

export const initialUserProfile: IProfile = {
  id: 0,
  full_name: "",
  email: "",
  phone: "",
};
export const initialAdminProfile: IProfile = {
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

export const userProfileAtom = atom({
  key: `USER_PROFILE`,
  default: {
    ...initialUserProfile,
  },
});

export const adminProfileAtom = atom({
  key: `ADMIN_PROFILE`,
  default: {
    ...initialAdminProfile,
  },
});
