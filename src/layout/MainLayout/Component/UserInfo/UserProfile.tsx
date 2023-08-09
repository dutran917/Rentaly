import {
  Button,
  Form,
  Input,
  Modal,
  Row,
  message,
  notification,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  EditOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { useProfile } from "@/store/ManagerProfile/useProfile";
import { useRequest } from "ahooks";
import {
  userUpdatePassword,
  userUpdateProfile,
} from "./service";
const UserProfile = () => {
  const { profileUser, requestGetProfileUser } =
    useProfile();
  console.log(profileUser);
  const [form] = Form.useForm();
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    form.setFieldsValue({
      full_name: profileUser.full_name,
      phone: profileUser.phone,
      email: profileUser.email,
    });
  }, [profileUser]);
  const updateProfile = useRequest(userUpdateProfile, {
    manual: true,
    onSuccess(res) {
      console.log(res);
      requestGetProfileUser.run();
      setDisabled(true);
      notification.success({
        message: "Thay đổi thông tin thành công",
      });
    },
    onError(e) {
      notification.error({
        message: "Số điện thoại đã tồn tại",
      });
    },
  });
  const onSubmit = (val: any) => {
    updateProfile.run({
      full_name: val.full_name,
      phone: val.phone,
    });
  };
  const updatePassword = useRequest(userUpdatePassword, {
    manual: true,
    onSuccess(res) {
      formChangePassword.resetFields();

      notification.success({
        message: "Đổi mật khẩu thành công",
      });
    },
    onError(e) {
      notification.error({
        message: "Bạn đã nhập sai mật khẩu",
      });
    },
  });
  const [formChangePassword] = Form.useForm();
  const handleChangePassword = () => {
    const onFinish = (val: any) => {
      updatePassword.run({
        old_password: val.old_password,
        new_password: val.new_password,
      });
    };

    Modal.confirm({
      icon: null,
      title: "Đổi mật khẩu",
      width: 600,
      content: (
        <Form
          form={formChangePassword}
          id="formChangePassword"
          onFinish={onFinish}
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
            name="new_password"
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
            dependencies={["new_password"]}
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
                    getFieldValue("new_password") === value
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
        </Form>
      ),
      okText: "Xác nhận",
      cancelText: "Hủy",
      okButtonProps: {
        htmlType: "submit",
        form: "formChangePassword",
        loading: updatePassword.loading,
      },

      onCancel() {
        formChangePassword.resetFields();
      },
      onOk() {
        if (
          formChangePassword.getFieldValue("new_password")
        ) {
          return Promise.resolve();
        } else {
          return Promise.reject();
        }
      },
    });
  };
  return (
    <div>
      <Row
        justify="start"
        style={{
          margin: "20px 0",
        }}
      >
        <Button
          icon={<EditOutlined />}
          onClick={() => setDisabled(!disabled)}
        >
          Chỉnh sửa thông tin
        </Button>
        <Button
          type="primary"
          style={{
            margin: "0 20px",
          }}
          icon={<LockOutlined />}
          onClick={() => handleChangePassword()}
        >
          Đổi mật khẩu
        </Button>
      </Row>

      <Form
        form={form}
        layout="vertical"
        disabled={disabled}
        onFinish={onSubmit}
        style={{
          width: "50%",
        }}
      >
        <Form.Item
          name="full_name"
          label="Họ và tên"
          rules={[
            {
              required: true,
              message: "Không được bỏ trống",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Số điện thoại"
          rules={[
            {
              required: true,
              message: "Không được bỏ trống",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <Input disabled />
        </Form.Item>
        {!disabled && (
          <Row>
            <Button
              danger
              onClick={() => setDisabled(true)}
            >
              Hủy
            </Button>
            <Button
              htmlType="submit"
              type="primary"
              loading={updateProfile.loading}
              style={{
                margin: "0 20px",
              }}
            >
              Thay đổi thông tin
            </Button>
          </Row>
        )}
      </Form>
    </div>
  );
};

export default UserProfile;
