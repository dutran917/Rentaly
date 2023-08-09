import { privateRequestAdmin } from "@/api/request";
import { API_PATH } from "@/utils/constant";

export const getListLessor = (
  {
    current,
    pageSize,
  }: { current: number; pageSize: number },
  formData: {
    verified: string;
    search: string;
  }
) => {
  const query = `?page_size=${pageSize}&page_index=${
    current - 1
  }&verified=${formData.verified || ""}&search=${
    formData.search || ""
  }`;
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

export const getDetailLessor = (idLessor: number) => {
  return privateRequestAdmin(
    "GET",
    API_PATH.AMDIN_GET_DETAIL_LESSOR(idLessor)
  );
};

export const updateProfileLessor = (input: {
  lessorId: number;
  full_name?: string;
  phone?: string;
  email?: string;
  password?: string;
}) => {
  return privateRequestAdmin(
    "POST",
    API_PATH.ADMIN_UPDATE_LESSOR,
    {
      ...input,
    }
  );
};

export const blockUserService = (input: {
  userId: number;
  status: boolean;
}) => {
  return privateRequestAdmin("POST", API_PATH.BLOCK_USER, {
    ...input,
  });
};

export const createLessorService = (input: {
  email: string;
  phone: string;
  full_name: string;
  password: string;
}) => {
  return privateRequestAdmin(
    "POST",
    API_PATH.ADMIN_CREATE_LESSOR,
    {
      ...input,
    }
  );
};
