import { Breadcrumb, Row, Tabs } from "antd";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { LeftOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";

import { useRouter } from "next/router";
import EditApartmentForm from "./EditApartmentForm";
import { useRequest } from "ahooks";
import { getDetailApartment } from "./service";
import RoomList from "./RoomList";
const EditApartment = () => {
  const [tab, setTab] = useState("1");
  const [dataApartment, setDataApartment] = useState<any>();
  const router = useRouter();
  const { id } = router.query;

  const detailApartment = useRequest(getDetailApartment, {
    manual: true,
    onSuccess: (res) => {
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      setDataApartment(res.data);
    },
  });

  useEffect(() => {
    if (id) {
      detailApartment.run(Number(id));
    }
  }, [id]);
  const renderTab = () => {
    switch (tab) {
      case "1":
        return (
          <EditApartmentForm
            refresh={detailApartment.refresh}
            infoApartment={dataApartment?.data}
          />
        );
      case "2":
        return <RoomList />;
      default:
        return null;
    }
  };

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
        items={[
          {
            key: "1",
            tabKey: "1",
            label: "Thông tin tòa nhà",
          },
          {
            key: "2",
            tabKey: "2",
            label: "Quản lý phòng",
            disabled:
              router.pathname.includes("add-apartment"),
          },
        ]}
      >
        {/* <Tabs.TabPane
          key="1"
          tab="Thông tin tòa nhà"
        ></Tabs.TabPane>
        <Tabs.TabPane
          disabled={router.pathname.includes(
            "add-apartment"
          )}
          key="2"
          tab="Quản lý phòng"
        ></Tabs.TabPane> */}
      </Tabs>
      {renderTab()}
    </div>
  );
};

export default EditApartment;
