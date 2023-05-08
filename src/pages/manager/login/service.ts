import { request } from "@/api/request";
import { API_PATH } from "@/utils/constant";

export const loginManager = async (data: {
  username: string;
  password: string;
}) => {
  try {
    return await request.post(API_PATH.MANAGER_LOGIN, data);
  } catch (error) {
    console.log(error);
  }
};
