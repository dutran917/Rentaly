import {
  Breadcrumb,
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  message,
} from "antd";
import Modal from "antd/lib/modal/Modal";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  LeftOutlined,
  EditOutlined,
} from "@ant-design/icons";
import styles from "./index.module.scss";
import Editor from "./Editor";
import { useRequest } from "ahooks";
import {
  editApartment,
  getListApartmentTags,
} from "./service";
import UploadImage from "@/components/UploadImage";
const EditApartmentForm = ({
  infoApartment,
  refresh,
}: {
  infoApartment: any;
  refresh: () => void;
}) => {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData] = useState("");
  const [disabled, setDisabled] = useState(true);
  const tags = useRequest(getListApartmentTags);
  const [form] = Form.useForm();
  const onEditApartment = useRequest(editApartment, {
    manual: true,
    onSuccess: (res) => {
      message.success("Sửa thông tin thành công");
      refresh();
    },
    onError: (err) => {
      message.error("Có lỗi xảy ra");
    },
  });
  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      title: infoApartment?.title,
      subtitle: infoApartment?.subtitle,
      tags: infoApartment?.TagsInApartment?.map(
        (item: any) => item?.apartmentTagId
      ),
    });
    setData(infoApartment?.content);
  }, [infoApartment]);
  const onFinish = (value: any) => {
    console.log(value);
    onEditApartment.run(infoApartment?.id, {
      ...value,
      image: value?.image?.fileList?.map((item: any) =>
        item?.response ? item?.response[0]?.path : item?.url
      ),
    });
  };
  return (
    <div>
      <div
        style={{
          textAlign: "end",
        }}
      >
        <Button
          icon={<EditOutlined />}
          onClick={() => {
            setDisabled(!disabled);
          }}
        ></Button>
      </div>
      <div className={styles.formData}>
        <Form
          disabled={disabled}
          layout="vertical"
          form={form}
          onFinish={onFinish}
        >
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
          <Form.Item name="content" label="Mô tả chi tiết">
            <Editor
              disabled={disabled}
              data={data}
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

          <UploadImage images={infoApartment?.image} />

          <Row justify="center">
            <Button
              className={styles.submitBtn}
              onClick={() => {
                refresh();
                setDisabled(true);
              }}
            >
              Hủy
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.submitBtn}
            >
              Sửa thông tin
            </Button>
          </Row>
        </Form>
        {/* 
          {data} */}
      </div>
    </div>
  );
};

export default EditApartmentForm;
