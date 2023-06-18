import { privateRequest } from "@/api/request";
import { API_PATH } from "@/utils/constant";

interface CreateApartmentInput {
  title: string;
  subtitle: string;
  content: string;
  address: string;
  lat: number;
  long: number;
  district: string;
  province: string;
  image: string[];
  tags: number[];
}

export interface EditApartmentInput {
  title: string;
  subtitle: string;
  content: string;
  image: string[];
  tags: number[];
  lat: number;
  long: number;
  district: string;
  address: string;
}

export interface CreateRoomInput {
  title: string;
  price: number;
  maximum: number;
  bed_room: number;
  tags: number[];
  area: number;
}

export const createApartment = (
  input: CreateApartmentInput
) => {
  return privateRequest("POST", API_PATH.CREATE_APARTMENT, {
    ...input,
  });
};

export const editApartment = (
  apartmentId: number,
  input: EditApartmentInput
) => {
  return privateRequest("PATCH", API_PATH.EDIT_APARTMENT, {
    apartmentId,
    ...input,
  });
};

export const createRoom = (
  apartmentId: number,
  input: CreateRoomInput
) => {
  return privateRequest("POST", API_PATH.CREATE_ROOM, {
    ...input,
    apartmentId,
  });
};

export const getListApartment = (
  {
    current,
    pageSize,
  }: { current: number; pageSize: number },
  formData: {
    searchValue: string;
  }
) => {
  const query = `?page_size=${pageSize}&page_index=${
    current - 1
  }&search=${formData.searchValue || ""}`;
  return privateRequest(
    "GET",
    API_PATH.APARTMENT_LIST + query
  ).then((res) => {
    return {
      list: res.data.data,
      total: res.data.total,
    };
  });
};

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
  return privateRequest(
    "GET",
    API_PATH.ROOM_LIST(id) + query
  ).then((res) => {
    return {
      list: res.data.data,
      total: res.data.total,
    };
  });
};

export const getDetailApartment = (id: number) => {
  return privateRequest(
    "GET",
    API_PATH.APARTMENT_DETAIL(id)
  );
};

export const getListApartmentTags = () => {
  return privateRequest("GET", API_PATH.APARTMENT_TAGS);
};

export const getListRoomTags = () => {
  return privateRequest("GET", API_PATH.ROOM_TAGS);
};
