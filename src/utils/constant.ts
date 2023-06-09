export const API_PATH = {
  //manager
  MANAGER_SIGNUP: "/auth/register-user",
  MANAGER_LOGIN: "/auth/login",
  MANAGER_INFO: "/user/info-user",
  CREATE_APARTMENT: "/post/apartment",
  EDIT_APARTMENT: "/post/edit-apartment",
  CREATE_ROOM: "/post/room",
  APARTMENT_LIST: "/post/apartment-list",
  APARTMENT_TAGS: "/post/apartment-tag",
  ROOM_TAGS: "/post/room-tag",
  APARTMENT_DETAIL: (id: number) => `/post/apartment/${id}`,
  ROOM_LIST: (id: number) => `/post/room-list/${id}`,
  //user
  GET_LIST_RENTAL: "/rental/list-apartment",
  GET_DETAIL_APARTMENT: (id: number) =>
    `/rental/detail-apartment/${id}`,
  GET_LIST_ROOM: "/rental/list-room",
  GET_ROOM_DETAIL: (id: number) => `/rental/room/${id}`,
};
