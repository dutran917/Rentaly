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
import { deleteCookie, getCookies } from "cookies-next";
import { useProfile } from "@/store/ManagerProfile/useProfile";
import { initialManagerProfile } from "@/store/ManagerProfile/profile";
import ManagerProfile from "./component/Profile";
const { Header, Sider, Content } = Layout;

const ManagerLayout = ({ children }: { children: any }) => {
  const [collapsed, setCollapsed] = useState(false);
  //@ts-ignore
  const { profile, setProfile } = useProfile();

  const router = useRouter();
  const handleLogout = () => {
    router.push("/manager/login");
    setProfile(initialManagerProfile);
    deleteCookie("managerId");
    deleteCookie("accessTokenManager");
  };
  const activeMenu = () => {
    switch (router.pathname) {
      case "/manager/dashboard":
        return ["1"];
      case "/manager/rental-management":
        return ["2"];
      case "/manager/service-management":
        return ["3"];
      case "/manager/booking-management":
        return ["4"];
      default:
        return [];
    }
  };

  const [isOpenProfile, setIsOpenProfile] = useState(false);

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
        <div className={styles.logo}>
          {!collapsed && (
            <img
              src="https://res.cloudinary.com/deiijz7oj/image/upload/v1682071326/qrd8wf7wpyvzykp0e4fn.png"
              style={{
                width: "150px",
                height: "50px",
              }}
            />
          )}
        </div>
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
              icon: <PieChartOutlined />,
              label: (
                <div
                  onClick={() => {
                    router.push("/manager/dashboard");
                  }}
                >
                  Thông tin chung
                </div>
              ),
            },
            {
              key: "2",
              icon: <HomeOutlined />,
              label: (
                <div
                  onClick={() => {
                    router.push(
                      "/manager/rental-management"
                    );
                  }}
                >
                  Quản lý chung cư
                </div>
              ),
            },
            // {
            //   key: "3",
            //   icon: <UserOutlined />,
            //   label: (
            //     <div
            //       onClick={() => {
            //         router.push(
            //           "/manager/service-management"
            //         );
            //       }}
            //     >
            //       Quản lý dịch vụ
            //     </div>
            //   ),
            // },
            {
              key: "4",
              icon: <CalendarOutlined />,
              label: (
                <div
                  onClick={() => {
                    router.push(
                      "/manager/booking-management"
                    );
                  }}
                >
                  Quản lý lịch xem phòng
                </div>
              ),
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: "5px 15px",
            borderBottom: "1px solid rgba(0,0,0,0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {React.createElement(
            collapsed
              ? MenuUnfoldOutlined
              : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}

          {profile && (
            <>
              <Space>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: 600,
                  }}
                >
                  <Button
                    type="text"
                    onClick={() => setIsOpenProfile(true)}
                    className={styles.btnShowProfile}
                  >
                    {profile?.full_name}
                  </Button>
                </div>
                <Button
                  icon={<LogoutOutlined />}
                  danger
                  title="Đăng xuất"
                  onClick={handleLogout}
                ></Button>
              </Space>
            </>
          )}
        </Header>
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
      {isOpenProfile && (
        <ManagerProfile
          isOpen={isOpenProfile}
          setIsOpen={setIsOpenProfile}
        />
      )}
    </Layout>
  );
};

export default ManagerLayout;
