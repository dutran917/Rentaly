import {
  Col,
  Form,
  Input,
  Modal,
  Row,
  Table,
  Tag,
  Tooltip,
  Typography,
  notification,
} from "antd";
import { ColumnsType } from "antd/lib/table";
import { useRouter } from "next/router";
import React from "react";
import {
  EyeOutlined,
  LockOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import { useAntdTable, useRequest } from "ahooks";
import { getListUser } from "./service";
import { blockUserService } from "../lessor/service";
const UserManager = () => {
  const [form] = Form.useForm();
  const { tableProps, loading, search, refresh } =
    useAntdTable(getListUser, {
      form,
    });

  const blockUser = useRequest(blockUserService, {
    manual: true,
    onSuccess(res) {
      notification.success({
        message: "Thành công",
      });
      refresh();
    },
  });

  const handleBlockUser = (id: number, status: boolean) => {
    return Modal.confirm({
      title: `Xác nhận ${
        status ? "Mở khóa" : "Khóa"
      } tài khoản này`,
      content: `Bạn muốn ${
        status ? "Mở khóa" : "Khóa"
      } tài khoản này?`,
      okText: "Xác nhận",
      cancelText: "Hủy",
      okButtonProps: {
        loading: blockUser.loading,
      },
      onOk() {
        blockUser.run({
          userId: id,
          status: status,
        });
      },
    });
  };

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
      title: "Trạng thái",
      dataIndex: "status",
      render: (value) => (
        <>
          {value ? (
            <Tag color="green">Đang hoạt động</Tag>
          ) : (
            <Tag color="red">Đã khóa</Tag>
          )}
        </>
      ),
    },
    {
      title: "Số lần thuê phòng",
      align: "center",
      render: (_: any, record: any) => (
        <>{record?.roomRenter?.length}</>
      ),
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
          {record?.status ? (
            <Tooltip title="Khóa tài khoản">
              <LockOutlined
                style={{
                  color: "red",
                }}
                onClick={() =>
                  handleBlockUser(
                    record?.id,
                    !record?.status
                  )
                }
              />
            </Tooltip>
          ) : (
            <Tooltip title="Mở khóa tài khoản">
              <UnlockOutlined
                style={{
                  color: "blue",
                }}
                onClick={() =>
                  handleBlockUser(
                    record?.id,
                    !record?.status
                  )
                }
              />
            </Tooltip>
          )}
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
      <Typography>
        <Typography.Title level={5}>
          Quản lý người thuê
        </Typography.Title>
      </Typography>
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
