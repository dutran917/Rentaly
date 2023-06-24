import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  UserOutlined,
  PieChartOutlined,
  CalendarOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Space } from "antd";
import styles from "./index.module.scss";
import { useRouter } from "next/router";

import { useProfile } from "@/store/ManagerProfile/useProfile";

const { Header, Sider, Content } = Layout;
const UserInfoLayout = ({
  children,
}: {
  children: any;
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const activeMenu = () => {
    switch (router.pathname) {
      case "/user/profile":
        return ["1"];
      case "/user/rental-management":
        return ["2"];
      // case "/user/booking-management":
      //   return ["3"];
      default:
        return [];
    }
  };
  return (
    <Layout className={styles.managerLayout}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          borderRight: "1px solid rgba(0,0,0,0.1)",
          minWidth: "270px",
          // width: 270px;
        }}
      >
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={activeMenu()}
          style={{
            height: "100vh",
            marginTop: "20px",
          }}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: (
                <div
                  onClick={() => {
                    router.push("/user/profile");
                  }}
                >
                  Thông tin người dùng
                </div>
              ),
            },
            {
              key: "2",
              icon: <HomeOutlined />,
              label: (
                <div
                  onClick={() => {
                    router.push("/user/rental-management");
                  }}
                >
                  Phòng đã thuê
                </div>
              ),
            },

            // {
            //   key: "4",
            //   icon: <CalendarOutlined />,
            //   label: (
            //     <div
            //       onClick={() => {
            //         router.push("/user/booking-management");
            //       }}
            //     >
            //       Lịch xem phòng
            //     </div>
            //   ),
            // },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserInfoLayout;
