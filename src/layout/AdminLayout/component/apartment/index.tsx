import { useAntdTable, useRequest } from "ahooks";
import {
  Button,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Table,
  Tag,
  Tooltip,
  Typography,
  notification,
} from "antd";
import { ColumnsType } from "antd/lib/table";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import {
  approveApartmentService,
  getListApartment,
  hideApartmentService,
} from "./service";
import {
  EyeOutlined,
  CheckOutlined,
  CloseOutlined,
  LockOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import styles from "./index.module.scss";
const ApartmentManage = () => {
  const options = [
    {
      label: "Đống đa",
      value: "Đống Đa",
    },
    {
      label: "Hai bà trưng",
      value: "Hai bà trưng",
    },
    {
      label: "Cầu giấy",
      value: "Cầu giấy",
    },
    {
      label: "Mỹ đình",
      value: "Mỹ đình",
    },
  ];
  const router = useRouter();
  const [form] = Form.useForm();
  const { tableProps, refresh, search, loading } =
    useAntdTable(getListApartment, {
      form,
    });

  const hideApartment = useRequest(hideApartmentService, {
    manual: true,
    onSuccess() {
      notification.success({
        message: "Thành công",
      });
      refresh();
    },
  });
  const { submit } = search;

  const approveApartment = useRequest(
    approveApartmentService,
    {
      manual: true,
      onSuccess(res) {
        console.log(res);

        notification.success({
          message: "Duyệt thành công",
        });
        refresh();
      },
      onError(err) {
        notification.error({
          message: "Có lỗi xảy ra!",
        });
      },
    }
  );
  const handleApproveApartment = (id: number) => {
    return Modal.confirm({
      title: "Xác nhận phê duyệt",
      content: "Bạn muốn phê duyệt chung cư này?",
      okText: "Xác nhận",
      cancelText: "Hủy",
      okButtonProps: {
        loading: approveApartment.loading,
      },
      onOk() {
        approveApartment.run({
          apartmentId: id,
          approve: true,
        });
      },
    });
  };

  const handleDisplayApartment = (
    id: number,
    display: boolean
  ) => {
    return Modal.confirm({
      title: `Xác nhận`,
      content: `Bạn muốn ${
        display ? "hiển thị" : "ẩn"
      } chung cư này?`,
      okText: "Xác nhận",
      cancelText: "Hủy",
      okButtonProps: {
        loading: hideApartment.loading,
      },
      onOk() {
        hideApartment.run({
          apartmentId: id,
          display: display,
        });
      },
    });
  };

  const [formRefuseVerified] = Form.useForm();
  const handleRefuseApartment = (id: number) => {
    const onFinish = (val: any) => {
      approveApartment.run({
        apartmentId: id,
        approve: false,
      });
    };

    Modal.confirm({
      icon: null,
      title: "Lý do từ chối duyệt căn chung cư này:",
      width: 600,
      content: (
        <Form
          form={formRefuseVerified}
          id="formRefuseVerified"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="reason"
            label="Lý do từ chói"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập lý do",
              },
            ]}
          >
            <Input.TextArea
              placeholder="Nhập lý do"
              rows={2}
            />
          </Form.Item>
        </Form>
      ),
      okText: "Xác nhận",
      cancelText: "Hủy",
      okButtonProps: {
        htmlType: "submit",
        form: "formRefuseVerified",
        loading: approveApartment.loading,
      },

      onCancel() {
        formRefuseVerified.resetFields();
      },
      onOk() {
        if (formRefuseVerified.getFieldValue("reason")) {
          return Promise.resolve();
        } else {
          return Promise.reject();
        }
      },
    });
  };

  const searchForm = (
    <Row justify="space-between">
      <Form
        layout="inline"
        form={form}
        className={styles.formFilter}
      >
        <Form.Item name="search">
          <Input.Search
            placeholder="Tìm kiếm"
            onSearch={submit}
          />
        </Form.Item>
        <Form.Item name="district">
          <Select
            allowClear
            options={options}
            placeholder="Khu vực"
            onChange={submit}
          />
        </Form.Item>
        <Form.Item name="verified">
          <Select
            allowClear
            onChange={submit}
            placeholder="Trạng thái"
            options={[
              {
                label: "Chờ duyệt",
                value: "PENDING",
              },
              {
                label: "Đã duyệt",
                value: "ACCEPT",
              },
              {
                label: "Từ chối",
                value: "REFUSE",
              },
            ]}
            onSearch={submit}
          />
        </Form.Item>
      </Form>
      {/* <Button type="primary">Thêm chung cư</Button> */}
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
      title: "Số phòng còn trống",
      render: (_, record) => (
        <>
          {record?.rooms?.length - record?.rented?.length}
        </>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "verified",
      render(value, record, index) {
        if (value === "PENDING")
          return <Tag color="warning">Chờ duyệt</Tag>;
        if (value === "ACCEPT")
          return <Tag color="green">Đã duyệt</Tag>;
        if (value === "REFUSE")
          return <Tag color="red">Từ chối</Tag>;
      },
    },
    {
      title: "Hiển thị",
      render: (_, record) => (
        <Tag color={record?.published ? "green" : "gray"}>
          {record?.published
            ? "Đang hiển thị"
            : "Không hiển thị"}
        </Tag>
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
                  `apartment-management/${record?.id}`
                );
              }}
            />
          </Tooltip>
          <>
            {record?.verified === "PENDING" && (
              <>
                <Tooltip title="Duyệt">
                  <CheckOutlined
                    style={{
                      color: "green",
                    }}
                    onClick={() =>
                      handleApproveApartment(record?.id)
                    }
                  />
                </Tooltip>
                <Tooltip title="Từ chối">
                  <CloseOutlined
                    style={{
                      color: "red",
                    }}
                    onClick={() =>
                      handleRefuseApartment(record?.id)
                    }
                  />
                </Tooltip>
              </>
            )}
            {record?.verified === "ACCEPT" &&
              (record?.published ? (
                <>
                  <Tooltip title="Ẩn chung cư này">
                    <LockOutlined
                      style={{
                        color: "red",
                      }}
                      onClick={() =>
                        handleDisplayApartment(
                          record?.id,
                          false
                        )
                      }
                    />
                  </Tooltip>
                </>
              ) : (
                <>
                  <Tooltip title="Hiển thị chung cư này">
                    <UnlockOutlined
                      style={{
                        color: "green",
                      }}
                      onClick={() =>
                        handleDisplayApartment(
                          record?.id,
                          true
                        )
                      }
                    />
                  </Tooltip>
                </>
              ))}
          </>
        </Row>
      ),
    },
  ];
  return (
    <div>
      <Typography>
        <Typography.Title level={5}>
          Quản lý chung cư
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

export default ApartmentManage;
