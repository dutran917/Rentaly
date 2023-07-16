import {
  Button,
  Form,
  Input,
  Modal,
  Row,
  message,
} from "antd";
import React, { useState } from "react";
import styles from "./index.module.scss";
import {
  UserOutlined,
  LockOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { useRequest } from "ahooks";
import { setCookie } from "cookies-next";
import {
  RegisterUserService,
  loginUserService,
} from "./service";
import { useProfile } from "@/store/ManagerProfile/useProfile";
const LoginModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: any;
}) => {
  const [mode, setMode] = useState<"login" | "register">(
    "login"
  );
  const { setProfileUser } = useProfile();
  const registerUser = useRequest(RegisterUserService, {
    manual: true,
    onSuccess: (res) => {
      message.success("Đăng ký thành công");
      setMode("login");
    },
    onError: () => {
      message.error("Email hoặc số điện thoại đã tồn tại");
    },
  });
  const loginUser = useRequest(loginUserService, {
    manual: true,
    onSuccess: (res) => {
      message.success("Đăng nhập thành công");
      setCookie("userId", res?.data?.id);
      setCookie("accessTokenUser", res?.data?.accessToken);
      setProfileUser(res?.data);
      onClose();
    },
    onError: (err) => {
      //@ts-ignore
      if (err?.response?.data?.message === "BLOCKED") {
        message.error("Tài khoản của bạn đã bị khóa");
      } else {
        message.error(
          "Tên đăng nhập hoặc mật khẩu không đúng"
        );
      }
    },
  });
  const onClose = () => {
    setMode("login");
    setIsOpen(false);
    form.resetFields();
  };
  const onSumit = (val: any) => {
    if (mode === "register") {
      delete val.re_password;
      registerUser.run(val);
    } else {
      loginUser.run(val);
    }
  };
  const [form] = Form.useForm();
  return (
    <Modal
      title={
        mode === "login"
          ? "Đăng nhập Rentaly"
          : "Đăng ký tài khoản"
      }
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      {mode === "login" && (
        <Form
          form={form}
          onFinish={onSumit}
          layout="vertical"
          className={styles.formLogin}
        >
          <Form.Item
            name="username"
            label="Tên đăng nhập"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập",
              },
            ]}
          >
            <Input
              status="warning"
              placeholder="Nhập email hoặc số điện thoại"
              className={styles.formLoginItem}
              prefix={<UserOutlined />}
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập",
              },
            ]}
          >
            <Input.Password
              status="warning"
              prefix={<LockOutlined />}
              placeholder="Mật khẩu"
              className={styles.formLoginItem}
            />
          </Form.Item>
          <p>
            Chưa có tài khoản?{" "}
            <span
              className={styles.registerBtn}
              onClick={() => setMode("register")}
            >
              Đăng ký
            </span>
          </p>
          <Row justify="center">
            <button
              className={styles.formLoginBtn}
              type="submit"
            >
              Đăng nhập
            </button>
          </Row>
        </Form>
      )}

      {mode === "register" && (
        <Form
          onFinish={onSumit}
          layout="vertical"
          className={styles.formLogin}
        >
          <Form.Item
            name="full_name"
            label="Họ và tên"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập",
              },
            ]}
          >
            <Input
              status="warning"
              placeholder="Họ và tên của bạn"
              className={styles.formLoginItem}
              prefix={<UserOutlined />}
            />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập",
              },
              {
                pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                message: "Vui lòng nhập đúng định dạng",
              },
            ]}
          >
            <Input
              status="warning"
              placeholder="Nhập số điện thoại của bạn"
              className={styles.formLoginItem}
              prefix={<PhoneOutlined />}
            />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập",
              },
              {
                type: "email",
                message: "Vui lòng nhập đúng định dạng",
              },
            ]}
          >
            <Input
              status="warning"
              placeholder="Nhập email của bạn"
              className={styles.formLoginItem}
              prefix={<MailOutlined />}
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập",
              },
            ]}
          >
            <Input.Password
              status="warning"
              prefix={<LockOutlined />}
              placeholder="Mật khẩu"
              className={styles.formLoginItem}
            />
          </Form.Item>
          <Form.Item
            name="re_password"
            label="Xác nhận mật khẩu"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Vui lòng nhập",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (
                    !value ||
                    getFieldValue("password") === value
                  ) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu không khớp")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              status="warning"
              prefix={<LockOutlined />}
              placeholder="Nhập lại mật khẩu"
              className={styles.formLoginItem}
            />
          </Form.Item>
          <p>
            Đã có tài khoản?{" "}
            <span
              className={styles.registerBtn}
              onClick={() => setMode("login")}
            >
              Đăng nhập
            </span>
          </p>
          <Row justify="center">
            <button
              className={styles.formLoginBtn}
              type="submit"
            >
              Đăng ký
            </button>
          </Row>
        </Form>
      )}
    </Modal>
  );
};

export default LoginModal;
