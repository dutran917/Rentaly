import axios from "axios";
import { getCookie } from "cookies-next";
const instanceRequest = axios.create({
  baseURL: "http://localhost:4000",
});

const token = getCookie("accessTokenManager");

export const request = instanceRequest;
export const privateRequest = (
  method: string,
  url: string,
  payload?: any
) =>
  instanceRequest({
    method: method,
    url: url,
    data: payload,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
