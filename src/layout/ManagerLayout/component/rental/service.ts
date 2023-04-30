import { privateRequest } from "@/api/request";
import { API_PATH } from "@/utils/constant";

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

export const getDetailApartment = (id: number) => {};

export const getListApartmentTags = () => {
  return privateRequest("GET", API_PATH.APARTMENT_TAGS);
};
