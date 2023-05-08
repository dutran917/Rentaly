export const API_PATH = {
  //manager
  MANAGER_LOGIN: "/auth/login",
  MANAGER_INFO: "/user/info-user",
  CREATE_APARTMENT: "/post/apartment",
  CREATE_ROOM: "/post/room",
  APARTMENT_LIST: "/post/apartment-list",
  APARTMENT_TAGS: "/post/apartment-tag",
  ROOM_TAGS: "/post/room-tag",
  APARTMENT_DETAIL: (id: number) => `/post/apartment/${id}`,
  ROOM_LIST: (id: number) => `/post/room-list/${id}`,
};
