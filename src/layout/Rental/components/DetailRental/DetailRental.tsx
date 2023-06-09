import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import { useRouter } from "next/router";
import { useRequest } from "ahooks";
import {
  getDetailApartment,
  getListRoom,
  getRoom,
} from "../../service";
// import renderHTML from 'react-render-html';
import {
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Card,
  Carousel,
  Col,
  DatePicker,
  Row,
  Space,
} from "antd";
import Link from "next/link";
import { formatNumber } from "@/utils/helper";
const DetailRental = () => {
  const router = useRouter();
  const { id } = router.query;
  const [listRoom, setListRoom] = useState([]);
  const [selectedFilter, setSelectedFilter] =
    useState(null);
  const [selectedRoom, setSelectedRoom] = useState<any>();
  const data = useRequest(getDetailApartment, {
    manual: true,
    onSuccess: (res) => {
      setListRoom(res?.data?.rooms);
      setSelectedRoom(res?.data?.rooms?.[0]);
    },
  });
  const filterListRoom = useRequest(getListRoom, {
    manual: true,
    onSuccess: (res) => {
      setListRoom(res.data?.data);
    },
  });

  const roomDetail = useRequest(getRoom, {
    manual: true,
    onSuccess: (res) => {
      console.log(res);

      setSelectedRoom(res?.data);
    },
  });

  const detail = data.data?.data;
  useEffect(() => {
    if (id) {
      data.run(Number(id));
    }
  }, [id]);
  const carouselRef = useRef();

  const checkListRoom = (rooms: any[]) => {
    const result: string[] = [];
    const type: any[] = [];
    rooms?.forEach((item) => {
      const typeOfRoom = `${item.bed_room}-${item?.living_room}`;
      if (item.bed_room === 1 && item?.living_room === 1) {
        const p = "Phòng 1 ngủ - 1 khách";
        if (!result.includes(p)) {
          result.push(p);
        }
        if (!type.includes(typeOfRoom)) {
          type.push(typeOfRoom);
        }
      }
      if (item.bed_room !== 0 && item?.living_room === 0) {
        const p = `Phòng ${item?.bed_room} ngủ`;
        if (!result.includes(p)) {
          result.push(p);
        }
        if (!type.includes(typeOfRoom)) {
          type.push(typeOfRoom);
        }
      }
      if (item.bed_room !== 0 && item?.living_room === 1) {
        const p = `Phòng ${item?.bed_room} ngủ - 1 khách`;
        if (!result.includes(p)) {
          result.push(p);
        }
        if (!type.includes(typeOfRoom)) {
          type.push(typeOfRoom);
        }
      }
    });
    return { result, type };
  };

  // useEffect(() => {
  //   setListRoom(detail?.rooms);
  // }, [data]);
  console.log(listRoom);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link href="/">Trang chủ</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link href="/rental">Thuê phòng</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{detail?.title}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className={styles.carousel}>
        <Carousel
          dots={false}
          ref={carouselRef}
          style={{
            // textAlign: "center",
            padding: "10px 0",
          }}
          slidesToShow={2}
          slidesToScroll={1}
        >
          {detail?.image?.map((item: any, i) => (
            <div className={styles.slideItem} key={i}>
              <img src={item.url} />
            </div>
          ))}
        </Carousel>
        <div
          className={styles.carouselIconPrev}
          onClick={() => carouselRef.current?.prev()}
        >
          <LeftOutlined
            style={
              {
                // fontSize: "25px",
              }
            }
          />
        </div>
        <div
          className={styles.carouselIconNext}
          onClick={() => carouselRef.current?.next()}
        >
          <RightOutlined
            style={
              {
                // fontSize: "25px",
              }
            }
          />
        </div>
      </div>
      <div className={styles.container}>
        <Row>
          <Col
            flex="3 0"
            style={{
              padding: "15px",
            }}
          >
            <div className={styles.title}>
              <h1>
                <strong
                  style={{
                    fontWeight: "400",
                  }}
                >
                  {detail?.title}
                </strong>
              </h1>
              <Row align="top">
                <img
                  src="/icons/marker.png"
                  style={{
                    width: "20px",
                    height: "20px",
                    marginRight: "10px",
                  }}
                />
                <p>{`${detail?.district}, ${detail?.province}`}</p>
              </Row>
              <Row align="top">
                <img
                  src="/icons/door.png"
                  style={{
                    width: "20px",
                    height: "20px",
                    marginRight: "10px",
                  }}
                />
                <p>
                  {checkListRoom(detail?.rooms).result.join(
                    " || "
                  )}
                </p>
              </Row>
              <Row align="top">
                <img
                  src="/icons/price-tag.png"
                  style={{
                    width: "20px",
                    height: "20px",
                    marginRight: "10px",
                  }}
                />
                <p>Giá dịch vụ</p>
              </Row>
              <div className={styles.servicePriceRow}>
                <Row wrap>
                  <Col flex="1 0">
                    <div className={styles.servicePrice}>
                      <p>Giá điện</p>
                      <p>3500đ/số</p>
                    </div>
                  </Col>
                  <Col flex="1 0">
                    <div className={styles.servicePrice}>
                      <p>Giá vệ sinh</p>
                      <p>30.000đ/người</p>
                    </div>
                  </Col>
                </Row>
                <Row wrap>
                  <Col flex="1 0">
                    <div className={styles.servicePrice}>
                      <p>Giá nước</p>
                      <p>20.000đ/số</p>
                    </div>
                  </Col>
                  <Col flex="1 0">
                    <div className={styles.servicePrice}>
                      <p>Giá thang máy</p>
                      <p>50.000đ/người</p>
                    </div>
                  </Col>
                </Row>
                <Row wrap>
                  <Col flex="1 0">
                    <div className={styles.servicePrice}>
                      <p>Giá Internet</p>
                      <p>100.000d/phòng</p>
                    </div>
                  </Col>
                  <Col flex="1 0">
                    <div className={styles.servicePrice}>
                      <p>Giá gửi xe</p>
                      <p>100.000đ/xe</p>
                    </div>
                  </Col>
                </Row>
              </div>

              <div className={styles.roomDescription}>
                <div className={styles.subtitle}>
                  <p>✺ Mô tả chung</p>
                  <div>{detail?.subtitle}</div>
                </div>
                <div className={styles.content}>
                  <strong>✪ Tổng quan căn phòng</strong>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: detail?.content,
                    }}
                  />
                </div>
              </div>

              <div className={styles.roomList}>
                <div className={styles.roomListTitle}>
                  <p>✺ Danh sách phòng</p>
                  <div>
                    Chọn loại phòng và căn hộ phù hợp với
                    bạn
                  </div>
                </div>
                <div className={styles.roomType}>
                  {checkListRoom(detail?.rooms).type.map(
                    (item, i) => (
                      <Button
                        type="primary"
                        ghost={selectedFilter !== item}
                        key={i}
                        onClick={() => {
                          setSelectedFilter(item);
                          filterListRoom.run({
                            apartmentId: Number(id),
                            bed_room: Number(
                              item?.split("-")[0]
                            ),
                            living_room: Number(
                              item?.split("-")[1]
                            ),
                          });
                        }}
                      >
                        {
                          checkListRoom(detail?.rooms)
                            .result[i]
                        }
                      </Button>
                    )
                  )}
                </div>
                <Row wrap>
                  <Col flex="1 0">
                    <div
                      className={styles.roomListFiltered}
                    >
                      {listRoom?.map((item: any) => (
                        <div
                          key={item?.id}
                          className={
                            selectedRoom?.id === item?.id
                              ? styles.selectedRoom
                              : styles.room
                          }
                          onClick={() => {
                            roomDetail.run(item?.id);
                          }}
                        >{`P${item?.title}`}</div>
                      ))}
                    </div>
                  </Col>
                  <Col flex="1 0">
                    <div>asdasdd</div>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
          <Col flex="1 0">
            <div className={styles.cardRoomBooking}>
              <div className={styles.cardRoomBookingTitle}>
                {formatNumber(selectedRoom?.price) +
                  "đ/tháng"}
              </div>
              <div className={styles.roomBooking}>
                <DatePicker
                  placeholder="Chọn ngày xem phòng"
                  className={styles.roomBookingDate}
                />
                <div className={styles.roomBookingBtn1}>
                  Đặt lịch xem phòng
                </div>
                <div className={styles.roomBookingBtn2}>
                  Đặt phòng {selectedRoom?.title}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DetailRental;
