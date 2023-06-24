import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import {
  Breadcrumb,
  Button,
  Carousel,
  Divider,
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
import {
  getListRental,
  getListUniversity,
  getVNPayRedirect,
} from "./service";
import { useRef } from "react";
import { district } from "@/utils/constant";
import Link from "next/link";
import { useRouter } from "next/router";

const RentMainPage = () => {
  const carouselRef = useRef();
  const history = useRouter();

  const [filter, setFilter] = useState<{
    page_size: number;
    page_index: number;
    search: string;
    district: string;
    price: string[];
    type: string[];
    lat?: number;
    long?: number;
  }>({
    page_index: 1,
    page_size: 15,
    search: "",
    district: "",
    price: [],
    type: [],
  });

  const listUniversity = useRequest(getListUniversity, {});

  const listRental = useRequest(getListRental, {
    manual: true,
    debounceWait: 500,
  });

  useEffect(() => {
    listRental.run(filter);
  }, [filter]);
  useEffect(() => {
    if (history.query?.name) {
      setFilter((state) => ({
        ...state,
        lat: Number(history.query?.lat),
        long: Number(history.query?.long),
      }));
    }
  }, [history]);
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
              {history.query?.name && (
                <Breadcrumb.Item>
                  <p>{history.query?.name}</p>
                </Breadcrumb.Item>
              )}
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
              {!history.query?.name && (
                <Form.Item name="district">
                  <Select
                    allowClear
                    options={district}
                    placeholder="Khu vực"
                    onChange={(val) => {
                      setFilter((state) => ({
                        ...state,
                        district: val,
                      }));
                    }}
                  />
                </Form.Item>
              )}
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
      {history.query?.name ? (
        <div className={styles.container}>
          <div className={styles.titleFilterByUni}>
            <h1>
              CHO THUÊ PHÒNG TRỌ, CCMN GẦN{" "}
              {history.query?.name}
            </h1>
            <Divider
              style={{
                margin: 0,
              }}
            />
            <p>
              Cho thuê phòng trọ giá rẻ, chung cư mini full
              đồ sinh viên gần {history.query?.name}. Điện
              nước giá dân (3k2/ số, 20k/ khối), không chung
              chủ, an ninh đảm bảo camera 24h, vân tay bảo
              mật an toàn,...
            </p>
          </div>
        </div>
      ) : (
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
                {listUniversity.data?.data?.map(
                  (item: any, index: number) => (
                    <Link
                      href={{
                        pathname: "/rental",
                        query: {
                          name: item.name,
                          lat: item.lat,
                          long: item.long,
                        },
                      }}
                    >
                      <div
                        key={index}
                        className={styles.slideItem}
                      >
                        <div>
                          <b>{item.name}</b>
                          <p>{`Có ${item.count} căn hộ cho thuê`}</p>
                        </div>
                      </div>
                    </Link>
                  )
                )}
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
      )}
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
