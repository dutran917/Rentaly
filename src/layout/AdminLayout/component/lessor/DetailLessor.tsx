import { useRequest } from "ahooks";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  getDetailLessor,
  updateProfileLessor,
} from "./service";
import {
  Breadcrumb,
  Button,
  Col,
  Form,
  Input,
  Row,
  Table,
  notification,
  Typography,
} from "antd";
import {
  EditOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { ColumnsType } from "antd/lib/table";
import { formatNumber } from "@/utils/helper";
import Link from "next/link";
const DetailLessor = () => {
  const router = useRouter();
  const { id } = router.query;
  const detailLessor = useRequest(getDetailLessor, {
    manual: true,
    onSuccess(res) {
      form.setFieldsValue(res.data?.data);
    },
  });

  const updateLessor = useRequest(updateProfileLessor, {
    manual: true,
    onSuccess(res) {
      detailLessor.run(Number(id));
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
  useEffect(() => {
    if (id) {
      detailLessor.run(Number(id));
    }
  }, [id]);
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
      dataIndex: "rooms",
      render: (value) => <>{value?.length}</>,
    },
    {
      title: "Doanh thu",
      dataIndex: "totalIncome",
      render: (value) => <>{formatNumber(value)}</>,
    },
  ];
  const [disabled, setDisabled] = useState(true);
  const [form] = Form.useForm();

  const onSubmit = (val: any) => {
    updateLessor.run({
      lessorId: Number(id),
      ...val,
    });
  };
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link href="/admin/lessor-management">
            <Row align="middle">
              <LeftOutlined />
              <div>Quản lý chủ nhà</div>
            </Row>
          </Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Typography>
        <Typography.Title level={5}>
          Thông tin chủ nhà
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
            <Form.Item
              name="full_name"
              label="Họ tên chủ nhà"
            >
              <Input />
            </Form.Item>
            <Form.Item name="phone" label="Số điện thoại">
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Email">
              <Input />
            </Form.Item>
            <Form.Item label="Mật khẩu" name="password">
              <Input.Password placeholder="Đổi mật khẩu tài khoản" />
            </Form.Item>

            {!disabled && (
              <Row>
                <Button
                  danger
                  onClick={() => {
                    detailLessor.run(Number(id));
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

      <div
        style={{
          margin: "20px 0",
        }}
      >
        <Typography>
          <Typography.Title level={5}>
            Doanh thu của chủ nhà
          </Typography.Title>
        </Typography>
        <Typography>
          <Typography.Title level={5}>
            Tổng doanh thu:{" "}
            {formatNumber(
              detailLessor.data?.data?.lessorIncome
            )}
            VND
          </Typography.Title>
        </Typography>
        <Table
          columns={columns}
          dataSource={
            detailLessor.data?.data?.listApartment
          }
          loading={detailLessor.loading}
        />
      </div>
    </div>
  );
};

export default DetailLessor;
