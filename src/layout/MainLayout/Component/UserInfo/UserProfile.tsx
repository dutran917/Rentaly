import {
  Button,
  Form,
  Input,
  Row,
  message,
  notification,
} from "antd";
import React, { useEffect, useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { useProfile } from "@/store/ManagerProfile/useProfile";
import { useRequest } from "ahooks";
import { userUpdateProfile } from "./service";
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
  return (
    <div>
      <Row justify="end">
        <Button
          icon={<EditOutlined />}
          onClick={() => setDisabled(!disabled)}
        ></Button>
      </Row>

      <Form
        form={form}
        layout="vertical"
        disabled={disabled}
        onFinish={onSubmit}
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
              HỦy
            </Button>
            <Button
              htmlType="submit"
              type="primary"
              loading={updateProfile.loading}
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
