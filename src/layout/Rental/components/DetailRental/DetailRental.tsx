import React, { useEffect, useRef } from "react";
import styles from "./index.module.scss";
import { useRouter } from "next/router";
import { useRequest } from "ahooks";
import { getDetailApartment } from "../../service";

import {
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Carousel,
  Col,
  Row,
  Space,
} from "antd";
import Link from "next/link";
const DetailRental = () => {
  const router = useRouter();
  const { id } = router.query;
  const data = useRequest(getDetailApartment, {
    manual: true,
    onSuccess: (res) => {
      console.log(res);
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
    rooms?.forEach((item) => {
      if (item.bed_room === 1 && item?.living_room === 1) {
        const p = "Phòng 1 ngủ - 1 khách";
        if (!result.includes(p)) {
          result.push(p);
        }
      }
      if (item.bed_room !== 0 && item?.living_room === 0) {
        const p = `Phòng ${item?.bed_room} ngủ`;
        if (!result.includes(p)) {
          result.push(p);
        }
      }
      if (item.bed_room !== 0 && item?.living_room === 1) {
        const p = `Phòng ${item?.bed_room} ngủ - 1 khách`;
        if (!result.includes(p)) {
          result.push(p);
        }
      }
    });
    return result.join(" || ");
  };
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
          {detail?.image?.map((item: any) => (
            <div className={styles.slideItem}>
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
          <Col span={16}>
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
                <p>{checkListRoom(detail?.rooms)}</p>
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
            </div>
          </Col>
          <Col span={8}>33333s</Col>
        </Row>
      </div>
    </div>
  );
};

export default DetailRental;
