import { privateRequestAdmin } from "@/api/request";
import {
  CreateRoomInput,
  EditApartmentInput,
} from "@/layout/ManagerLayout/component/rental/service";
import { API_PATH } from "@/utils/constant";

enum VERIFY_STATUS {
  PENDING = "PENDING",
  ACCEPT = "ACCEPT",
  REFUSE = "REFUSE",
}

export const getListApartment = (
  {
    current,
    pageSize,
  }: { current: number; pageSize: number },
  formData: {
    search: string;
    district: string;
    verified: VERIFY_STATUS;
  }
) => {
  let q = `?page_size=${pageSize}&page_index=${
    current - 1
  }`;
  if (!!formData.search) {
    q += `&search=${formData.search}`;
  }
  if (!!formData.district) {
    q += `&district=${formData.district}`;
  }
  if (!!formData.verified) {
    q += `&verified=${formData.verified}`;
  }
  return privateRequestAdmin(
    "GET",
    API_PATH.ADMIN_GET_LIST_APARTMNET + q
  ).then((res) => {
    console.log(res);

    return {
      list: res.data.data,
      total: res.data.total,
    };
  });
};

export const approveApartmentService = (input: {
  apartmentId: number;
  approve: boolean;
}) => {
  return privateRequestAdmin(
    "POST",
    API_PATH.ADMIN_APPROVE_APARTMENT,
    { ...input }
  );
};

export const getDetailApartment = (id: number) => {
  return privateRequestAdmin(
    "GET",
    API_PATH.ADMIN_GET_DETAIL_APARTMENT(id)
  );
};

export const editApartment = (
  apartmentId: number,
  input: EditApartmentInput
) => {
  return privateRequestAdmin(
    "PATCH",
    API_PATH.ADMIN_EDIT_APARTMENT,
    {
      apartmentId,
      ...input,
    }
  );
};

// export const createRoom = (
//   apartmentId: number,
//   input: CreateRoomInput
// ) => {
//   return privateRequestAdmin("POST", API_PATH.CREATE_ROOM, {
//     ...input,
//     apartmentId,
//   });
// };

export const getListRoom = (
  {
    current,
    pageSize,
    id,
  }: { current: number; pageSize: number; id: number },
  formData: {
    searchValue: string;
  }
) => {
  const query = `?page_size=${pageSize}&page_index=${
    current - 1
  }&search=${formData.searchValue || ""}`;
  return privateRequestAdmin(
    "GET",
    API_PATH.ADMIN_GET_ROOM_LIST(id) + query
  ).then((res) => {
    return {
      list: res.data.data,
      total: res.data.total,
    };
  });
};
