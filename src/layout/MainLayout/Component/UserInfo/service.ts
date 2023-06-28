import { privateRequestUser } from "@/api/request";
import { API_PATH } from "@/utils/constant";

export const getHistoryRent = () => {
  return privateRequestUser("GET", API_PATH.HISTORY_RENT);
};

export const userUpdateProfile = (input: {
  full_name?: string;
  phone?: string;
}) => {
  return privateRequestUser(
    "POST",
    API_PATH.UPDATE_PROFILE_USER,
    {
      ...input,
    }
  );
};
