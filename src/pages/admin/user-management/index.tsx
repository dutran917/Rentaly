import AdminLayout from "@/layout/AdminLayout/AdminLayout";
import UserManager from "@/layout/AdminLayout/component/user";
import React from "react";

const UserManagementPage = () => {
  return (
    <AdminLayout>
      <UserManager />
    </AdminLayout>
  );
};

export default UserManagementPage;
