import { useAntdTable, useRequest } from "ahooks";
import React, { useState } from "react";
import {
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
} from "antd";
import { ColumnsType } from "antd/lib/table";
import styles from "./index.module.scss";
import moment from "moment";
const { RangePicker } = DatePicker;
const ApointmentManage = () => {
  const [apartment, setApartment] = useState<any[]>([]);
  const [form] = Form.useForm();
  const { tableProps, search, loading } = useAntdTable(
    getListApointment,
    {
      form,
      manual: false,
    }
  );

  const { data } = useRequest(getAllApartment);
  console.log(data);

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
