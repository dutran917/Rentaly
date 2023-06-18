import { useAntdTable, useRequest } from "ahooks";
import React from "react";
import { getListRoom } from "./service";
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
import { getListRoomTags } from "@/layout/ManagerLayout/component/rental/service";
const RoomList = () => {
  const router = useRouter();
  const { id } = router.query;
  const [form] = Form.useForm();
  // const onCreateRoom = useRequest(createRoom, {
  //   manual: true,
  //   onSuccess: (res) => {
  //     notification.success({
  //       message: "Thêm phòng thành công",
  //     });
  //     refresh();
  //   },
  //   onError: (error) => {
  //     notification.error({
  //       message: "Có lỗi xảy ra",
  //     });
  //   },
  // });
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
