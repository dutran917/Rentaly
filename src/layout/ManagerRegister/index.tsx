import React from "react";
import styles from "./index.module.scss";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  message,
  notification,
} from "antd";
import { SendOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { registerLessor } from "./service";
const ManagerRegister = () => {
  const [form] = Form.useForm();
  const register = useRequest(registerLessor, {
    manual: true,
    onSuccess: (res) => {
      notification.success({
        message:
          "Đã gửi đơn đăng ký, chúng tôi sẽ gửi Email trong thời gian sớm nhất!",
      });
    },
    onError: (err) => {
      console.log(err);

      notification.error({
        message: "Thông tin bạn nhập không hợp lệ",
      });
    },
  });
  const onSubmit = (val: any) => {
    console.log(val);
    register.run({
      email: val?.email,
      full_name: val?.full_name,
      phone: val?.phone,
    });
    form.resetFields();
  };
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
            <div
              className={styles.bannerInfoScroll}
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.scrollTo({
                    top: 700,
                    behavior: "smooth",
                  });
                }
              }}
            >
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
          <div className={styles.resgisterContent}>
            <div className={styles.resgisterContent1}>
              <p className={styles.resgisterSubContent}>
                BẠN CHỈ CẦN CÓ NHÀ TRỌ CHO THUÊ VÀ NHẬN THU
                NHẬP ỔN ĐỊNH.
              </p>
              <p className={styles.resgisterSubContent}>
                CÒN LẠI LÀ NHIỆM VỤ CỦA CHÚNG TÔI.
              </p>
            </div>
            <div className={styles.resgisterContent2}>
              <p className={styles.resgisterSubContent}>
                THÔNG TIN CỦA QUÝ KHÁCH HÀNG
              </p>
              <Form form={form} onFinish={onSubmit}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Form.Item
                    style={{
                      width: "48%",
                    }}
                    name="full_name"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập",
                      },
                    ]}
                  >
                    <input
                      autoComplete="off"
                      placeholder="Họ và tên"
                      className={styles.registerInputItem}
                    />
                  </Form.Item>
                  <Form.Item
                    name="phone"
                    style={{
                      width: "48%",
                    }}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập",
                      },
                      {
                        pattern:
                          /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                        message:
                          "Vui lòng nhập đúng định dạng",
                      },
                    ]}
                  >
                    <input
                      autoComplete="off"
                      placeholder="Số điện thoại"
                      className={styles.registerInputItem}
                    />
                  </Form.Item>
                </div>

                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập",
                    },
                    {
                      type: "email",
                      message:
                        "Vui lòng nhập đúng định dạng",
                    },
                  ]}
                >
                  <input
                    autoComplete="off"
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
                  <Button
                    danger
                    type="primary"
                    htmlType="submit"
                    icon={<SendOutlined />}
                    loading={register.loading}
                  >
                    Gửi thông tin
                  </Button>
                </Row>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerRegister;
