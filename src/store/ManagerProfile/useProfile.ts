/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRequest } from "ahooks";
import { useRecoilState } from "recoil";

import {
  managerProfileAtom,
  initialManagerProfile,
  userProfileAtom,
  initialUserProfile,
  adminProfileAtom,
  initialAdminProfile,
} from "./profile";
import {
  privateRequest,
  privateRequestAdmin,
  privateRequestUser,
  request,
} from "@/api/request";
import { API_PATH } from "@/utils/constant";
export const useProfile = () => {
  const [profile, setProfile] = useRecoilState(
    managerProfileAtom
  );
  const [profileUser, setProfileUser] =
    useRecoilState(userProfileAtom);
  const [profileAdmin, setProfileAdmin] = useRecoilState(
    adminProfileAtom
  );
  const requestGetProfile = useRequest(
    async () => {
      const profile = await privateRequest(
        "GET",
        API_PATH.MANAGER_INFO
      );
      return profile;
    },
    {
      manual: true,
      onSuccess: (res) => {
        setProfile({
          ...res.data,
        });
      },
      onError: () => {
        setProfile(initialManagerProfile);
      },
    }
  );

  const requestGetProfileAdmin = useRequest(
    async () => {
      const profile = await privateRequestAdmin(
        "GET",
        API_PATH.ADMIN_INFO
      );
      return profile;
    },
    {
      manual: true,
      onSuccess: (res) => {
        setProfileAdmin({
          ...res.data,
        });
      },
      onError: () => {
        setProfileAdmin(initialAdminProfile);
      },
    }
  );

  const requestGetProfileUser = useRequest(
    async () => {
      const profile = await privateRequestUser(
        "GET",
        API_PATH.MANAGER_INFO
      );
      return profile;
    },
    {
      manual: true,
      onSuccess: (res) => {
        setProfileUser({
          ...res.data,
        });
      },
      onError: () => {
        setProfileUser(initialUserProfile);
      },
    }
  );
  return {
    profile,
    setProfile,
    requestGetProfile,
    requestGetProfileUser,
    profileUser,
    setProfileUser,
    profileAdmin,
    setProfileAdmin,
    requestGetProfileAdmin,
  };
};
