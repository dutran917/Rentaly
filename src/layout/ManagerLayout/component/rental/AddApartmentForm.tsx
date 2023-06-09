import {
  Breadcrumb,
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  notification,
} from "antd";
import Modal from "antd/lib/modal/Modal";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { LeftOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";
import Editor from "./Editor";
import { useRequest } from "ahooks";
import {
  createApartment,
  getListApartmentTags,
} from "./service";
import UploadImage from "@/components/UploadImage";
import { useRouter } from "next/router";
const ApartmentForm = () => {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData] = useState("");
  const tags = useRequest(getListApartmentTags);
  const router = useRouter();
  const createRequest = useRequest(createApartment, {
    manual: true,
    onSuccess: (res) => {
      if (typeof window !== "undefined") {
        // Client-side-only code
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
      router.push(
        `/manager/rental-management/${res.data?.id}`
      );
      notification.success({
        message: "Tạo chung cư thành công",
        description: "Vui lòng nhập thông tin các phòng",
      });
    },
    onError(err) {
      notification.error({
        message: "Có lỗi xảy ra",
      });
    },
  });

  useEffect(() => {
    setEditorLoaded(true);
  }, []);
  const onFinish = (value: any) => {
    // console.log(value);
    const payload = {
      ...value,
      image: value?.image?.fileList?.map(
        (item: any) => item?.response[0]?.path
      ),
      lat: +value?.lat,
      long: +value?.long,
      district: "Đống Đa",
      province: "Hà Nội",
    };
    createRequest.run(payload);
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
              disabled={false}
              data={data}
              name="description"
              onChange={(data: any) => {
                setData(data);
              }}
              editorLoaded={editorLoaded}
            />
          </Form.Item>
          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập",
              },
            ]}
          >
            <Input placeholder="nhập địa chỉ tòa nhà" />
          </Form.Item>
          <Row justify="space-evenly">
            <Col span={8}>
              <Form.Item name="lat">
                <Input type="number" placeholder="lat" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="long">
                <Input type="number" placeholder="long" />
              </Form.Item>
            </Col>
          </Row>
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
          <UploadImage images={[]} />
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
