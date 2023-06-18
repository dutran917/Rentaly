import AdminLayout from "@/layout/AdminLayout/AdminLayout";
import ApartmentManage from "@/layout/AdminLayout/component/apartment";
import React from "react";

const ApartmentManagePage = () => {
  return (
    <AdminLayout>
      <ApartmentManage />
    </AdminLayout>
  );
};

export default ApartmentManagePage;
