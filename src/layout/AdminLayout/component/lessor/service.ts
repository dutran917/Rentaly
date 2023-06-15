import { privateRequestAdmin } from "@/api/request";
import { API_PATH } from "@/utils/constant";

export const getListLessor = (
  {
    current,
    pageSize,
  }: { current: number; pageSize: number },
  formData: {
    verified: string;
  }
) => {
  const query = `?page_size=${pageSize}&page_index=${
    current - 1
  }&verified=${formData.verified || ""}`;
  return privateRequestAdmin(
    "GET",
    API_PATH.ADMIN_GET_LIST_LESSOR + query
  ).then((res) => {
    return {
      list: res.data.data,
      total: res.data.total,
    };
  });
};

export const verifyLessorService = (input: {
  lessor_id: number;
  accept: boolean;
  reason?: string;
}) => {
  if (!input.reason) {
    delete input["reason"];
  }
  return privateRequestAdmin(
    "POST",
    API_PATH.ADMIN_VERIFY_LESSOR,
    { ...input }
  );
};
