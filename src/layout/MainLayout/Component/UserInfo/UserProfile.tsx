import { Button, Form, Input, Row } from "antd";
import React, { useEffect, useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { useProfile } from "@/store/ManagerProfile/useProfile";
const UserProfile = () => {
  const { profileUser } = useProfile();
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
      >
        <Form.Item name="full_name" label="Họ và tên">
          <Input />
        </Form.Item>
        <Form.Item name="phone" label="Số điện thoại">
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <Input />
        </Form.Item>
        {!disabled && (
          <Row>
            <Button
              danger
              onClick={() => setDisabled(true)}
            >
              HỦy
            </Button>
            <Button htmlType="submit" type="primary">
              Thay đổi thông tin
            </Button>
          </Row>
        )}
      </Form>
    </div>
  );
};

export default UserProfile;
