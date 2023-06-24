import UserInfoLayout from "@/layout/MainLayout/Component/UserInfo/UserInfoLayout";
import UserProfile from "@/layout/MainLayout/Component/UserInfo/UserProfile";
import MainLayout from "@/layout/MainLayout/MainLayout";
import React from "react";

const UserProfilePage = () => {
  return (
    <MainLayout>
      <UserInfoLayout>
        <UserProfile />
      </UserInfoLayout>
      ;
    </MainLayout>
  );
};

export default UserProfilePage;
