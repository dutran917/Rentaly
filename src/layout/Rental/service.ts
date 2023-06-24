import {
  privateRequest,
  privateRequestUser,
  request,
} from "@/api/request";
import { API_PATH } from "@/utils/constant";

interface GetListRentalInput {
  page_size: number;
  page_index: number;
  search: string;
  district: string;
  price: string[];
  type: string[];
  lat?: number;
  long?: number;
}

interface GetListRoom {
  apartmentId: number;
  bed_room: number;
  living_room: number;
}

interface CreateApointmentInput {
  roomId: number;

  fullName: string;

  phone: string;

  date: string;

  note: string;

  apartmentId: number;
}

export const getListRental = (
  query: GetListRentalInput
) => {
  let q = `page_size=${query.page_size}&page_index=${
    query.page_index - 1
  }`;
  if (query.price?.length) {
    q += `&price[0]=${query.price[0]}&price[1]=${query.price[1]}`;
  }
  if (query.type?.length) {
    q += `&living_room=${query.type[0]}&bed_room=${query.type[1]}`;
  }
  if (query.search) {
    q += `&search=${query.search}`;
  }
  if (query.district) {
    q += `&district=${query.district}`;
  }
  if (!!query.lat && !!query.long) {
    q += `&lat=${query.lat}&long=${query.long}`;
  }
  return privateRequest(
    "GET",
    API_PATH.GET_LIST_RENTAL + "?" + q
  );
};

export const getDetailApartment = (id: number) => {
  return request.get(API_PATH.GET_DETAIL_APARTMENT(id));
};

export const getListRoom = (query: GetListRoom) => {
  let q = `apartmentId=${query.apartmentId}&bed_room=${query.bed_room}&living_room=${query.living_room}`;
  return request.get(API_PATH.GET_LIST_ROOM + "?" + q);
};

export const getRoom = (roomId: number) => {
  return request.get(API_PATH.GET_ROOM_DETAIL(roomId));
};

export const createApointmentService = (
  data: CreateApointmentInput
) => {
  return request.post(API_PATH.CREATE_APOINTMENT, data);
};

export const getListUniversity = () => {
  return request.get(API_PATH.LIST_UNIVERSITY);
};

export const getVNPayRedirect = (input: {
  room_id: number;
  price: number;
  start_time: string;
  end_time: string;
}) => {
  return privateRequestUser(
    "GET",
    API_PATH.VNPAY_REDIRECT +
      `?price=${input.price}&room_id=${input.room_id}&start_time=${input.start_time}&end_time=${input.end_time}`
  );
};
