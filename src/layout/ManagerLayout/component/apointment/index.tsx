import { useAntdTable, useRequest } from "ahooks";
import React, { useState } from "react";
import {
  changeStatusApointment,
  getAllApartment,
  getListApointment,
} from "./service";
import {
  Form,
  Row,
  DatePicker,
  Select,
  Table,
  Breadcrumb,
  Tooltip,
  Tag,
  notification,
} from "antd";
import { ColumnsType } from "antd/lib/table";
import {
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import styles from "./index.module.scss";
import moment from "moment";
const { RangePicker } = DatePicker;
const ApointmentManage = () => {
  const [apartment, setApartment] = useState<any[]>([]);
  const [form] = Form.useForm();
  const { tableProps, search, loading, refresh } =
    useAntdTable(getListApointment, {
      form,
      manual: false,
    });

  const { data } = useRequest(getAllApartment);
  const handleApointment = useRequest(
    changeStatusApointment,
    {
      manual: true,
      onSuccess() {
        notification.success({
          message: "Thành công",
        });
        refresh();
      },
      onError() {
        notification.error({
          message: "Có lỗi xảy ra",
        });
      },
    }
  );

  const { submit } = search;
  const searchForm = (
    <Row className={styles.searchForm}>
      <Form layout="inline" form={form}>
        <Form.Item name="date">
          <RangePicker
            format="DD/MM/YYYY"
            onChange={search.submit}
            className="w-100"
            picker="date"
            placeholder={["Từ ngày", "Đến ngày"]}
          />
        </Form.Item>
        <Form.Item name="apartmentId">
          <Select
            style={{
              width: "400px",
            }}
            placeholder="Lọc theo chung cư"
            options={data?.data?.map((item: any) => ({
              label: item?.title,
              value: item?.id,
              key: item?.id,
            }))}
            onChange={submit}
          />
        </Form.Item>
      </Form>
    </Row>
  );

  const columns: ColumnsType<any> = [
    {
      title: "Họ và tên",
      dataIndex: "fullName",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
    },
    {
      title: "Ngày xem phòng",
      dataIndex: "date",
      render: (value) => (
        <>{moment(value).format("HH:mm DD/MM/YYYY")}</>
      ),
    },
    {
      title: "Phòng",
      dataIndex: "room",
    },
    {
      title: "Chung cư",
      dataIndex: "apartment",
    },
    {
      title: "Ghi chú của người hẹn",
      dataIndex: "note",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (value) => (
        <>
          <Tag
            color={
              value === "PENDING"
                ? "warning"
                : value === "SUCCESS"
                ? "green"
                : "red"
            }
          >
            {value === "PENDING"
              ? "Đã đặt lịch"
              : value === "SUCCESS"
              ? "Đã xem"
              : "Đã hủy"}
          </Tag>
        </>
      ),
    },
    {
      title: "Hành động",
      width: "10%",
      align: "center",
      render: (value, record) => (
        <>
          {record?.status === "PENDING" && (
            <Row justify="space-around">
              <Tooltip title="Khách đã xem">
                <CheckOutlined
                  onClick={() =>
                    handleApointment.run(true, record?.id)
                  }
                  style={{
                    color: "green",
                    cursor: "pointer",
                  }}
                />
              </Tooltip>
              <Tooltip title="Khách đã hủy">
                <CloseOutlined
                  onClick={() =>
                    handleApointment.run(false, record?.id)
                  }
                  style={{
                    color: "red",
                    cursor: "pointer",
                  }}
                />
              </Tooltip>
            </Row>
          )}
        </>
      ),
    },
  ];
  return (
    <div>
      <Breadcrumb className={styles.breadcrumb}>
        <Breadcrumb.Item>Quản lý chung cư</Breadcrumb.Item>
      </Breadcrumb>
      {searchForm}
      <Table
        {...tableProps}
        columns={columns}
        rowKey={(item) => item.id}
        scroll={{ x: 1000 }}
      />
    </div>
  );
};

export default ApointmentManage;
