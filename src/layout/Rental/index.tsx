import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import {
  Breadcrumb,
  Button,
  Carousel,
  Form,
  Input,
  Pagination,
  Row,
  Select,
} from "antd";
import {
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import ListItem from "./components/ListItem";
import { useRequest } from "ahooks";
import { getListRental } from "./service";
import { useRef } from "react";
const RentMainPage = () => {
  const [filter, setFilter] = useState<{
    page_size: number;
    page_index: number;
    search: string;
    district: string;
    price: string[];
    type: string[];
  }>({
    page_index: 1,
    page_size: 15,
    search: "",
    district: "",
    price: [],
    type: [],
  });

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

  const mockUniversity = [
    {
      id: 1,
      name: "Đại học bách khoa",
      total: 5,
    },
    {
      id: 2,
      name: "Đại học ádasd",
      total: 5,
    },
    {
      id: 3,
      name: "Đại học ádasd khoa",
      total: 5,
    },
    {
      id: 4,
      name: "Đại học bách zxczxczxczx",
      total: 11,
    },
    {
      id: 5,
      name: "Đại học ádsffs",
      total: 13,
    },
    {
      id: 6,
      name: "Đại học đâsd sadasdas",
      total: 3,
    },
    {
      id: 7,
      name: "Đại học đâsd sadasdas",
      total: 5,
    },
    {
      id: 8,
      name: "Đại học đâsd sadasdas",
      total: 5,
    },
    {
      id: 9,
      name: "Đại học đâsd sadasdas",
      total: 5,
    },
    {
      id: 10,
      name: "Đại học đâsd sadasdas",
      total: 5,
    },
  ];

  const listRental = useRequest(getListRental, {
    manual: true,
    debounceWait: 500,
  });

  useEffect(() => {
    listRental.run(filter);
  }, [filter]);

  const carouselRef = useRef();

  return (
    <div>
      <div className={styles.filterSection}>
        <div className={styles.container}>
          <div className={styles.filter}>
            <Breadcrumb className={styles.Breadcrumb}>
              <Breadcrumb.Item>
                <a href="/">Trang chủ</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <a href="rental">Thuê phòng và CCMN</a>
              </Breadcrumb.Item>
            </Breadcrumb>
            <Form layout="inline" className="formFilter">
              <Form.Item>
                <Input
                  allowClear
                  placeholder="Nhập địa chỉ"
                  style={{
                    border: "1px solid rgba(0, 0, 0, 0.6)",
                  }}
                  onChange={(e) =>
                    setFilter((state) => ({
                      ...state,
                      search: e.target.value,
                    }))
                  }
                />
              </Form.Item>
              <Form.Item name="district">
                <Select
                  allowClear
                  options={options}
                  placeholder="Khu vực"
                  onChange={(val) => {
                    setFilter((state) => ({
                      ...state,
                      district: val,
                    }));
                  }}
                />
              </Form.Item>
              <Form.Item name="type">
                <Select
                  allowClear
                  onChange={(val) => {
                    setFilter((state) => ({
                      ...state,
                      type: val?.split("-"),
                    }));
                  }}
                  options={[
                    {
                      label: "1 ngủ",
                      value: "0-1",
                    },
                    {
                      label: "1 khách - 1 ngủ",
                      value: "1-1",
                    },
                    {
                      label: "1 khách - 2 ngủ",
                      value: "1-2",
                    },
                    {
                      label: "1 khách - 3 ngủ",
                      value: "1-3",
                    },
                  ]}
                  placeholder="Loại phòng"
                />
              </Form.Item>
              <Form.Item name="price">
                <Select
                  onChange={(val) => {
                    console.log(val);

                    setFilter((state) => ({
                      ...state,
                      price: val?.split("-"),
                    }));
                  }}
                  allowClear
                  options={[
                    {
                      label: "Nhỏ hơn 3.000.000d",
                      value: "0-3000000",
                    },
                    {
                      label: "3.000.000 - 5.000.000d",
                      value: "3000000-5000000",
                    },
                    {
                      label: "5.000.000 - 8.000.000d",
                      value: "5000000-8000000",
                    },
                    {
                      label: "Lớn hơn 8.000.000d",
                      value: "8000000-100000000",
                    },
                  ]}
                  placeholder="Giá phòng"
                />
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
      <div className={styles.slideSection}>
        <div className={styles.container}>
          <div className={styles.carousel}>
            <Carousel
              // dotPosition="bottom"
              // className={styles.carousel}

              dots={false}
              // @ts-ignore
              ref={carouselRef}
              style={{
                // textAlign: "center",
                padding: "10px 0",
              }}
              slidesToShow={4}
              slidesToScroll={4}
              responsive={[
                {
                  breakpoint: 900,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    centerMode: false,
                  },
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    centerMode: false,
                  },
                },
              ]}

              // cssEase=""
            >
              {mockUniversity.map((item) => (
                <div
                  key={item.id}
                  className={styles.slideItem}
                >
                  <div>
                    <b>{item.name}</b>
                    <p>{`Có ${item.total} căn hộ cho thuê`}</p>
                  </div>
                </div>
              ))}
            </Carousel>
            <Button
              style={{
                background: "rgba(0, 0, 0, 0.3)",
                borderRadius: "50%",
              }}
              className={styles.carouselIconPrev}
              type="text"
              icon={<LeftOutlined />}
              // @ts-ignore
              onClick={() => carouselRef.current?.prev()}
            ></Button>
            <Button
              style={{
                background: "rgba(0, 0, 0, 0.3)",
                borderRadius: "50%",
              }}
              type="text"
              className={styles.carouselIconNext}
              icon={<RightOutlined />}
              // @ts-ignore
              onClick={() => carouselRef.current?.next()}
            ></Button>
          </div>
        </div>
      </div>
      <div className={styles.listItemSection}>
        <div className={styles.container}>
          <ListItem
            listItem={listRental.data?.data}
            loading={listRental?.loading}
          />
          {listRental?.data?.data?.data?.length > 0 && (
            <div className={styles.pagination}>
              <Pagination
                current={filter.page_index}
                onChange={(page) =>
                  setFilter((state) => ({
                    ...state,
                    page_index: page,
                  }))
                }
                total={listRental?.data?.data?.total}
                pageSize={filter.page_size}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RentMainPage;
