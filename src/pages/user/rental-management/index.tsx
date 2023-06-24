import HistoryRent from "@/layout/MainLayout/Component/UserInfo/HistoryRent";
import UserInfoLayout from "@/layout/MainLayout/Component/UserInfo/UserInfoLayout";
import MainLayout from "@/layout/MainLayout/MainLayout";
import React from "react";

const UserRentalManagePage = () => {
  return (
    <MainLayout>
      <UserInfoLayout>
        <HistoryRent />
      </UserInfoLayout>
      ;
    </MainLayout>
  );
};

export default UserRentalManagePage;
