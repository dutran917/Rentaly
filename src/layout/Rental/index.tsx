import React from "react";
import styles from "./index.module.scss";
import {
  Breadcrumb,
  Carousel,
  Form,
  Input,
  Row,
  Select,
} from "antd";
import ListItem from "./components/ListItem";
const RentMainPage = () => {
  const options = [
    {
      label: "Đống đa",
      value: 1,
    },
    {
      label: "Hai bà trưng",
      value: 2,
    },
    {
      label: "Cầu giấy",
      value: 3,
    },
    {
      label: "Mỹ đình",
      value: 4,
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

  const mockData = [
    {
      image:
        "https://bandon.vn/resize/300x200/a-c/zc-1/f/uploads/motels/so-9-day-b5-ngo-7-kim-ma-thuong-12.jpg",
      title: "chung Cư số 156 Hồng Mai, Hai bà trưng",
      rate: 4.5,
      type: "1 khách | 2 ngủ",
      price: 6000000,
      address: "Quỳnh Lôi, Hai bà Trưng, Hà nội",
    },
    {
      image:
        "https://bandon.vn/resize/300x200/a-c/zc-1/f/uploads/motels/so-9-day-b5-ngo-7-kim-ma-thuong-12.jpg",
      title: "chung Cư số 156 Hồng Mai, Hai bà trưng",
      rate: 4.5,
      type: "1 khách | 2 ngủ",
      price: 6000000,
      address: "Quỳnh Lôi, Hai bà Trưng, Hà nội",
    },
    {
      image:
        "https://bandon.vn/resize/300x200/a-c/zc-1/f/uploads/motels/so-9-day-b5-ngo-7-kim-ma-thuong-12.jpg",
      title: "chung Cư số 156 Hồng Mai, Hai bà trưng",
      rate: 4.5,
      type: "1 khách | 2 ngủ",
      price: 6000000,
      address: "Quỳnh Lôi, Hai bà Trưng, Hà nội",
    },
    {
      image:
        "https://bandon.vn/resize/300x200/a-c/zc-1/f/uploads/motels/so-9-day-b5-ngo-7-kim-ma-thuong-12.jpg",
      title: "chung Cư số 156 Hồng Mai, Hai bà trưng",
      rate: 4.5,
      type: "1 khách | 2 ngủ",
      price: 6000000,
      address: "Quỳnh Lôi, Hai bà Trưng, Hà nội",
    },
    {
      image:
        "https://bandon.vn/resize/300x200/a-c/zc-1/f/uploads/motels/so-9-day-b5-ngo-7-kim-ma-thuong-12.jpg",
      title: "chung Cư số 156 Hồng Mai, Hai bà trưng",
      rate: 4.5,
      type: "1 khách | 2 ngủ",
      price: 6000000,
      address: "Quỳnh Lôi, Hai bà Trưng, Hà nội",
    },
    {
      image:
        "https://bandon.vn/resize/300x200/a-c/zc-1/f/uploads/motels/so-9-day-b5-ngo-7-kim-ma-thuong-12.jpg",
      title: "chung Cư số 156 Hồng Mai, Hai bà trưng",
      rate: 4.5,
      type: "1 khách | 2 ngủ",
      price: 6000000,
      address: "Quỳnh Lôi, Hai bà Trưng, Hà nội",
    },
    {
      image:
        "https://bandon.vn/resize/300x200/a-c/zc-1/f/uploads/motels/so-9-day-b5-ngo-7-kim-ma-thuong-12.jpg",
      title: "chung Cư số 156 Hồng Mai, Hai bà trưng",
      rate: 4.5,
      type: "1 khách | 2 ngủ",
      price: 6000000,
      address: "Quỳnh Lôi, Hai bà Trưng, Hà nội",
    },
  ];

  return (
    <div>
      <div className={styles.filterSection}>
        <div className={styles.container}>
          <div className={styles.filter}>
            <Breadcrumb>
              <Breadcrumb.Item>
                <a href="/">Trang chủ</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <a href="rental">Thuê phòng và CCMN</a>
              </Breadcrumb.Item>
            </Breadcrumb>
            <Form layout="inline" className="formFilter">
              <Form.Item name="addressSearch">
                <Input
                  placeholder="Nhập địa chỉ"
                  style={{
                    border: "1px solid rgba(0, 0, 0, 0.6)",
                  }}
                />
              </Form.Item>
              <Form.Item name="district">
                <Select
                  options={options}
                  placeholder="Khu vực"
                />
              </Form.Item>
              <Form.Item name="type">
                <Select
                  options={[
                    {
                      label: "1 khách - 1 ngủ",
                      value: 1,
                    },
                    {
                      label: "1 khách - 2 ngủ",
                      value: 2,
                    },
                    {
                      label: "1 khách - 3 ngủ",
                      value: 3,
                    },
                  ]}
                  placeholder="Loại phòng"
                />
              </Form.Item>
              <Form.Item name="price">
                <Select
                  options={[
                    {
                      label: "0 - 3.000.000d",
                      value: 1,
                    },
                    {
                      label: "3.000.000 - 5.000.000d",
                      value: 2,
                    },
                    {
                      label: "5.000.000 - 8.000.000d",
                      value: 3,
                    },
                    {
                      label: "Lớn hơn 8.000.000d",
                      value: 4,
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
          <Carousel
            dotPosition="bottom"
            style={{
              // textAlign: "center",
              padding: "10px 0",
            }}
            slidesToShow={4}
            slidesToScroll={4}
          >
            {mockUniversity.map((item) => (
              <div>
                <div
                  key={item.id}
                  className={styles.slideItem}
                >
                  <b>{item.name}</b>
                  <p>{`Có ${item.total} căn hộ cho thuê`}</p>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
      <div className={styles.listItemSection}>
        <div className={styles.container}>
          <ListItem listItem={mockData} />
        </div>
      </div>
    </div>
  );
};

export default RentMainPage;
