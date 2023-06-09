import React from "react";
import styles from "./index.module.scss";
import { Button, Col, Form, Input, Row } from "antd";
const ManagerRegister = () => {
  return (
    <div>
      <div className={styles.banner}>
        <div className={styles.bannerrContainer}>
          <div className={styles.bannerInfo}>
            <p className={styles.bannerInfoTitle}>
              BẠN CÓ GẶP KHÓ KHĂN TRONG VIỆC QUẢN LÝ NHÀ TRỌ
              KHÔNG?
            </p>
            <p className={styles.bannerInfoContent}>
              Thay vì quản lý một cách thủ công mọi công
              việc trong khu nhà trọ từ việc "Tìm kiếm người
              thuê phòng, quản lý các phòng trọ, đảm bảo an
              ninh, đi thu tiền phòng,..."
            </p>
            <div className={styles.bannerInfoScroll}>
              HÃY ĐỂ RENTALY GIÚP BẠN
            </div>
          </div>
        </div>
      </div>
      <div className={styles.managerRegister}>
        <div className={styles.managerRegisterContainer}>
          <div className={styles.registerTitle}>
            <p>Đăng ký làm đối tác với Rentaly</p>
          </div>
          <Row
            justify="space-between"
            style={
              {
                //   margin: "18px 0",
              }
            }
          >
            <Col span={9}>
              <p className={styles.resgisterSubContent}>
                BẠN CHỈ CẦN CÓ NHÀ TRỌ CHO THUÊ VÀ NHẬN THU
                NHẬP ỔN ĐỊNH.
              </p>
              <p className={styles.resgisterSubContent}>
                CÒN LẠI LÀ NHIỆM VỤ CỦA CHÚNG TÔI.
              </p>
            </Col>
            <Col span={14}>
              <p className={styles.resgisterSubContent}>
                THÔNG TIN CỦA QUÝ KHÁCH HÀNG
              </p>
              <Form>
                <Row justify="space-between">
                  <Col span={10}>
                    <Form.Item name="name">
                      <input
                        placeholder="Họ và tên"
                        className={styles.registerInputItem}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item name="phone">
                      <input
                        placeholder="Số điện thoại"
                        className={styles.registerInputItem}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item name="email">
                  <input
                    placeholder="Email"
                    className={styles.registerInputItem}
                  />
                </Form.Item>
                <Form.Item name="note">
                  <textarea
                    rows={3}
                    placeholder="Nội dung"
                    className={styles.registerInputItem}
                  />
                </Form.Item>
                <Row justify="end">
                  <Button icon>Gửi thông tin</Button>
                </Row>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default ManagerRegister;
