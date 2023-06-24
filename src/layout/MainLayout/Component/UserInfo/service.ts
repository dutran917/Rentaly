import { privateRequestUser } from "@/api/request";
import { API_PATH } from "@/utils/constant";

export const getHistoryRent = () => {
  return privateRequestUser("GET", API_PATH.HISTORY_RENT);
};
