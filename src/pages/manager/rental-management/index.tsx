import ManagerLayout from "@/layout/ManagerLayout";
import RentalManage from "@/layout/ManagerLayout/component/rental";
import React from "react";

const RentalManagement = () => {
  console.log("render");

  return (
    <ManagerLayout>
      <RentalManage />
    </ManagerLayout>
  );
};

export default RentalManagement;
