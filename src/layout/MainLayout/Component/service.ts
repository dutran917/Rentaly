import { request } from "@/api/request";
import { API_PATH } from "@/utils/constant";

export const RegisterUserService = async (input: {
  email: string;
  password: string;
  phone?: string;
  full_name: string;
}) => {
  return await request.post(API_PATH.REGISTER_USER, {
    ...input,
    role: "user",
  });
};

export const loginUserService = async (input: {
  username: string;
  password: string;
}) => {
  return await request.post(API_PATH.LOGIN_USER, {
    ...input,
  });
};
