import { Breadcrumb, Row, Tabs } from "antd";

import Link from "next/link";
import React, { useState } from "react";
import { LeftOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";

import { useRouter } from "next/router";
import EditApartmentForm from "./EditApartmentForm";
const EditApartment = () => {
  const [tab, setTab] = useState("1");
  const renderTab = () => {
    switch (tab) {
      case "1":
      // return <EditApartmentForm />;
      case "2":
        return <>rooms</>;
      default:
        return null;
    }
  };
  const router = useRouter();
  return (
    <div>
      <Breadcrumb className={styles.breadcrumb}>
        <Breadcrumb.Item>
          <Link href="/manager/rental-management">
            <Row align="middle">
              <LeftOutlined />
              <div>Quản lý chung cư</div>
            </Row>
          </Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Tabs
        onChange={(key) => setTab(key)}
        defaultActiveKey={tab}
      >
        <Tabs.TabPane
          key="1"
          tab="Thông tin tòa nhà"
        ></Tabs.TabPane>
        <Tabs.TabPane
          disabled={router.pathname.includes(
            "add-apartment"
          )}
          key="2"
          tab="Quản lý phòng"
        ></Tabs.TabPane>
      </Tabs>
      {renderTab()}
    </div>
  );
};

export default EditApartment;
