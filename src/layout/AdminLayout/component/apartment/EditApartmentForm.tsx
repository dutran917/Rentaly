import {
  Breadcrumb,
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Tag,
  message,
  notification,
  Modal,
  Skeleton,
} from "antd";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  LeftOutlined,
  EditOutlined,
} from "@ant-design/icons";
import styles from "./index.module.scss";
import { useRequest } from "ahooks";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  StandaloneSearchBox,
  useLoadScript,
} from "@react-google-maps/api";
import UploadImage from "@/components/UploadImage";
import Editor from "@/layout/ManagerLayout/component/rental/Editor";
import { getListApartmentTags } from "@/layout/ManagerLayout/component/rental/service";
import {
  approveApartmentService,
  editApartment,
} from "./service";

const EditApartmentForm = ({
  infoApartment,
  refresh,
}: {
  infoApartment: any;
  refresh: () => void;
}) => {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData] = useState("");
  const [disabled, setDisabled] = useState(true);
  const tags = useRequest(getListApartmentTags);
  const onEditApartment = useRequest(editApartment, {
    manual: true,
    onSuccess: (res) => {
      message.success("Sửa thông tin thành công");
      refresh();
    },
    onError: (err) => {
      message.error("Có lỗi xảy ra");
    },
  });

  const [form] = Form.useForm();
  const [searchBoxRef, setSearchBoxRef] = useState(null);
  const [pickerPosition, setPickerPosition] = useState<{
    district?: string;
    lat?: number;
    lng?: number;
    customName?: string;
  } | null>(null);

  const loadScript = useLoadScript({
    googleMapsApiKey: process.env
      .NEXT_PUBLIC_GOOGLE_MAP_KEY as string,
    libraries: ["drawing", "places"],
  });

  const onLoad = (ref: any) => {
    setSearchBoxRef(ref);
  };

  const onPlacesChanged = () => {
    //@ts-ignore
    const place = searchBoxRef?.getPlaces()[0];
    console.log(place);

    const newLocation = {
      lat: place?.geometry?.location.lat(),
      lng: place?.geometry?.location.lng(),
    };

    setCenterMap(newLocation);
    setPickerPosition({
      ...newLocation,
      customName: place?.formatted_address,
    });
  };
  const handleClick = (event: any) => {
    const geocode = new window.google.maps.Geocoder();
    geocode.geocode(
      {
        location: {
          lat: event.latLng?.lat(),
          lng: event.latLng?.lng(),
        },
      },
      (result, status) => {
        console.log(result);

        if (
          result &&
          status == google.maps.GeocoderStatus.OK
        ) {
          setPickerPosition({
            lat: event.latLng?.lat(),
            lng: event.latLng?.lng(),
            customName: result[0].formatted_address,
            district:
              result[0]?.address_components[2]?.long_name,
          });
        }
      }
    );
    setPickerPosition({
      lat: event.latLng?.lat(),
      lng: event.latLng?.lng(),
    });
  };
  const onAddPosition = () => {
    if (pickerPosition) {
      form.setFieldsValue({
        address: pickerPosition.customName,
        lat: pickerPosition.lat,
        long: pickerPosition.lng,
      });
    }
  };

  const renderPopup = () => {
    if (pickerPosition) {
      return (
        <InfoWindow
          position={{
            lat: Number(pickerPosition.lat),
            lng: Number(pickerPosition.lng),
          }}
        >
          <div className={styles.markerPopupContainer}>
            <p>
              <b>{pickerPosition.customName || ""}</b>
              <br />
              Latitude: {pickerPosition.lat ||
                "..."} <br /> Longitude:{" "}
              {pickerPosition.lng || "..."}
            </p>
            {!disabled && (
              <div
                className="btn-primary-buy-nft"
                onClick={() => onAddPosition()}
              >
                Chọn
              </div>
            )}
          </div>
        </InfoWindow>
      );
    }
  };

  const [centerMap, setCenterMap] = useState<any>({
    lat: 20.99827918867865,
    lng: 105.8252441372345,
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      title: infoApartment?.title,
      subtitle: infoApartment?.subtitle,
      address: infoApartment?.address,
      tags: infoApartment?.TagsInApartment?.map(
        (item: any) => item?.apartmentTagId
      ),
      lat: infoApartment?.lat,
      long: infoApartment?.long,
    });
    if (!!infoApartment) {
      setData(infoApartment?.content);
      setCenterMap({
        lat: infoApartment?.lat,
        lng: infoApartment?.long,
      });
      setPickerPosition({
        customName: infoApartment?.address,
        lat: infoApartment?.lat,
        lng: infoApartment?.long,
      });
    }
  }, [infoApartment]);

  const approveApartment = useRequest(
    approveApartmentService,
    {
      manual: true,
      onSuccess(res) {
        console.log(res);

        notification.success({
          message: "Duyệt thành công",
        });
        refresh();
      },
      onError(err) {
        notification.error({
          message: "Có lỗi xảy ra!",
        });
      },
    }
  );
  const handleApproveApartment = (id: number) => {
    return Modal.confirm({
      title: "Xác nhận phê duyệt",
      content: "Bạn muốn phê duyệt chung cư này?",
      okText: "Xác nhận",
      cancelText: "Hủy",
      okButtonProps: {
        loading: approveApartment.loading,
      },
      onOk() {
        approveApartment.run({
          apartmentId: id,
          approve: true,
        });
      },
    });
  };

  const [formRefuseVerified] = Form.useForm();
  const handleRefuseApartment = (id: number) => {
    const onFinish = (val: any) => {
      approveApartment.run({
        apartmentId: id,
        approve: false,
      });
    };

    Modal.confirm({
      icon: null,
      title: "Lý do từ chối duyệt căn chung cư này:",
      width: 600,
      content: (
        <Form
          form={formRefuseVerified}
          id="formRefuseVerified"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="reason"
            label="Lý do từ chói"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập lý do",
              },
            ]}
          >
            <Input.TextArea
              placeholder="Nhập lý do"
              rows={2}
            />
          </Form.Item>
        </Form>
      ),
      okText: "Xác nhận",
      cancelText: "Hủy",
      okButtonProps: {
        htmlType: "submit",
        form: "formRefuseVerified",
        loading: approveApartment.loading,
      },

      onCancel() {
        formRefuseVerified.resetFields();
      },
      onOk() {
        if (formRefuseVerified.getFieldValue("reason")) {
          return Promise.resolve();
        } else {
          return Promise.reject();
        }
      },
    });
  };

  const onFinish = (value: any) => {
    console.log(value);
    onEditApartment.run(infoApartment?.id, {
      ...value,
      district: pickerPosition?.district,
      image: value?.image?.fileList?.map((item: any) =>
        item?.response ? item?.response[0]?.path : item?.url
      ),
    });
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <span>Trạng thái: </span>
          <Tag
            color={
              infoApartment?.verified === "PENDING"
                ? "warning"
                : infoApartment?.verified === "ACCEPT"
                ? "green"
                : "red"
            }
          >
            {infoApartment?.verified === "PENDING"
              ? "Đang chờ duyệt"
              : infoApartment?.verified === "ACCEPT"
              ? "Đã duyệt"
              : "Từ chối duyệt"}
          </Tag>
        </div>

        <div>
          {infoApartment?.verified === "PENDING" && (
            <>
              <Button
                style={{
                  margin: "0 10px",
                }}
                type="primary"
                onClick={() =>
                  handleApproveApartment(infoApartment?.id)
                }
              >
                Phê duyệt
              </Button>
              <Button
                style={{
                  margin: "0 10px",
                }}
                danger
                onClick={() =>
                  handleRefuseApartment(infoApartment?.id)
                }
              >
                Từ chối
              </Button>
            </>
          )}
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setDisabled(!disabled);
            }}
          ></Button>
        </div>
      </div>
      <div className={styles.formData}>
        <Form
          disabled={disabled}
          layout="vertical"
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            name="title"
            label="Tên chung cư"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập",
              },
            ]}
          >
            <Input placeholder="Tên chung cư" />
          </Form.Item>
          <Form.Item
            name="subtitle"
            label="Mô tả chung"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập",
              },
            ]}
          >
            <Input placeholder="Nhập mô tả" />
          </Form.Item>
          <Form.Item name="content" label="Mô tả chi tiết">
            <Editor
              disabled={disabled}
              data={data}
              name="description"
              onChange={(data: any) => {
                setData(data);
              }}
              editorLoaded={editorLoaded}
            />
          </Form.Item>

          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập",
              },
            ]}
          >
            <Input placeholder="Địa chỉ tòa nhà" />
          </Form.Item>
          <Form.Item name=" map" label="Địa điểm">
            {loadScript.isLoaded ? (
              <GoogleMap
                clickableIcons={false}
                mapContainerStyle={{
                  height: "400px",
                  width: "100%",
                }}
                zoom={14}
                center={centerMap}
                onClick={(e: any) => {
                  if (e) {
                    handleClick(e);
                  }
                }}
              >
                <StandaloneSearchBox
                  onLoad={onLoad}
                  onPlacesChanged={onPlacesChanged}
                >
                  <input
                    type="text"
                    placeholder="Tìm kiếm"
                    onKeyDown={(e: any) => {
                      e.target?.keyCode === 13 &&
                        e.preventDefault();
                    }}
                    style={{
                      boxSizing: `border-box`,
                      border: `1px solid transparent`,
                      width: `240px`,
                      height: `40px`,
                      padding: `0 12px`,
                      borderRadius: `3px`,
                      boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                      fontSize: `14px`,
                      outline: `none`,
                      textOverflow: `ellipses`,
                      position: "absolute",
                      top: "10px",
                      left: "50%",
                      marginLeft: "-120px",
                    }}
                  />
                </StandaloneSearchBox>
                {pickerPosition && (
                  <Marker
                    position={{
                      lat: Number(pickerPosition.lat),
                      lng: Number(pickerPosition.lng),
                    }}
                    onClick={() => setIsOpen(!isOpen)}
                    onLoad={() =>
                      console.log("Marker Loaded")
                    }
                  >
                    {isOpen && (
                      <InfoWindow
                        onCloseClick={() => {
                          setIsOpen(false);
                        }}
                        position={{
                          lat: Number(pickerPosition.lat),
                          lng: Number(pickerPosition.lng),
                        }}
                      >
                        <div
                          className={
                            styles.markerPopupContainer
                          }
                        >
                          <p>
                            <b>
                              {pickerPosition.customName ||
                                ""}
                            </b>
                            <br />
                            Latitude:{" "}
                            {pickerPosition.lat ||
                              "..."}{" "}
                            <br /> Longitude:{" "}
                            {pickerPosition.lng || "..."}
                          </p>
                          {!disabled && (
                            <div
                              className="btn-primary-buy-nft"
                              onClick={() =>
                                onAddPosition()
                              }
                            >
                              Chọn
                            </div>
                          )}
                        </div>
                      </InfoWindow>
                    )}
                  </Marker>
                )}
              </GoogleMap>
            ) : (
              <Skeleton active />
            )}

            <Row gutter={16}>
              <Col
                span={12}
                className={styles.dialogFormItem}
              >
                <Form.Item label="Lat" name="lat">
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col
                span={12}
                className={styles.dialogFormItem}
              >
                <Form.Item label="Lng" name="long">
                  <Input disabled />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>

          <Row>
            <Col span={12}>
              <Form.Item
                label="Tiện nghi của tòa nhà"
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

          <UploadImage images={infoApartment?.image} />

          <Row justify="center">
            <Button
              className={styles.submitBtn}
              onClick={() => {
                refresh();
                setDisabled(true);
              }}
            >
              Hủy
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.submitBtn}
            >
              Sửa thông tin
            </Button>
          </Row>
        </Form>
        {/* 
          {data} */}
      </div>
    </div>
  );
};

export default EditApartmentForm;
