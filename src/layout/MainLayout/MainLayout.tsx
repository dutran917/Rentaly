import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import style from "./index.module.scss";
const { Header, Content, Footer } = Layout;

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
    label: <Link href="/register">Bạn là chủ nhà</Link>,
  },
];

const MainLayout = ({ children }: { children: any }) => {
  const router = useRouter();
  console.log(router.pathname);
  const menuOnActive = () => {
    switch (router.pathname) {
      case "/":
        return ["1"];
      case "/rental":
        return ["2"];
      case "/register":
        return ["3"];
    }
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
        <Menu
          className={style.menuBar}
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={menuOnActive()}
          items={items}
        />
      </Header>
      <Content
        // style={{ padding: "0 50px" }}
        className={style.content}
      >
        {children}
        <Footer className={style.footer}>
          © Bản quyền thuộc về <a href="/">Rentaly</a> 2023.
        </Footer>
      </Content>
    </Layout>
  );
};

export default MainLayout;
