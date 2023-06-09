import {
  Form,
  Modal,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { RcFile } from "antd/lib/upload";
const UploadImage = ({ images }: { images: any[] }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>(
    []
  );

  useEffect(() => {
    if (images?.length) {
      setFileList((state) =>
        images.map((item, index) => ({
          uid: index.toString(),
          name: "image.png",
          status: "done",
          url: item?.url,
        }))
      );
    }
  }, [images]);

  const handleCancel = () => setPreviewOpen(false);
  const onPreview = async (file: UploadFile) => {
    console.log(file);

    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () =>
          resolve(reader.result as string);
      });
    }
    const image = new Image();

    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <>
      <Form.Item
        className="uploadItem"
        style={{
          textAlign: "center",
        }}
        label="Ảnh phòng (Tối đa 5 ảnh)"
        name="image"
        rules={[
          {
            required: images?.length === 0 ? true : false,
            message: "Vui lòng chọn ảnh",
          },
          {
            validator: (_, value) => {
              if (value?.fileList?.length === 0) {
                return Promise.reject("Vui lòng chọn ảnh");
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <Upload
          style={{
            width: "200px",
          }}
          accept=".png,.jpg,.jpeg"
          action="http://localhost:4000/upload/multi"
          onPreview={onPreview}
          fileList={fileList}
          listType="picture-card"
          onChange={(val: any) => {
            setFileList([...val.fileList]);
          }}
          onRemove={(val) => {
            // setFileList([]);
            console.log(val);
          }}
        >
          {fileList.length < 5 && "Tải lên"}
        </Upload>
      </Form.Item>
    </>
  );
};

export default UploadImage;
