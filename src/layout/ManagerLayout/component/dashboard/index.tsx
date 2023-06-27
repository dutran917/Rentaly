import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Breadcrumb, Form, Row, Select } from "antd";
import styles from "./index.module.scss";
import { useRequest } from "ahooks";
import { getStatisticService } from "./service";
import { getAllApartment } from "../apointment/service";
import { formatNumber } from "@/utils/helper";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
];

const DashboardManager = () => {
  const [general, setGeneral] = useState<{
    name: string;
    total: number;
  }>({
    name: "",
    total: 0,
  });
  const options = {
    plugins: {
      title: {
        display: true,
        text: "Doanh thu theo tháng của chung cư",
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  const [dataStatistic, setDataStatistic] = useState<any>({
    labels: labels,
    datasets: [
      {
        label: "Tất cả",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
    ],
  });
  function random_rgba() {
    var o = Math.round,
      r = Math.random,
      s = 255;
    return (
      "rgba(" +
      o(r() * s) +
      "," +
      o(r() * s) +
      "," +
      o(r() * s) +
      "," +
      r().toFixed(1) +
      ")"
    );
  }
  const statistic = useRequest(getStatisticService, {
    manual: true,
    onSuccess(res) {
      const sum = res?.data?.all?.reduce(
        (total: any, item: any) => total + item
      );
      setGeneral({
        ...general,
        total: sum,
      });
      setDataStatistic((state: any) => ({
        ...state,
        datasets: [
          //  {
          //    label: "Tất cả",
          //    data: res?.data?.all,
          //    backgroundColor: random_rgba(),
          //  },
          ...res.data?.rooms?.map((item: any) => ({
            label: "P" + item?.title,
            data: item?.stats,
            backgroundColor: random_rgba(),
          })),
        ],
      }));
    },
  });
  const { data } = useRequest(getAllApartment, {
    onSuccess(res) {
      form.setFieldsValue({
        apartmentId: res.data?.[0]?.id,
        year: "2023",
      });
    },
  });

  console.log(data);

  const [form] = Form.useForm();

  const searchForm = (
    <Row className={styles.searchForm}>
      <Form layout="inline" form={form}>
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
            onChange={(val) => {
              statistic.run({
                apartmentId: val,
                year: form.getFieldValue("year"),
              });
            }}
          />
        </Form.Item>
        <Form.Item name="year">
          <Select
            style={{
              width: "100px",
            }}
            placeholder="Năm"
            options={[
              {
                label: "2022",
                value: "2022",
              },
              {
                label: "2023",
                value: "2023",
              },
              {
                label: "2024",
                value: "2024",
              },
            ]}
            onChange={(val) => {
              statistic.run({
                apartmentId:
                  form.getFieldValue("apartmentId"),
                year: val,
              });
            }}
          />
        </Form.Item>
      </Form>
      <div
        style={{
          fontSize: "18px",
        }}
      >
        <b>Tổng doanh thu: </b>
        <span>{`${formatNumber(general.total)}đ`}</span>
      </div>
    </Row>
  );

  return (
    <div>
      <Breadcrumb className={styles.breadcrumb}>
        <Breadcrumb.Item>Quản lý doanh thu</Breadcrumb.Item>
      </Breadcrumb>
      {searchForm}
      <Bar options={options} data={dataStatistic} />
    </div>
  );
};

export default DashboardManager;
