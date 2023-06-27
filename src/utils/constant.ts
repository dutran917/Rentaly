interface IDistrict {
  label: string;
  value: string;
}
export const API_PATH = {
  //manager
  MANAGER_SIGNUP: "/auth/register-user",
  MANAGER_LOGIN: "/auth/lessor-login",
  MANAGER_INFO: "/lessor/info-manager",
  UPDATE_PROFILE: "/lessor/update-info",
  CREATE_APARTMENT: "/post/apartment",
  EDIT_APARTMENT: "/post/edit-apartment",
  CREATE_ROOM: "/post/room",
  APARTMENT_LIST: "/post/apartment-list",
  ALL_APARTMENT: "/post/all-apartment",
  APARTMENT_TAGS: "/post/apartment-tag",
  ROOM_TAGS: "/post/room-tag",
  APOINTMENT_LIST: "/lessor/list-apointment",
  CHANGE_APOINTMENT: "/lessor/handle-apointment",
  APARTMENT_DETAIL: (id: number) => `/post/apartment/${id}`,
  ROOM_DETAIL: (id: number) => `/post/room/${id}`,
  ROOM_LIST: (id: number) => `/post/room-list/${id}`,
  STATISTIC: "/statistic/apartment",

  //user
  REGISTER_USER: "/auth/register-user",
  LOGIN_USER: "/auth/user-login",
  USER_INFO: "/user/info-user",
  GET_LIST_RENTAL: "/rental/list-apartment",
  GET_DETAIL_APARTMENT: (id: number) =>
    `/rental/detail-apartment/${id}`,
  GET_LIST_ROOM: "/rental/list-room",
  GET_ROOM_DETAIL: (id: number) => `/rental/room/${id}`,
  CREATE_APOINTMENT: "/rental/apointment",
  LIST_UNIVERSITY: "/rental/list-university",
  VNPAY_REDIRECT: "/payment/redirect-vnpay",
  HISTORY_RENT: "/user/history-rent",

  //admin
  ADMIN_LOGIN: "/auth/admin-login",
  ADMIN_INFO: "/admin/info-admin",
  ADMIN_GET_LIST_LESSOR: "/admin/register-lessor",
  ADMIN_VERIFY_LESSOR: "/admin/approve-lessor",
  ADMIN_GET_LIST_APARTMNET: "/admin/list-apartment",
  ADMIN_APPROVE_APARTMENT: "/admin/approve-apartment",
  ADMIN_GET_DETAIL_APARTMENT: (id: number) =>
    `/admin/detail-apartment/${id}`,
  ADMIN_EDIT_APARTMENT: "/admin/edit-apartment",
  ADMIN_GET_ROOM_LIST: (id: number) =>
    `/admin/room-list/${id}`,
};

export const district: IDistrict[] = [
  {
    label: "Đống đa",
    value: "Đống Đa",
  },
  {
    label: "Ba Đình",
    value: "Ba Đình",
  },
  {
    label: "Hai Bà Trưng",
    value: "Hai Bà Trưng",
  },
  {
    label: "Hoàn Kiếm",
    value: "Hoàn Kiếm",
  },
  {
    label: "Tây Hồ",
    value: "Tây Hồ",
  },
  {
    label: "Long Biên",
    value: "Long Biên",
  },
  {
    label: "Hoàng Mai",
    value: "Hoàng Mai",
  },
  {
    label: "Hà Đông",
    value: "Hà Đông",
  },

  {
    label: "Cầu Giấy",
    value: "Cầu Giấy",
  },
  {
    label: "Mỹ Đình",
    value: "Mỹ Đình",
  },
  {
    label: "Bắc Từ Liêm",
    value: "Bắc Từ Liêm",
  },
  {
    label: "Nam Từ Liêm",
    value: "Nam Từ Liêm",
  },
];
