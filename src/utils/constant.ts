export const API_PATH = {
  //manager
  MANAGER_LOGIN: "/auth/login",
  MANAGER_INFO: "/user/info-user",
  CREATE_APARTMENT: "/post/apartment",
  APARTMENT_LIST: "/post/apartment-list",
  APARTMENT_TAGS: "/post/apartment-tag",
  APARTMENT_DETAIL: (id: number) => `/post/apartment/${id}`,
};
