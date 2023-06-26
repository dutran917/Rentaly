import React, {
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
} from "react";
import styles from "./index.module.scss";
import { useRouter } from "next/router";
import { useRequest } from "ahooks";
import {
  getDetailApartment,
  getListRoom,
  getRoom,
  getVNPayRedirect,
} from "../../service";
import {
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Carousel,
  Col,
  DatePicker,
  Row,
  Spin,
} from "antd";

import Link from "next/link";
import { checkLogin, formatNumber } from "@/utils/helper";
import NextMap from "@/components/Map";
import ApointmentModal from "./ApointmentModal";
import moment from "moment";
import { useProfile } from "@/store/ManagerProfile/useProfile";
import LoginModal from "@/layout/MainLayout/Component/LoginModal";
import PaymentModal from "./PaymentModal";
import CommentsFacebook from "@/components/FacebookComment";
const DetailRental = () => {
  const router = useRouter();
  const { id } = router.query;
  const [listRoom, setListRoom] = useState([]);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenPayment, setIsOpenPayment] = useState(false);
  const [selectedTime, setSelectedTime] = useState<
    any | null
  >(null);
  const { profileUser } = useProfile();
  const [selectedFilter, setSelectedFilter] =
    useState(null);
  const [selectedRoom, setSelectedRoom] = useState<any>();
  const data = useRequest(getDetailApartment, {
    manual: true,
    onSuccess: (res) => {
      setListRoom(res?.data?.rooms);
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
      setSelectedRoom(res?.data);
    },
  });

  const detail = data.data?.data;
  useEffect(() => {
    if (id) {
      data.run(Number(id));
    }
  }, [id]);
  useEffect(() => {
    if (detail) {
      roomDetail.run(detail?.rooms?.[0]?.id);
    }
  }, [detail]);
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

  const [scroll, setScroll] = useState(false);
  const [isOpenApointmnetModal, setIsOpenApointmnetModal] =
    useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 700);
    });
  }, []);

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
      <div className={styles.carousel} id="carousel">
        <Carousel
          dots={false}
          // @ts-ignore
          ref={carouselRef}
          style={{
            // textAlign: "center",
            padding: "10px 0",
          }}
          slidesToShow={2}
          slidesToScroll={1}
        >
          {detail?.image?.map((item: any, i: number) => (
            <div className={styles.slideItem} key={i}>
              <img src={item.url} />
            </div>
          ))}
        </Carousel>
        <div
          className={styles.carouselIconPrev}
          // @ts-ignore
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
          // @ts-ignore
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
        <div className={styles.wrapperContent}>
          <div
            className={styles.mainContent}
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
                    <div
                      className={styles.RoomFilteredDetail}
                    >
                      <div
                        className={styles.RoomFilteredTitle}
                      >
                        P{selectedRoom?.title}
                      </div>
                      <div
                        className={styles.RoomFilteredItem}
                      >
                        <strong>Giá thuê phòng</strong>
                        <span>
                          <strong
                            style={{
                              fontSize: "18px",
                            }}
                          >
                            {formatNumber(
                              selectedRoom?.price
                            )}
                            đ
                          </strong>
                          /tháng
                        </span>
                      </div>
                      <div
                        className={styles.RoomFilteredItem}
                      >
                        <strong>Loại phòng</strong>
                        <span>
                          {`Phòng ${
                            selectedRoom?.bed_room
                          } ngủ - ${
                            selectedRoom?.living_room
                              ? `${selectedRoom?.living_room} khách`
                              : ""
                          }`}
                        </span>
                      </div>
                      <div
                        className={styles.RoomFilteredItem}
                      >
                        <strong>Diện tích</strong>
                        <span>{selectedRoom?.area}m2</span>
                      </div>
                      <div
                        className={styles.RoomFilteredItem}
                      >
                        <strong>Số người ở tối đa</strong>
                        <span>
                          {selectedRoom?.maximum} người
                        </span>
                      </div>
                      <div
                        className={styles.RoomFilteredItem}
                      >
                        <strong>Tầng</strong>
                        <span>{selectedRoom?.floor}</span>
                      </div>
                    </div>
                  </Col>
                  <div className={styles.tagInApartment}>
                    <div className={styles.subtitle}>
                      <p>✺ Tiện nghi chỗ ở</p>
                    </div>
                    <div className={styles.subtitleTag}>
                      ✵ Tiện nghi của phòng{" "}
                      {selectedRoom?.title}
                    </div>
                    {roomDetail.loading ? (
                      <Spin />
                    ) : (
                      <div className={styles.listTag}>
                        {selectedRoom?.TagsInRoom?.map(
                          (item: any, i: number) => (
                            <div
                              key={i}
                              className={styles.listTagItem}
                            >
                              <img
                                src={item?.tag?.icon}
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  marginRight: "5px",
                                }}
                              />
                              <p>{item?.tag?.name}</p>
                            </div>
                          )
                        )}
                      </div>
                    )}
                    <div className={styles.subtitleTag}>
                      ✵ Tiện nghi chung của tòa nhà{" "}
                    </div>
                    <div className={styles.listTag}>
                      {detail?.TagsInApartment?.map(
                        (item: any, i: number) => (
                          <div
                            key={i}
                            className={styles.listTagItem}
                          >
                            <img
                              src={item?.tag?.icon}
                              style={{
                                width: "20px",
                                height: "20px",
                                marginRight: "5px",
                              }}
                            />
                            <p>{item?.tag?.name}</p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </Row>
                <div className={styles.addressApartment}>
                  <div className={styles.subtitle}>
                    <p>✺ Địa chỉ tòa nhà</p>
                  </div>
                  <NextMap
                    lat={detail?.lat}
                    long={detail?.long}
                    name={detail?.address}
                  />
                </div>
                <CommentsFacebook id={Number(id)} />
              </div>
            </div>
          </div>
          <div className={styles.subContent}>
            <div
              className={
                scroll
                  ? styles.cardRoomBookingFixed
                  : styles.cardRoomBooking
              }
              id="card"
            >
              <div className={styles.cardRoomBookingTitle}>
                {formatNumber(selectedRoom?.price) +
                  "đ/tháng"}
              </div>
              <div className={styles.roomBooking}>
                <DatePicker
                  disabledDate={(date) =>
                    date < moment(new Date()).add(1, "d")
                  }
                  placeholder="Chọn ngày xem phòng"
                  className={styles.roomBookingDate}
                  format={"HH:mm DD/MM/YYYY"}
                  showTime
                  onChange={(val) => setSelectedTime(val)}
                />
                <div
                  className={styles.roomBookingBtn1}
                  onClick={() =>
                    setIsOpenApointmnetModal(true)
                  }
                >
                  Đặt lịch xem phòng
                </div>
                <div
                  className={styles.roomBookingBtn2}
                  onClick={() => {
                    if (profileUser.id !== 0) {
                      // redirectVNPay.run({
                      //   room_id: +selectedRoom?.id,
                      //   price: +selectedRoom.price,
                      // });
                      setIsOpenPayment(true);
                    } else {
                      setIsOpenLogin(true);
                    }
                  }}
                >
                  Đặt phòng {selectedRoom?.title}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ApointmentModal
        isOpen={isOpenApointmnetModal}
        apartmentId={Number(id)}
        seletedTime={selectedTime}
        setIsOpen={setIsOpenApointmnetModal}
        selectedRoom={selectedRoom}
        apartmentName={detail?.title}
      />
      <LoginModal
        isOpen={isOpenLogin}
        setIsOpen={setIsOpenLogin}
      />
      <PaymentModal
        isOpen={isOpenPayment}
        setIsOpen={setIsOpenPayment}
        selectedRoom={selectedRoom}
        apartmentName={detail?.title}
      />
    </div>
  );
};

export default DetailRental;
