import { Breadcrumb, Form, Input, Row } from "antd";
import Modal from "antd/lib/modal/Modal";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { LeftOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";
import Editor from "./Editor";
const AddApartment = () => {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData] = useState("");

  useEffect(() => {
    setEditorLoaded(true);
  }, []);
  return (
    <div>
      <Breadcrumb className={styles.breadcrumb}>
        <Breadcrumb.Item>
          <Link href="/manager/rental-management">
            <Row align="middle">
              <LeftOutlined />
              <div>Thêm chung cư</div>
            </Row>
          </Link>
        </Breadcrumb.Item>
      </Breadcrumb>

      <div className={styles.formData}>
        <Form layout="vertical">
          <Form.Item name="title" label="Tên chung cư">
            <Input placeholder="Tên chung cư" />
          </Form.Item>
          <Form.Item name="subtitle" label="Mô tả chung">
            <Input placeholder="Nhập mô tả" />
          </Form.Item>
          <Form.Item name="content" label="Mô tả chi tiết">
            <Editor
              name="description"
              onChange={(data: any) => {
                setData(data);
              }}
              editorLoaded={editorLoaded}
            />
          </Form.Item>
        </Form>
        {data}
      </div>
    </div>
  );
};

export default AddApartment;
