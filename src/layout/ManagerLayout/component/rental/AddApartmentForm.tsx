import {
  Breadcrumb,
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Skeleton,
  notification,
} from "antd";
import Modal from "antd/lib/modal/Modal";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { LeftOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";
import Editor from "./Editor";
import { useRequest } from "ahooks";
import {
  createApartment,
  getListApartmentTags,
} from "./service";
import UploadImage from "@/components/UploadImage";
import { useRouter } from "next/router";
import {
  GoogleMap,
  InfoWindow,
  StandaloneSearchBox,
  useLoadScript,
} from "@react-google-maps/api";
const ApartmentForm = () => {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData] = useState("");
  const tags = useRequest(getListApartmentTags);
  const router = useRouter();
  const createRequest = useRequest(createApartment, {
    manual: true,
    onSuccess: (res) => {
      if (typeof window !== "undefined") {
        // Client-side-only code
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
      router.push(
        `/manager/rental-management/${res.data?.id}`
      );
      notification.success({
        message: "Tạo chung cư thành công",
        description: "Vui lòng nhập thông tin các phòng",
      });
    },
    onError(err) {
      notification.error({
        message: "Có lỗi xảy ra",
      });
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
        if (
          result &&
          status == google.maps.GeocoderStatus.OK
        ) {
          let dist;
          result[0]?.address_components?.forEach((add) => {
            if (
              add.types[0] ===
                "administrative_area_level_2" ||
              add.types[2] === "locality"
            ) {
              dist = add.long_name;
            }
          });
          console.log(dist);

          setPickerPosition({
            lat: event.latLng?.lat(),
            lng: event.latLng?.lng(),
            customName: result[0].formatted_address,
            district: dist,
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
    if (!pickerPosition) return;
    return (
      // @ts-ignore
      <InfoWindow
        // @ts-ignore
        position={pickerPosition}
        onCloseClick={() => {
          setPickerPosition(null);
          return null;
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
          <div
            className="btn-primary-buy-nft"
            onClick={() => onAddPosition()}
          >
            Chọn
          </div>
        </div>
      </InfoWindow>
    );
  };

  const [centerMap, setCenterMap] = useState<any>({
    lat: 20.99827918867865,
    lng: 105.8252441372345,
  });

  useEffect(() => {
    setEditorLoaded(true);
  }, []);
  const onFinish = (value: any) => {
    const payload = {
      ...value,
      image: value?.image?.fileList?.map(
        (item: any) => item?.response[0]?.path
      ),
      lat: +value?.lat,
      long: +value?.long,
      district: pickerPosition?.district,
      province: "Hà Nội",
    };
    createRequest.run(payload);
  };
  return (
    <div>
      <div className={styles.formData}>
        <Form
          layout="vertical"
          onFinish={onFinish}
          form={form}
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
          <Form.Item
            name="content"
            label="Mô tả chi tiết"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập",
              },
            ]}
          >
            <Editor
              disabled={false}
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
                {renderPopup()}
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
          <UploadImage images={[]} />
          <Row justify="center">
            <Button className={styles.submitBtn}>
              Nhập lại
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.submitBtn}
            >
              Xác nhận
            </Button>
          </Row>
        </Form>
        {/* 
        {data} */}
      </div>
    </div>
  );
};

export default ApartmentForm;
