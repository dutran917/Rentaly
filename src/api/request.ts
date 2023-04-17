import axios from "axios";
const instanceRequest = axios.create({
  baseURL: "http://localhost:4000",
});
let token;
if (typeof window !== "undefined") {
  // Perform localStorage action
  token = localStorage.getItem("accessToken");
}

export const request = instanceRequest;
// export const privateRequest = instanceRequest({
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// });
