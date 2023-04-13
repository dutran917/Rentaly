import React from "react";
import styles from "./index.module.scss";
import { Breadcrumb } from "antd";
const RentMainPage = () => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.mainFilter}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="/">Trang chủ</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="rental">Thuê phòng và CCMN</a>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
    </div>
  );
};

export default RentMainPage;
