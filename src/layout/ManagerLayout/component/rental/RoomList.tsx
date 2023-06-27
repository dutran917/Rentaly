import { useAntdTable, useRequest } from "ahooks";
import React, { useState } from "react";
import {
  createRoom,
  getInfoRoom,
  getListRoom,
  getListRoomTags,
} from "./service";
import { useRouter } from "next/router";
import { EyeOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Table,
  Tabs,
  Tag,
  Tooltip,
  notification,
} from "antd";
import { ColumnsType } from "antd/lib/table";
import {
  PlusOutlined,
  EditOutlined,
} from "@ant-design/icons";
import styles from "./index.module.scss";
import moment from "moment";
import {
  checkStatusRent,
  formatNumber,
} from "@/utils/helper";

const DetailRoom = ({
  isOpen,
  setIsOpen,
  data,
  listTag,
}: {
  isOpen: boolean;
  setIsOpen: any;
  data: any;
  listTag: any[];
}) => {
  const onClose = () => {
    setIsOpen(false);
  };
  const onSubmit = (val: any) => {
    console.log(val);
  };
  const [formEditRoom] = Form.useForm();
  const tags = data?.TagsInRoom?.map((item: any) => {
    return item?.roomTagId;
  });

  const [tab, setTab] = useState("1");
  const [disabled, setDisabled] = useState(true);
  const handleCancel = () => {
    formEditRoom.setFieldsValue({
      ...data,
      tags: tags,
    });
    setDisabled(true);
  };
  const renderTab = () => {
    switch (tab) {
      case "1":
        return (
          <div className={styles.roomModalInfo}>
            <Row justify="end">
              <Button
                icon={<EditOutlined />}
                onClick={() => setDisabled(!disabled)}
              ></Button>
            </Row>
            <Form
              form={formEditRoom}
              disabled={disabled}
              onFinish={onSubmit}
              id="createRoomForm"
              layout="vertical"
              initialValues={{
                ...data,
                tags: tags,
              }}
            >
              <Row justify="space-between">
                <Col span={11}>
                  <Form.Item
                    label="Mã số phòng"
                    name="title"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={11}>
                  <Form.Item
                    label="Giá thuê phòng"
                    name="price"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập",
                      },
                    ]}
                  >
                    <InputNumber
                      addonAfter="VND"
                      style={{
                        width: "100%",
                      }}
                      formatter={(value) =>
                        `${value}`.replace(
                          /\B(?=(\d{3})+(?!\d))/g,
                          ","
                        )
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row justify="space-between">
                <Col span={11}>
                  <Form.Item
                    label="Diện tích"
                    name="area"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập",
                      },
                    ]}
                  >
                    <InputNumber
                      style={{
                        width: "100%",
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={11}>
                  {" "}
                  <Form.Item
                    label="Số người ở tối đa"
                    name="maximum"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập",
                      },
                    ]}
                  >
                    <InputNumber
                      style={{
                        width: "100%",
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row justify="space-between">
                <Col span={11}>
                  <Form.Item
                    label="Số phòng ngủ"
                    name="bed_room"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập",
                      },
                    ]}
                  >
                    <InputNumber
                      style={{
                        width: "100%",
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={11}>
                  <Form.Item
                    label="Tiện ích phòng"
                    name="tags"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập",
                      },
                    ]}
                  >
                    <Select
                      style={{
                        width: "100%",
                      }}
                      placeholder="Chọn"
                      mode="multiple"
                      options={listTag?.map(
                        (item: any) => ({
                          label: item?.name,
                          value: item?.id,
                        })
                      )}
                    />
                  </Form.Item>
                </Col>
              </Row>
              {!disabled && (
                <Row justify="center">
                  <Button
                    danger
                    className={styles.submitBtn}
                    onClick={handleCancel}
                  >
                    Hủy
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className={styles.submitBtn}
                  >
                    Lưu
                  </Button>
                </Row>
              )}
            </Form>
          </div>
        );

      case "2":
        return (
          <div className={styles.roomModalInfo}>
            {data?.historyRent?.length > 0 ? (
              data?.historyRent?.map((currentRent: any) => (
                <div className={styles.roomModalRenter}>
                  <div>
                    <b>Tên người thuê</b>
                    <span>
                      {currentRent?.user?.full_name}
                    </span>
                  </div>
                  <div>
                    <b>Só điện thoại</b>
                    <span>{currentRent?.user?.phone}</span>
                  </div>
                  <div>
                    <b>Email</b>
                    <span>{currentRent?.user?.email}</span>
                  </div>
                  <div>
                    <b>Thời hạn thuê</b>
                    <span>{`${moment(
                      currentRent?.start_at
                    ).format("DD/MM/YYYY")} - ${moment(
                      currentRent?.end_at
                    ).format("DD/MM/YYYY")}`}</span>
                  </div>
                  <div>
                    <b>Đã thanh toán</b>
                    <b
                      style={{
                        fontSize: "16px",
                        color: "green",
                      }}
                    >
                      {formatNumber(currentRent?.price)}đ
                    </b>
                  </div>
                  <div>
                    <b>Trạng thái</b>
                    <Tag
                      color={
                        checkStatusRent(currentRent?.end_at)
                          ? "green"
                          : "red"
                      }
                    >
                      {checkStatusRent(currentRent?.end_at)
                        ? "Đang thuê"
                        : "Đã hết hạn"}
                    </Tag>
                  </div>
                </div>
              ))
            ) : (
              <p
                style={{
                  color: "gray",
                }}
              >
                CHƯA CÓ NGƯỜI THUÊ
              </p>
            )}
          </div>
        );
    }
  };
  return (
    <Modal
      footer={null}
      title={`Phòng ${data?.title}`}
      open={isOpen}
      onCancel={onClose}
      width="1000px"
    >
      <Tabs
        onChange={(key) => setTab(key)}
        defaultActiveKey={tab}
        items={[
          {
            key: "1",
            tabKey: "1",
            label: "Thông tin phòng",
          },
          {
            key: "2",
            tabKey: "2",
            label: "Người thuê",
          },
        ]}
      ></Tabs>
      {renderTab()}
    </Modal>
  );
};

const RoomList = () => {
  const router = useRouter();
  const { id } = router.query;
  const [form] = Form.useForm();
  const onCreateRoom = useRequest(createRoom, {
    manual: true,
    onSuccess: (res) => {
      notification.success({
        message: "Thêm phòng thành công",
      });
      refresh();
    },
    onError: (error) => {
      notification.error({
        message: "Có lỗi xảy ra",
      });
    },
  });
  const { tableProps, search, refresh } = useAntdTable(
    getListRoom,
    {
      defaultParams: [
        {
          pageSize: 10,
          current: 1,
          id: Number(id),
        },
        {
          searchValue: "",
        },
      ],
      form,
    }
  );

  const [isOpenRoomDetail, setIsOpenRoomDetail] =
    useState(false);
  const roomDetail = useRequest(getInfoRoom, {
    manual: true,
    onSuccess(res) {
      setIsOpenRoomDetail(true);
    },
  });
  // console.log(roomDetail.data?.data);

  const { submit } = search;
  const columns: ColumnsType<any> = [
    {
      title: "Số phòng",
      dataIndex: "title",
    },
    {
      title: "Giá phòng",
      dataIndex: "price",
      render: (value) => <>{formatNumber(value)}đ</>,
    },
    {
      title: "Diện tích",
      dataIndex: "area",
      render: (value) => (
        <>
          {value}m<sup>2</sup>
        </>
      ),
    },
    {
      title: "Số người tối đa",
      dataIndex: "maximum",
    },
    {
      title: "Loại phòng",
      render: (_, record) => (
        <>{`${record?.living_room} khách - ${record?.bed_room} ngủ`}</>
      ),
    },
    {
      title: "Trạng thái",
      render: (_, record) => (
        <Tag
          color={
            record?.status === "FREE" ? "gray" : "green"
          }
        >
          {record?.status === "FREE"
            ? "Phòng trống"
            : "Đã thuê"}
        </Tag>
      ),
    },
    {
      title: "Hành động",
      width: "10%",
      align: "center",
      render: (_, record) => (
        <>
          <Tooltip title="Xem">
            <EyeOutlined
              onClick={() => roomDetail.run(record?.id)}
              style={{
                color: "purple",
                cursor: "pointer",
              }}
            />
          </Tooltip>
        </>
      ),
    },
  ];

  const [createRoomForm] = Form.useForm();

  const tags = useRequest(getListRoomTags);

  const handleCreateRoom = () => {
    const onFinish = (val: any) => {
      console.log(val);
      onCreateRoom.run(Number(id), val);
    };
    Modal.confirm({
      title: "Thêm phòng",
      icon: null,
      width: "600px",
      content: (
        <Form
          form={createRoomForm}
          onFinish={onFinish}
          id="createRoomForm"
          layout="vertical"
        >
          <Form.Item
            label="Mã số phòng"
            name="title"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Giá thuê phòng"
            name="price"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập",
              },
            ]}
          >
            <InputNumber
              addonAfter="VND"
              style={{
                width: "100%",
              }}
              formatter={(value) =>
                `${value}`.replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  ","
                )
              }
            />
          </Form.Item>
          <Form.Item
            label="Diện tích"
            name="area"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập",
              },
            ]}
          >
            <InputNumber
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
          <Form.Item
            label="Số người ở tối đa"
            name="maximum"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập",
              },
            ]}
          >
            <InputNumber
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
          <Form.Item
            label="Số phòng ngủ"
            name="bed_room"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập",
              },
            ]}
          >
            <InputNumber
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
          <Row>
            <Col span={12}>
              <Form.Item
                label="Tiện ích phòng"
                name="tags"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập",
                  },
                ]}
              >
                <Select
                  placeholder="Chọn"
                  mode="multiple"
                  options={tags.data?.data?.map(
                    (item: any) => ({
                      label: item?.name,
                      value: item?.id,
                    })
                  )}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      ),
      okButtonProps: {
        htmlType: "submit",
        form: "createRoomForm",
      },
      onCancel: () => {
        createRoomForm.resetFields();
      },
      onOk() {
        if (createRoomForm.getFieldValue("title")) {
          // createRoomForm.resetFields();
          return Promise.resolve();
        } else {
          return Promise.reject();
        }
      },
      okText: "Xác nhận",
      cancelText: "Hủy",
    });
  };

  const searchForm = (
    <Row justify="space-between">
      <Form layout="vertical" form={form}>
        <Form.Item name="searchValue">
          <Input.Search
            placeholder="Tìm kiếm theo số phòng"
            onSearch={submit}
          />
        </Form.Item>
      </Form>
      <Button
        type="primary"
        onClick={() => handleCreateRoom()}
        icon={<PlusOutlined />}
      >
        Thêm phòng
      </Button>
    </Row>
  );
  return (
    <div>
      {searchForm}
      <Table
        columns={columns}
        {...tableProps}
        scroll={{
          x: 1000,
        }}
      />
      {isOpenRoomDetail && (
        <DetailRoom
          isOpen={isOpenRoomDetail}
          setIsOpen={setIsOpenRoomDetail}
          data={roomDetail.data?.data}
          listTag={tags.data?.data}
        />
      )}
    </div>
  );
};

export default RoomList;
