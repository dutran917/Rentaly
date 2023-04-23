import { Button, Form, Input, Row, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useRouter } from "next/router";
import React from "react";

const RentalManage = () => {
  const router = useRouter();
  const searchForm = (
    <Row justify="space-between">
      <Form layout="vertical">
        <Form.Item>
          <Input placeholder="Tìm kiếm" />
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
    },
    {
      title: "Địa chỉ",
    },
    {
      title: "Số phòng",
    },
    {
      title: "Số phòng chưa thuê",
    },
    {
      title: "Hành động",
    },
  ];
  return (
    <div>
      {searchForm}
      <Table columns={columns} dataSource={[]} />
    </div>
  );
};

export default RentalManage;
