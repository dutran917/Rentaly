import { privateRequest } from "@/api/request";
import { API_PATH } from "@/utils/constant";

export const getStatisticService = ({
  apartmentId,
  year,
}: {
  apartmentId: number;
  year: string;
}) => {
  return privateRequest(
    "GET",
    API_PATH.STATISTIC +
      `?apartmentId=${apartmentId}&year=${year}`
  );
};
