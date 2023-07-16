import {
  Breadcrumb,
  Button,
  Col,
  Form,
  Input,
  Row,
  notification,
  Typography,
  Table,
} from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  LeftOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import { useRequest } from "ahooks";
import {
  getDetailUser,
  updateProfileUser,
} from "./service";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";
import { formatNumber } from "@/utils/helper";
const DetailUser = () => {
  const [disabled, setDisabled] = useState(true);
  const [form] = Form.useForm();
  const router = useRouter();
  const { id } = router.query;
  const detailUser = useRequest(getDetailUser, {
    manual: true,
    onSuccess(res) {
      form.setFieldsValue(res.data?.data);
    },
  });

  const updateUser = useRequest(updateProfileUser, {
    manual: true,
    onSuccess(res) {
      detailUser.run(Number(id));
      setDisabled(true);
      notification.success({
        message: "Cập nhật thông tin thành công",
      });
    },
    onError() {
      notification.error({
        message: "Trùng thông tin",
      });
    },
  });

  const onSubmit = (val: any) => {
    updateUser.run({
      lessorId: Number(id),
      ...val,
    });
  };

  const columns: ColumnsType<any> = [
    {
      title: "Phòng",
      dataIndex: "room",
      render: (_: any, record: any) => (
        <>{record?.room?.title}</>
      ),
    },
    {
      title: "Chung cư",
      dataIndex: "id",
      render: (_: any, record: any) => (
        <>{record?.room?.Apartment?.title}</>
      ),
    },
    {
      title: "Ngày chuyển đến",
      dataIndex: "start_at",
      render: (_: any, record: any) => (
        <>{moment(record?.start_at).format("DD/MM/YYYY")}</>
      ),
    },
    {
      title: "Ngày hết hạn HĐ",
      dataIndex: "end_at",
      render: (_: any, record: any) => (
        <>{moment(record?.end_at).format("DD/MM/YYYY")}</>
      ),
    },

    {
      title: "Đã thanh toán",
      dataIndex: "price",
      render: (_: any, record: any) => (
        <>{formatNumber(record?.price)}đ</>
      ),
    },
  ];

  useEffect(() => {
    if (id) {
      detailUser.run(Number(id));
    }
  }, [id]);

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link href="/admin/user-management">
            <Row align="middle">
              <LeftOutlined />
              <div>Quản lý người thuê</div>
            </Row>
          </Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Typography>
        <Typography.Title level={5}>
          Thông tin người thuê
        </Typography.Title>
      </Typography>
      <Row>
        <Col span={11}>
          <Button
            style={{
              margin: "15px 0",
            }}
            icon={<EditOutlined />}
            onClick={() => setDisabled(!disabled)}
          ></Button>
          <Form
            disabled={disabled}
            form={form}
            onFinish={onSubmit}
            layout="vertical"
          >
            <Form.Item name="full_name" label="Họ và tên">
              <Input />
            </Form.Item>
            <Form.Item name="phone" label="Số điện thoại">
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Email">
              <Input />
            </Form.Item>
            {!disabled && (
              <Row>
                <Button
                  danger
                  onClick={() => {
                    detailUser.run(Number(id));
                    setDisabled(true);
                  }}
                >
                  Hủy
                </Button>
                <Button
                  style={{
                    margin: " 0 15px",
                  }}
                  htmlType="submit"
                >
                  Lưu
                </Button>
              </Row>
            )}
          </Form>
        </Col>
      </Row>
      <div>
        <Typography>
          <Typography.Title level={5}>
            Phòng đã thuê
          </Typography.Title>
        </Typography>

        <Table
          columns={columns}
          dataSource={
            detailUser.data?.data?.historyRent?.data
          }
          // rowKey={(item) => item.id}
          loading={detailUser.loading}
          // scroll={{ x: 1000 }}
        />
      </div>
    </div>
  );
};

export default DetailUser;
