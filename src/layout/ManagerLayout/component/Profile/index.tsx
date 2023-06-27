import { useProfile } from "@/store/ManagerProfile/useProfile";
import { useRequest } from "ahooks";
import {
  Button,
  Form,
  Input,
  Modal,
  Row,
  Tabs,
  notification,
} from "antd";
import React, { useState } from "react";
import { updateProfileService } from "./service";

const ManagerProfile = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: any;
}) => {
  const { profile, setProfile } = useProfile();
  const onClose = () => {
    setIsOpen(false);
    formPassword.resetFields();
  };
  const [formProfile] = Form.useForm();
  const [formPassword] = Form.useForm();
  const [tab, setTab] = useState<string>("info");

  const updateProfile = useRequest(updateProfileService, {
    manual: true,
    onSuccess(res) {
      console.log(res);
      notification.success({
        message: "Thành công",
      });
      setIsOpen(false);
      setProfile({
        ...profile,
        full_name: res.data?.full_name,
      });
    },
    onError(e) {
      console.log(e);
      notification.error({
        message: "Bạn nhập sai mật khẩu",
      });
    },
  });

  const onSubmitChangeProfile = (val: any) => {
    updateProfile.run({
      full_name: val.full_name,
    });
  };
  const onSubmitChangePassword = (val: any) => {
    updateProfile.run({
      password: val.password,
      old_password: val.old_password,
    });
  };

  const submitGroup = (
    <Row justify="center">
      <Button danger onClick={onClose}>
        Hủy
      </Button>
      <Button
        type="primary"
        htmlType="submit"
        loading={updateProfile.loading}
      >
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
              <Input
                placeholder="Số điện thoại chủ nhà"
                disabled
              />
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
