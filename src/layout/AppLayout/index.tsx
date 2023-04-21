import { useMount } from "ahooks";
import { useProfile } from "@/store/ManagerProfile/useProfile";

const AppLayout = ({ children }: any) => {
  const { requestGetProfile } = useProfile();
  useMount(() => {
    requestGetProfile.run();
  });

  if (requestGetProfile.loading) return null;

  return <div>{children}</div>;
};

export default AppLayout;
