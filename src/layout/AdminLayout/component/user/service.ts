import { privateRequestAdmin } from "@/api/request";
import { API_PATH } from "@/utils/constant";

export const getListUser = (
  {
    current,
    pageSize,
  }: { current: number; pageSize: number },
  formData: {
    search: string;
  }
) => {
  let q = `?page_size=${pageSize}&page_index=${
    current - 1
  }`;
  if (!!formData.search) {
    q += `&search=${formData.search}`;
  }

  return privateRequestAdmin(
    "GET",
    API_PATH.ADMIN_GET_LIST_USER + q
  ).then((res) => {
    return {
      list: res.data.data,
      total: res.data.total,
    };
  });
};
