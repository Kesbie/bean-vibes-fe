import { CameraOutlined } from "@ant-design/icons";
import {
  Form,
  GetProp,
  Typography,
  Upload,
  UploadFile,
  UploadProps
} from "antd";
import React from "react";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const normFile = (e: any) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

type Props = {
  value?: string[];
  onChange?: (value: string[]) => void;
};

const PhotoUpload = (props: Props) => {
  const { value, onChange } = props;
  const [previewOpen, setPreviewOpen] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState("");

  const [fileList, setFileList] = React.useState<UploadFile[]>([]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange = React.useCallback(({ fileList }) => {
    setFileList(fileList);
  }, []);

  console.log(fileList)

  const customRequest: UploadProps['customRequest'] = React.useCallback(({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess(file);
    }, 1000);
  }, []);

  return (
    <Form.Item
      getValueFromEvent={normFile}
      valuePropName="fileList"
      label="Ảnh"
    >
      <Upload
        className="mb-2"
        listType="picture-card"
        maxCount={16}
        accept="image/*"
        onPreview={handlePreview}
        onChange={handleChange}
        multiple
        customRequest={customRequest}
      >
        <button className="flex flex-col items-center justify-center gap-1">
          <CameraOutlined className="text-lg" />
          <Typography.Text>Thêm ảnh</Typography.Text>
        </button>
      </Upload>
      <Typography.Text className="text-sm text-ellipsis text-gray-500">
        Chọn tối đa 16 ảnh
      </Typography.Text>
    </Form.Item>
  );
};

export default PhotoUpload;
