import { getCookie } from "cookies-next";
export function formatNumber(x: number): string {
  if (!x) return "0";
  const str = Number(x).toFixed(2).toString();
  const arrStr = str.split(".");
  const regex = (val: string) => {
    return val.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  const convertNum =
    arrStr.length === 1
      ? regex(str)
      : `${regex(arrStr[0])},${arrStr[1]}`;
  const splitNum = convertNum.split(",");
  if (splitNum[1] === "00") {
    return splitNum[0];
  } else return convertNum;
}

export const checkLogin = async () => {
  const tokenUser = await getCookie("accessTokenUser");
  if (tokenUser) return true;
  return false;
};
