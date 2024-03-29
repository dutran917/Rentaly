import type { MenuProps } from "antd";
import {
  Avatar,
  Button,
  Dropdown,
  Layout,
  Menu,
} from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import style from "./index.module.scss";
import { useProfile } from "@/store/ManagerProfile/useProfile";
import { deleteCookie } from "cookies-next";
import {
  LoginOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import LoginModal from "./Component/LoginModal";
import {
  UserOutlined,
  LogoutOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { initialUserProfile } from "@/store/ManagerProfile/profile";
const { Header, Content, Footer } = Layout;

const MainLayout = ({ children }: { children: any }) => {
  const router = useRouter();
  const { setProfileUser, profileUser } = useProfile();
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const items = [
    {
      key: "1",
      label: <Link href="/">Trang chủ</Link>,
    },
    {
      key: "2",
      label: <Link href="/rental">Thuê phòng và CCMN</Link>,
      path: "/rental",
    },
    {
      key: "3",
      label: (
        <Link href="/manager-register">Bạn là chủ nhà</Link>
      ),
    },
    {
      key: "4",
      label: (
        <div className={style.profile}>
          {profileUser.id ? (
            <Dropdown
              menu={{
                items: [
                  {
                    key: "1",
                    label: (
                      <a href="/user/profile">
                        {profileUser.full_name}
                      </a>
                    ),
                    style: {
                      padding: "10px 20px",
                      width: "200px",
                    },
                    icon: <UserOutlined />,
                  },

                  {
                    key: "3",
                    icon: <LogoutOutlined />,
                    style: {
                      color: "red",
                      padding: "10px 20px",
                      width: "200px",
                    },
                    label: (
                      <div onClick={() => handleLogout()}>
                        Đăng xuất
                      </div>
                    ),
                  },
                ],
              }}
            >
              <Avatar
                size={32}
                icon={<UserOutlined />}
                style={{
                  cursor: "pointer",
                }}
              ></Avatar>
            </Dropdown>
          ) : (
            <Button
              onClick={() => setIsOpenLogin(true)}
              className={style.loginBtn}
              type="text"
              icon={<LoginOutlined />}
            >
              Đăng nhập
            </Button>
          )}
        </div>
      ),
    },
  ];
  const menuOnActive = () => {
    switch (router.pathname) {
      case "/":
        return ["1"];
      case "/rental":
        return ["2"];
      case "/manager-register":
        return ["3"];
    }
  };
  const handleLogout = () => {
    setProfileUser(initialUserProfile);
    deleteCookie("userId");
    deleteCookie("accessTokenUser");
  };

  return (
    <Layout>
      <Header className={style.header}>
        <div className={style.logo}>
          <img
            src="/images/logo.png"
            style={
              {
                // width: "180px",
                // height: "50px",
              }
            }
          />
        </div>
        {/* <div className={style.menuWrapper}> */}
        <Menu
          className={style.menuBar}
          mode="horizontal"
          // disabledOverflow={true}
          defaultSelectedKeys={menuOnActive()}
          overflowedIndicator={<MenuOutlined />}
          items={items}
          inlineIndent={40}
        />
        {/* </div> */}
      </Header>
      <Content
        // style={{ padding: "0 50px" }}
        className={style.content}
      >
        {children}
      </Content>
      <Footer className={style.footer}>
        © Bản quyền thuộc về <a href="/">Rentaly</a> 2023.
      </Footer>
      <LoginModal
        isOpen={isOpenLogin}
        setIsOpen={setIsOpenLogin}
      />
    </Layout>
  );
};

export default MainLayout;
