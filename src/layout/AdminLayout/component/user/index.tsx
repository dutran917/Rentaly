import {
  Col,
  Form,
  Input,
  Row,
  Table,
  Tooltip,
} from "antd";
import { ColumnsType } from "antd/lib/table";
import { useRouter } from "next/router";
import React from "react";
import { EyeOutlined } from "@ant-design/icons";
import { useAntdTable } from "ahooks";
import { getListUser } from "./service";
const UserManager = () => {
  const [form] = Form.useForm();
  const { tableProps, loading, search } = useAntdTable(
    getListUser,
    {
      form,
    }
  );
  const { submit } = search;
  const router = useRouter();

  const columns: ColumnsType<any> = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Họ và tên",
      dataIndex: "full_name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
    },

    {
      title: "Hành động",
      align: "center",
      render: (_, record) => (
        <Row justify="space-around">
          <Tooltip title="Xem chi tiết">
            <EyeOutlined
              style={{
                color: "purple",
              }}
              onClick={() => {
                router.push(
                  `user-management/${record?.id}`
                );
              }}
            />
          </Tooltip>
        </Row>
      ),
    },
  ];

  const searchForm = (
    <Row justify="space-between">
      <Col span={8}>
        <Form layout="vertical" form={form}>
          <Form.Item name="search">
            <Input.Search
              onSearch={submit}
              allowClear
              placeholder="Tìm kiếm theo tên, số điện thoại, email"
            />
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
  return (
    <div>
      {searchForm}
      <Table
        columns={columns}
        {...tableProps}
        loading={loading}
        rowKey={(item) => item.id}
        scroll={{ x: 1000 }}
      />
    </div>
  );
};

export default UserManager;
