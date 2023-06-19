import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  notification,
} from "antd";
import React, { useEffect } from "react";
import styles from "./index.module.scss";
import { formatNumber } from "@/utils/helper";
import { useRequest } from "ahooks";
import { createApointmentService } from "../../service";
import moment from "moment";
const ApointmentModal = ({
  isOpen,
  setIsOpen,
  apartmentName,
  apartmentId,
  selectedRoom,
  seletedTime,
}: {
  isOpen: boolean;
  setIsOpen: any;
  apartmentName: string;
  apartmentId: number;
  selectedRoom: any;
  seletedTime: any;
}) => {
  const onClose = () => {
    setIsOpen(false);
    form.resetFields();
  };
  const [form] = Form.useForm();
  const onFinish = (val: any) => {
    console.log(val);
    const payload = {
      ...val,
      date: moment(val?.date).toISOString(),
      apartmentId,
      roomId: selectedRoom?.id,
    };
    createApointment.run(payload);
  };

  const createApointment = useRequest(
    createApointmentService,
    {
      manual: true,
      onSuccess: (res) => {
        console.log(res);
        notification.success({
          message: "Thành công",
        });
      },
      onError(e) {
        console.log(e);
      },
    }
  );

  useEffect(() => {
    form.setFieldsValue({
      room: selectedRoom?.title,
      date: seletedTime,
    });
  });
  return (
    <Modal
      title="THÔNG TIN ĐẶT LỊCH XEM PHÒNG"
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <p className={styles.apointmentName}>
        {apartmentName}
      </p>
      <div className={styles.apointmentInfo}>
        <p>Giá thuê phòng</p>
        <span>
          {formatNumber(selectedRoom?.price)}đ/tháng
        </span>
      </div>
      <div className={styles.apointmentInfo}>
        <p>Loại phòng</p>
        <span>
          {selectedRoom?.bed_room} ngủ-{" "}
          {selectedRoom?.living_room &&
            `${selectedRoom?.living_room} khách`}
        </span>
      </div>
      <div className={styles.apointmentInfo}>
        <p>Diện tích</p>
        <span>
          {selectedRoom?.area}m<sup>2</sup>
        </span>
      </div>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
      >
        <Row justify="space-between">
          <Col span={11}>
            <Form.Item label="Phòng" name="room">
              <Input status="warning" disabled />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item label="Ngày xem phòng" name="date">
              <DatePicker
                showTime
                status="warning"
                format={"HH:mm DD/MM/YYYY"}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="space-between">
          <Col span={11}>
            <Form.Item label="Họ và tên" name="fullName">
              <Input status="warning" />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item label="Số điện thoại" name="phone">
              <Input status="warning" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="note" label="Ghi chú">
          <Input.TextArea rows={3} status="warning" />
        </Form.Item>
        <Row justify="center">
          <div
            className={styles.roomBookingBtn1}
            onClick={() => form.submit()}
          >
            Đặt lịch xem phòng
          </div>
        </Row>
      </Form>
    </Modal>
  );
};

export default ApointmentModal;
