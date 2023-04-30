import { useMount } from "ahooks";
import { useProfile } from "@/store/ManagerProfile/useProfile";
import { useRouter } from "next/router";

const AppLayout = ({ children }: any) => {
  const { requestGetProfile } = useProfile();
  const router = useRouter();
  useMount(() => {
    if (
      router.pathname.includes("manager") &&
      !router.pathname.includes("login")
    ) {
      requestGetProfile.run();
    }
  });

  if (requestGetProfile.loading) return null;

  return <div>{children}</div>;
};

export default AppLayout;
