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
  notification,
} from "antd";
import { ColumnsType } from "antd/lib/table";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import {
  EyeOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import {
  getListLessor,
  verifyLessorService,
} from "./service";

const LessorManagement = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { tableProps, refresh, search, loading } =
    useAntdTable(getListLessor, {
      form,
    });

  const { submit } = search;
  const verifyLessor = useRequest(verifyLessorService, {
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
  });
  const handleVerifyLessor = (id: number) => {
    return Modal.confirm({
      title: "Xác nhận phê duyệt",
      content: "Bạn muốn phê duyệt tài khoản chủ nhà này?",
      okText: "Xác nhận",
      cancelText: "Hủy",
      okButtonProps: {
        loading: verifyLessor.loading,
      },
      onOk() {
        verifyLessor.run({
          lessor_id: id,
          accept: true,
        });
      },
    });
  };

  const [formRefuseVerified] = Form.useForm();
  const handleRefuseLessor = (id: number) => {
    const onFinish = (val: any) => {
      verifyLessor.run({
        lessor_id: id,
        accept: false,
        reason: val.reason,
      });
    };

    Modal.confirm({
      icon: null,
      title: "Lý do từ chối yêu cầu xác thực:",
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
        loading: verifyLessor.loading,
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
        layout="vertical"
        form={form}
        initialValues={{
          verified: "PENDING",
        }}
      >
        <Form.Item name="verified">
          <Select
            allowClear
            onChange={submit}
            placeholder="Trạng thái"
            options={[
              {
                label: "Chờ xác thực",
                value: "PENDING",
              },
              {
                label: "Đã xác thực",
                value: "ACCEPT",
              },
              {
                label: "Từ chối xác thực",
                value: "REFUSE",
              },
            ]}
            onSearch={submit}
          />
        </Form.Item>
      </Form>
      <Button
        type="primary"
        // onClick={() =>
        //   router.push("/manager/add-apartment")
        // }
      >
        Thêm chủ nhà
      </Button>
    </Row>
  );

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
      title: "Số chung cư đã đăng ký",
      align: "center",
      render: (_, rc) => <>{rc?.apartment?.length || 0}</>,
    },
    {
      title: "Trạng thái",
      dataIndex: "verified",
      render(value, record, index) {
        if (value === "PENDING")
          return <Tag color="warning">Chờ xác thực</Tag>;
        if (value === "ACCEPT")
          return <Tag color="green">Đã xác thực</Tag>;
        if (value === "REFUSE")
          return <Tag color="red">Từ chối xác thực</Tag>;
      },
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
                  `lessor-management/${record?.id}`
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
                      handleVerifyLessor(record?.id)
                    }
                  />
                </Tooltip>
                <Tooltip title="Từ chối">
                  <CloseOutlined
                    style={{
                      color: "red",
                    }}
                    onClick={() =>
                      handleRefuseLessor(record?.id)
                    }
                  />
                </Tooltip>
              </>
            )}
          </>
        </Row>
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

export default LessorManagement;
