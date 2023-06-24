import {
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Select,
} from "antd";
import moment from "moment";
import React, { useState } from "react";
import styles from "./index.module.scss";
import { formatNumber } from "@/utils/helper";
import { useRequest } from "ahooks";
import { getVNPayRedirect } from "../../service";
const PaymentModal = ({
  isOpen,
  setIsOpen,
  selectedRoom,
  apartmentName,
}: {
  isOpen: boolean;
  setIsOpen: any;
  selectedRoom: any;
  apartmentName: string;
}) => {
  const onClose = () => {
    setIsOpen(false);
  };
  const [cycle, setCycle] = useState(3);
  const [startTime, setStartTime] = useState<any>();
  const [form] = Form.useForm();

  const redirectVNPay = useRequest(getVNPayRedirect, {
    manual: true,
    onSuccess(res) {
      console.log(res);
      if (typeof window !== "undefined") {
        window.location.href = res?.data;
      }
    },
  });

  const onSubmit = (val: any) => {
    console.log(val);
    redirectVNPay.run({
      room_id: selectedRoom?.id,
      price: Number(selectedRoom?.price * cycle),
      start_time: moment(val?.start_time).toISOString(),
      end_time: moment(val?.end_time).toISOString(),
    });
  };
  return (
    <Modal
      title={`Thông tin đặt phòng ${selectedRoom?.title}`}
      open={isOpen}
      width="900px"
      footer={null}
      onCancel={onClose}
    >
      <Row justify="space-between">
        <Col span={16}>
          <Form
            form={form}
            onFinish={onSubmit}
            layout="vertical"
          >
            <Row justify="space-between">
              <Col span={11}>
                <Form.Item
                  label="Tòa nhà"
                  name="name"
                  initialValue={apartmentName}
                >
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item
                  label="Phòng"
                  name="room"
                  initialValue={selectedRoom?.title}
                >
                  <Input disabled />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={11}>
                <Form.Item
                  label="Chu kì thanh toán"
                  name="cycle"
                  initialValue={cycle}
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập",
                    },
                  ]}
                >
                  <Select
                    onChange={(val) => {
                      setCycle(val);
                      if (moment(startTime).isValid()) {
                        form.setFieldsValue({
                          end_time: moment(startTime).add(
                            val,
                            "M"
                          ),
                        });
                      }
                    }}
                    options={[
                      {
                        label: "1 tháng",
                        value: 1,
                      },
                      {
                        label: "3 tháng",
                        value: 3,
                      },
                      {
                        label: "6 tháng",
                        value: 6,
                      },
                      {
                        label: "12 tháng",
                        value: 12,
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={12}></Col>
            </Row>
            <Row justify="space-between">
              <Col span={11}>
                <Form.Item
                  label="Thời gian nhận phòng"
                  name="start_time"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập",
                    },
                  ]}
                >
                  <DatePicker
                    style={{
                      width: "100%",
                    }}
                    onChange={(val) => {
                      if (moment(val).isValid()) {
                        form.setFieldsValue({
                          end_time: moment(val).add(
                            cycle,
                            "M"
                          ),
                        });
                        setStartTime(val);
                      } else {
                        form.resetFields(["end_time"]);
                        setStartTime(null);
                      }
                    }}
                    format="DD/MM/YYYY"
                    disabledDate={(date) =>
                      date <
                        moment(new Date()).add(1, "d") ||
                      date > moment(new Date()).add(10, "d")
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item
                  label="Thời gian hết hạn hợp đồng"
                  name="end_time"
                >
                  <DatePicker
                    style={{
                      width: "100%",
                    }}
                    disabled
                    format="DD/MM/YYYY"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row justify="center">
              <div
                style={{
                  width: "200px",
                }}
                className={styles.roomBookingBtn1}
                onClick={() => form.submit()}
              >
                Xác nhận đặt P{selectedRoom?.title}
              </div>
            </Row>
          </Form>
        </Col>
        <Col span={7}>
          <div className={styles.paymentInfo}>
            <div className={styles.paymentInfoTitle}>
              <p>Chi tiết đặt phòng</p>
              <b>{apartmentName}</b>
            </div>
            <Divider />
            <div className={styles.paymentDetail}>
              <Row justify="space-between">
                <p>Phòng trọ</p>
                <p>P{selectedRoom?.title}</p>
              </Row>
              <Row justify="space-between">
                <p>Giá thuê 1 tháng</p>
                <p>{formatNumber(selectedRoom?.price)}Đ</p>
              </Row>
              <Row justify="space-between">
                <p>Chu kì thanh toán</p>
                <p>{cycle} tháng</p>
              </Row>
              <Row justify="space-between">
                <b>Tổng tiền</b>
                <b>
                  {formatNumber(
                    selectedRoom?.price * cycle
                  )}
                </b>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </Modal>
  );
};

export default PaymentModal;
