import { privateRequest } from "@/api/request";
import { API_PATH } from "@/utils/constant";

export const updateProfileService = (input: {
  full_name?: string;
  old_password?: string;
  password?: string;
}) => {
  return privateRequest("POST", API_PATH.UPDATE_PROFILE, {
    ...input,
  });
};
