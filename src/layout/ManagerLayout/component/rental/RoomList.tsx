import { useAntdTable, useRequest } from "ahooks";
import React from "react";
import {
  createRoom,
  getListRoom,
  getListRoomTags,
} from "./service";
import { useRouter } from "next/router";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Table,
  notification,
} from "antd";
import { ColumnsType } from "antd/lib/table";
import { PlusOutlined } from "@ant-design/icons";
const RoomList = () => {
  const router = useRouter();
  const { id } = router.query;
  const [form] = Form.useForm();
  const onCreateRoom = useRequest(createRoom, {
    manual: true,
    onSuccess: (res) => {
      notification.success({
        message: "Thêm phòng thành công",
      });
      refresh();
    },
    onError: (error) => {
      notification.error({
        message: "Có lỗi xảy ra",
      });
    },
  });
  const { tableProps, search, refresh } = useAntdTable(
    getListRoom,
    {
      defaultParams: [
        {
          pageSize: 10,
          current: 1,
          id: Number(id),
        },
        {
          searchValue: "",
        },
      ],
      form,
    }
  );
  const { submit } = search;
  const columns: ColumnsType<any> = [
    {
      title: "Số phòng",
      dataIndex: "title",
    },
    {
      title: "Giá phòng",
      dataIndex: "price",
    },
    {
      title: "Diện tích",
      dataIndex: "area",
    },
    {
      title: "Số người tối đa",
      dataIndex: "maximum",
    },
    {
      title: "Loại phòng",
      render: (_, record) => (
        <>{`${record?.living_room} khách - ${record?.bed_room} ngủ`}</>
      ),
    },
  ];

  const [createRoomForm] = Form.useForm();

  const tags = useRequest(getListRoomTags);

  const handleCreateRoom = () => {
    const onFinish = (val: any) => {
      console.log(val);
      onCreateRoom.run(Number(id), val);
    };
    Modal.confirm({
      title: "Thêm phòng",
      icon: null,
      width: "600px",
      content: (
        <Form
          form={createRoomForm}
          onFinish={onFinish}
          id="createRoomForm"
          layout="vertical"
        >
          <Form.Item
            label="Mã số phòng"
            name="title"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Giá thuê phòng"
            name="price"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập",
              },
            ]}
          >
            <InputNumber
              addonAfter="VND"
              style={{
                width: "100%",
              }}
              formatter={(value) =>
                `${value}`.replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  ","
                )
              }
            />
          </Form.Item>
          <Form.Item
            label="Diện tích"
            name="area"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập",
              },
            ]}
          >
            <InputNumber
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
          <Form.Item
            label="Số người ở tối đa"
            name="maximum"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập",
              },
            ]}
          >
            <InputNumber
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
          <Form.Item
            label="Số phòng ngủ"
            name="bed_room"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập",
              },
            ]}
          >
            <InputNumber
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
          <Row>
            <Col span={12}>
              <Form.Item
                label="Tiện ích phòng"
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
        </Form>
      ),
      okButtonProps: {
        htmlType: "submit",
        form: "createRoomForm",
      },
      onCancel: () => {
        createRoomForm.resetFields();
      },
      onOk() {
        if (createRoomForm.getFieldValue("title")) {
          // createRoomForm.resetFields();
          return Promise.resolve();
        } else {
          return Promise.reject();
        }
      },
      okText: "Xác nhận",
      cancelText: "Hủy",
    });
  };

  const searchForm = (
    <Row justify="space-between">
      <Form layout="vertical" form={form}>
        <Form.Item name="searchValue">
          <Input.Search
            placeholder="Tìm kiếm theo số phòng"
            onSearch={submit}
          />
        </Form.Item>
      </Form>
      <Button
        type="primary"
        onClick={() => handleCreateRoom()}
      >
        Thêm phòng
      </Button>
    </Row>
  );
  return (
    <div>
      {searchForm}
      <Table
        columns={columns}
        {...tableProps}
        scroll={{
          x: 1000,
        }}
      />
    </div>
  );
};

export default RoomList;
