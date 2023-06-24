import { useProfile } from "@/store/ManagerProfile/useProfile";
import {
  Button,
  Form,
  Input,
  Modal,
  Row,
  Tabs,
} from "antd";
import React, { useState } from "react";

const ManagerProfile = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: any;
}) => {
  const { profile } = useProfile();
  const onClose = () => {
    setIsOpen(false);
    formPassword.resetFields();
  };
  const [formProfile] = Form.useForm();
  const [formPassword] = Form.useForm();
  const [tab, setTab] = useState<string>("info");
  const onSubmitChangeProfile = (val: any) => {
    console.log(val);
  };
  const onSubmitChangePassword = (val: any) => {
    console.log(val);
  };

  const submitGroup = (
    <Row justify="center">
      <Button danger onClick={onClose}>
        Hủy
      </Button>
      <Button type="primary" htmlType="submit">
        Lưu
      </Button>
    </Row>
  );

  const renderTab = () => {
    switch (tab) {
      case "info":
        return (
          <Form
            onFinish={onSubmitChangeProfile}
            form={formProfile}
            initialValues={{
              full_name: profile.full_name,
              phone: profile.phone,
              email: profile.email,
            }}
            layout="vertical"
          >
            <Form.Item
              label="Họ và tên"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập",
                },
              ]}
              name="full_name"
            >
              <Input placeholder="Họ và tên chủ nhà" />
            </Form.Item>
            <Form.Item
              label="Số điện thoại"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập",
                },
              ]}
              name="phone"
            >
              <Input placeholder="Số điện thoại chủ nhà" />
            </Form.Item>
            <Form.Item
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập",
                },
              ]}
              name="email"
            >
              <Input placeholder="Email " disabled />
            </Form.Item>
            {submitGroup}
          </Form>
        );
      case "password":
        return (
          <Form
            onFinish={onSubmitChangePassword}
            form={formPassword}
            layout="vertical"
          >
            <Form.Item
              label="Mật khẩu hiện tại"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập",
                },
              ]}
              name="old_password"
            >
              <Input.Password placeholder="Nhập mật khẩu hiện tại" />
            </Form.Item>
            <Form.Item
              label="Mật khẩu mới"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập",
                },
              ]}
            >
              <Input.Password placeholder="Nhập mật khẩu mới" />
            </Form.Item>
            <Form.Item
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
              name="re_password"
            >
              <Input.Password placeholder="Xác nhận mật khẩu" />
            </Form.Item>
            {submitGroup}
          </Form>
        );

      default:
        break;
    }
  };
  return (
    <Modal
      title="Thông tin chủ nhà"
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <Tabs onChange={(key) => setTab(key)}>
        <Tabs.TabPane
          key="info"
          tab="Thông tin"
        ></Tabs.TabPane>
        <Tabs.TabPane
          key="password"
          tab="Đổi mật khẩu"
        ></Tabs.TabPane>
      </Tabs>
      {renderTab()}
    </Modal>
  );
};

export default ManagerProfile;
