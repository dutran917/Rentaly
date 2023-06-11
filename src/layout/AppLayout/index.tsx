import { useMount } from "ahooks";
import { useProfile } from "@/store/ManagerProfile/useProfile";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";

const AppLayout = ({ children }: any) => {
  const { requestGetProfile, requestGetProfileUser } =
    useProfile();
  const router = useRouter();
  const getTokenUser = () => {
    const tokenUser = getCookie("accessTokenUser");
    return tokenUser;
  };
  useMount(() => {
    if (
      router.pathname.includes("manager") &&
      !router.pathname.includes("login")
    ) {
      requestGetProfile.run();
    }
    const token = getTokenUser();
    if (token) {
      requestGetProfileUser.run();
    }
  });

  if (requestGetProfile.loading) return null;

  return <div>{children}</div>;
};

export default AppLayout;
