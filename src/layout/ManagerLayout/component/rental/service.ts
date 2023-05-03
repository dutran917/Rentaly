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

export const createApartment = (
  input: CreateApartmentInput
) => {
  return privateRequest("POST", API_PATH.CREATE_APARTMENT, {
    ...input,
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

export const getDetailApartment = (id: number) => {
  return privateRequest(
    "GET",
    API_PATH.APARTMENT_DETAIL(id)
  );
};

export const getListApartmentTags = () => {
  return privateRequest("GET", API_PATH.APARTMENT_TAGS);
};
