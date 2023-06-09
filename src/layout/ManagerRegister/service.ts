import { request } from "@/api/request";
import { API_PATH } from "@/utils/constant";

export const registerLessor = async (input: {
  email: string;
  phone: string;
  full_name: string;
}) => {
  try {
    return await request.post(API_PATH.MANAGER_SIGNUP, {
      ...input,
      role: "lessor",
      password: "123123123",
    });
  } catch (error) {
    return Promise.reject(error);
    console.log(error);
  }
};
