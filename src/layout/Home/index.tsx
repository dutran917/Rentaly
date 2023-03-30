import { Carousel } from "antd";
import React from "react";
import style from "./index.module.scss";
const HomePage = () => {
  return (
    <div>
      <Carousel autoplay>
        <div className={style.banner1}>
          <div className={style.bannerContent1}>
            ĐƠN VỊ SỐ 1 VẬN HÀNH CHUNG CƯ MINI
          </div>
        </div>
        <div className={style.banner2}>
          <div className={style.bannerContent2}>
            PROVIP TOP 1 VIET NAM
          </div>
        </div>
      </Carousel>
      <div className={style.section}>
        <h2>TẠI SAO NÊN CHỌN RENTALY</h2>
        <span className={style.borderIcon}>
          <span className={style.titleIcon}></span>
        </span>
        <div className={style.sectionItem}>
          <div className={style.item}>
            <img src="https://bandon.vn/images/icon-server-01.png" />
            <div className={style.title}>Căn hộ</div>
            <p>
              Vệ sinh sạch sẽ, không gian thoáng mát, đầy đủ
              nội thất lắp đặt mới.
            </p>
          </div>
          <div className={style.item}>
            <img src="https://bandon.vn/images/icon-server-01.png" />
            <div className={style.title}></div>
            <p>
              Vệ sinh sạch sẽ, không gian thoáng mát, đầy đủ
              nội thất lắp đặt mới.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
