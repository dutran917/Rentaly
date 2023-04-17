import ManagerLayout from "@/layout/ManagerLayout";
import { useLocalStorageState } from "ahooks";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Manager = () => {
  const [manager, setManager] =
    useLocalStorageState("manager");
  const router = useRouter();
  useEffect(() => {
    //@ts-ignore
    if (!manager?.accessToken) {
      router.push("/manager/login");
    } else {
      router.push("/manager");
    }
  }, [manager]);
  return <ManagerLayout>HOMEPAGE MANAGER</ManagerLayout>;
};

export default Manager;
