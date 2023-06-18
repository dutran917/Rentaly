import AdminLayout from "@/layout/AdminLayout/AdminLayout";
import DetailApartment from "@/layout/AdminLayout/component/apartment/DetailApartment";
import React from "react";

const ApartmentManagePage = () => {
  return (
    <AdminLayout>
      <DetailApartment />
    </AdminLayout>
  );
};

export default ApartmentManagePage;
