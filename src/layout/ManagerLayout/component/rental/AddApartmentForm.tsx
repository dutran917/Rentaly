import {
  Breadcrumb,
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
} from "antd";
import Modal from "antd/lib/modal/Modal";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { LeftOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";
import Editor from "./Editor";
import { useRequest } from "ahooks";
import { getListApartmentTags } from "./service";
const ApartmentForm = () => {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData] = useState("");
  const tags = useRequest(getListApartmentTags);

  useEffect(() => {
    setEditorLoaded(true);
  }, []);
  const onFinish = (value: any) => {
    console.log(value);
  };
  return (
    <div>
      <div className={styles.formData}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="title"
            label="Tên chung cư"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập",
              },
            ]}
          >
            <Input placeholder="Tên chung cư" />
          </Form.Item>
          <Form.Item
            name="subtitle"
            label="Mô tả chung"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập",
              },
            ]}
          >
            <Input placeholder="Nhập mô tả" />
          </Form.Item>
          <Form.Item
            name="content"
            label="Mô tả chi tiết"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập",
              },
            ]}
          >
            <Editor
              name="description"
              onChange={(data: any) => {
                setData(data);
              }}
              editorLoaded={editorLoaded}
            />
          </Form.Item>
          <Row>
            <Col span={12}>
              <Form.Item
                label="Tiện nghi của tòa nhà"
                name="tags"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập",
                  },
                ]}
              >
                <Select
                  placeholder="Chọn"
                  mode="multiple"
                  options={tags.data?.data?.map(
                    (item: any) => ({
                      label: item?.name,
                      value: item?.id,
                    })
                  )}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="center">
            <Button className={styles.submitBtn}>
              Nhập lại
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.submitBtn}
            >
              Xác nhận
            </Button>
          </Row>
        </Form>
        {/* 
        {data} */}
      </div>
    </div>
  );
};

export default ApartmentForm;
