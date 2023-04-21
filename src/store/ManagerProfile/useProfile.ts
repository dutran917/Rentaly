/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRequest } from "ahooks";
import { useRecoilState } from "recoil";

import {
  managerProfileAtom,
  initialManagerProfile,
} from "./profile";
import { privateRequest, request } from "@/api/request";
import { API_PATH } from "@/utils/constant";
export const useProfile = () => {
  const [profile, setProfile] = useRecoilState(
    managerProfileAtom
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
  return {
    profile,
    setProfile,
    requestGetProfile,
  };
};
