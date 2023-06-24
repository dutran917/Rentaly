import { privateRequest } from "@/api/request";
import { API_PATH } from "@/utils/constant";
import moment from "moment";

export const getListApointment = async (
  {
    current,
    pageSize,
  }: { current: number; pageSize: number },
  formData: {
    date: any[];
    apartmentId: number;
  }
) => {
  let q = `?page_size=${pageSize}&page_index=${
    current - 1
  }`;
  const { date, apartmentId } = formData;
  if (Array.isArray(date) && date.length > 1) {
    q += `&time_end=${moment(
      formData.date[1]
    ).toISOString()}&time_start=${moment(
      formData.date[0]
    ).toISOString()}`;
  }
  if (!!apartmentId) {
    q += `&apartmentId=${apartmentId}`;
  }
  return await privateRequest(
    "GET",
    API_PATH.APOINTMENT_LIST + q
  ).then((res) => {
    return {
      list: res.data.data,
      total: res.data.total,
    };
  });
};

export const getAllApartment = () => {
  return privateRequest("GET", API_PATH.ALL_APARTMENT);
};

export const changeStatusApointment = (
  status: boolean,
  id: number
) => {
  return privateRequest(
    "POST",
    API_PATH.CHANGE_APOINTMENT,
    {
      status,
      id,
    }
  );
};
