import { request } from "@/api/request";
import { API_PATH } from "@/utils/constant";

export const loginAdmin = async (data: {
  username: string;
  password: string;
}) => {
  try {
    return await request.post(API_PATH.ADMIN_LOGIN, data);
  } catch (error) {
    return Promise.reject(error);
  }
};
