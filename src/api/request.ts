import axios from "axios";
import { getCookie } from "cookies-next";
const instanceRequest = axios.create({
  baseURL: "http://localhost:4000",
});

export const request = instanceRequest;
export const privateRequest = async (
  method: string,
  url: string,
  payload?: any
) => {
  const tokenManager = await getCookie(
    "accessTokenManager"
  );
  return instanceRequest({
    method: method,
    url: url,
    data: payload,
    headers: {
      Authorization: `Bearer ${tokenManager}`,
    },
  });
};
