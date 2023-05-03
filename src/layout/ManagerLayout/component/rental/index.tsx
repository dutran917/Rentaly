import { useAntdTable, useRequest } from "ahooks";
import { Button, Form, Input, Row, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { EyeOutlined } from "@ant-design/icons";
import { getListApartment } from "./service";

const RentalManage = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { tableProps, refresh, search, loading } =
    useAntdTable(getListApartment, {
      form,
    });

  const { submit } = search;
  const searchForm = (
    <Row justify="space-between">
      <Form layout="vertical" form={form}>
        <Form.Item name="searchValue">
          <Input.Search
            placeholder="Tìm kiếm"
            onSearch={submit}
          />
        </Form.Item>
      </Form>
      <Button
        type="primary"
        onClick={() =>
          router.push("/manager/add-apartment")
        }
      >
        Thêm chung cư
      </Button>
    </Row>
  );

  const columns: ColumnsType<any> = [
    {
      title: "Tên chung cư",
      dataIndex: "title",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
    },
    {
      title: "Số phòng",
      render: (_, record) => <>{record?.rooms?.length}</>,
    },
    {
      title: "Số phòng chưa thuê",
    },
    {
      title: "Hành động",
      align: "center",
      render: (_, record) => (
        <>
          <EyeOutlined
            style={{
              cursor: "pointer",
            }}
            onClick={() => {
              router.push(
                `rental-management/${record?.id}`
              );
            }}
          />
        </>
      ),
    },
  ];
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

export default RentalManage;
