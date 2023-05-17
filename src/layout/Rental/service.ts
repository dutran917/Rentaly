import { privateRequest, request } from "@/api/request";
import { API_PATH } from "@/utils/constant";

interface GetListRentalInput {
  page_size: number;
  page_index: number;
  search: string;
  district: string;
  price: string[];
  type: string[];
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
  return privateRequest(
    "GET",
    API_PATH.GET_LIST_RENTAL + "?" + q
  );
};

export const getDetailApartment = (id: number) => {
  return request.get(API_PATH.GET_DETAIL_APARTMENT(id));
};
