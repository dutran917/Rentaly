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
        <h2>TẠI SAO NÊN CHỌN RENTALY ?</h2>
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
            <img src="https://bandon.vn/images/icon-server-02.png" />
            <div className={style.title}></div>
            <div className={style.title}>Giá điện</div>
            <p>
              Người thuê phòng sẽ được "trả tiền điện" theo
              đúng "khung giá nhà nước".
            </p>
          </div>
          <div className={style.item}>
            <img src="https://bandon.vn/images/icon-server-03.png" />
            <div className={style.title}>
              Nước sinh hoạt
            </div>
            <p>
              Người thuê phòng không phải lo "thiếu nước
              sạch" hay "giá tiền nước cao".
            </p>
          </div>

          <div className={style.item}>
            <img src="https://bandon.vn/images/icon-server-04.png" />
            <div className={style.title}>An ninh</div>
            <p>
              Hệ thống an ninh đảm bảo an toàn từ "camera
              giám sát" đến "bảo mật vân tay".
            </p>
          </div>
          <div className={style.item}>
            <img src="https://bandon.vn/images/icon-server-05.png" />
            <div className={style.title}>Văn hóa</div>
            <p>
              Nếp sống văn hóa lành mạnh, thân thiện & gần
              gũi trong khu nhà trọ.
            </p>
          </div>
          <div className={style.item}>
            <img src="https://bandon.vn/images/icon-server-06.png" />
            <div className={style.title}>Hỗ trợ 24H</div>
            <p>
              Đội ngũ vận hành hỗ trợ 24h, xử lý mọi vấn đề
              cho người thuê phòng.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
