import { useRequest } from "ahooks";
import React, { useState } from "react";
import { getHistoryRent } from "./service";
import styles from "./index.module.scss";
import { Button, Col, Row, Tag } from "antd";
import moment from "moment";
import { formatNumber } from "@/utils/helper";
import PaymentModal from "@/layout/Rental/components/DetailRental/PaymentModal";
const HistoryRent = () => {
  const [data, setData] = useState<any>();
  const historyRent = useRequest(getHistoryRent, {
    onSuccess(res) {
      setData(res.data);
    },
  });

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<any>();
  const [apartmentName, setApartmentName] = useState("");
  return (
    <div>
      {data &&
        data?.data?.map((item: any) => (
          <div className={styles.HistoryRentItem}>
            <Row justify="space-between">
              <Col span={14}>
                <Row justify="space-between">
                  <b>Tòa nhà</b>
                  <p>{item?.room?.Apartment?.title}</p>
                </Row>
                <Row justify="space-between">
                  <b>Phòng</b>
                  <p>{item?.room?.title}</p>
                </Row>
                <Row justify="space-between">
                  <b>Thời gian thuê</b>
                  <p>{`${moment(item?.start_at).format(
                    "DD/MM/YYYY"
                  )} - ${moment(item?.end_at).format(
                    "DD/MM/YYYY"
                  )}`}</p>
                </Row>
                <Row justify="space-between">
                  <b>Trạng thái</b>
                  <p>
                    <Tag
                      color={
                        item?.status === "RENTING"
                          ? "green"
                          : item?.status === "OUT_DATE"
                          ? "red"
                          : "warning"
                      }
                    >{`${
                      item?.status === "RENTING"
                        ? "Đang thuê"
                        : item?.status === "OUT_DATE"
                        ? "Hết hạn"
                        : "Sắp hết hạn"
                    }`}</Tag>
                  </p>
                </Row>

                <Row justify="space-between">
                  <b>Đã thanh toán</b>
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    {formatNumber(item?.price)}đ
                  </p>
                </Row>
              </Col>
              <Col span={8}>
                {item.status !== "RENTING" && (
                  <div
                    style={{
                      textAlign: "end",
                    }}
                  >
                    <Button
                      type="primary"
                      onClick={() => {
                        setIsOpenModal(true);
                        setSelectedRoom(item?.room);
                        setApartmentName(
                          item?.room?.Apartment?.title
                        );
                      }}
                    >
                      Tiếp tục thuê
                    </Button>
                  </div>
                )}
              </Col>
            </Row>
          </div>
        ))}
      {data?.data?.length === 0 && (
        <h1
          style={{
            color: "red",
          }}
        >
          Bạn chưa thuê phòng trên hệ thống
        </h1>
      )}
      <PaymentModal
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
        selectedRoom={selectedRoom}
        apartmentName={apartmentName}
      />
    </div>
  );
};

export default HistoryRent;
