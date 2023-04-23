import { Breadcrumb, Form, Input } from "antd";
import Modal from "antd/lib/modal/Modal";
import Link from "next/link";
import React from "react";
import { LeftOutlined } from "@ant-design/icons";

const AddApartment = () => {
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link href="/manager/rental-management">
            <LeftOutlined />
            <div>Thêm chung cư</div>
          </Link>
        </Breadcrumb.Item>
      </Breadcrumb>

      <Form>
        <Form.Item name="title" label="Tên chung cư">
          <Input placeholder="Tên chung cư" />
        </Form.Item>
        <Form.Item name="content" label="Mô tả chung">
          <Input placeholder="Nhập mô tả" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Mô tả chi tiết"
        >
          <Input.TextArea
            placeholder="Nhập mô tả"
            rows={5}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddApartment;
