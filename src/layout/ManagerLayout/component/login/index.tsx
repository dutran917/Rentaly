import {
  Button,
  Form,
  Input,
  Row,
  notification,
} from "antd";
import React from "react";
import styles from "./index.module.scss";
import { useRequest } from "ahooks";
import { loginManager } from "./service";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import { useProfile } from "@/store/ManagerProfile/useProfile";
const ManagerLogin = () => {
  const router = useRouter();
  const { setProfile } = useProfile();
  const login = useRequest(loginManager, {
    manual: true,
    onSuccess: (res) => {
      router.push("/manager/dashboard");
      setCookie("managerId", res?.data?.id);
      setCookie(
        "accessTokenManager",
        res?.data?.accessToken
      );
      setProfile(res?.data);
      notification.success({
        message: "Đăng nhập thành công",
      });
    },
    onError: (e) => {
      //@ts-ignore
      if (e?.response?.status === 401) {
        notification.error({
          message: "Sai tên đăng nhập hoặc mật khẩu",
        });
      }
      //@ts-ignore
      if (e?.response?.status === 400) {
        notification.error({
          message: "Tài khoản của bạn chưa được kích hoạt",
        });
      }
    },
  });

  const [form] = Form.useForm();

  const onSubmit = (value: any) => {
    form.resetFields();
    login.run(value);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.formLogin}>
        <p
          style={{
            fontWeight: 600,
            fontSize: "20px",
            textAlign: "center",
          }}
        >
          Đăng nhập
        </p>
        <Form
          onFinish={onSubmit}
          form={form}
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          labelAlign="left"
        >
          <Form.Item label="Email" name="username">
            <Input placeholder="Tên đăng nhập" />
          </Form.Item>
          <Form.Item label="Mật khẩu" name="password">
            <Input.Password placeholder="Mật khẩu" />
          </Form.Item>
          <Row justify="center">
            <Button
              type="primary"
              htmlType="submit"
              loading={login.loading}
            >
              Đăng nhập
            </Button>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default ManagerLogin;
