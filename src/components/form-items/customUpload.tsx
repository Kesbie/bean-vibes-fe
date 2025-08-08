import { Button, Typography, Upload, UploadFile, UploadProps } from "antd";
import React from "react";
import { uploadService } from "@/services";
import { useMutation } from "@tanstack/react-query";
import { CameraOutlined, LoadingOutlined } from "@ant-design/icons";
import { nanoid } from "nanoid";

type CustomUploadProps = UploadProps & {
  value?: App.Types.Place.Photo[];
  onChange?: (value: App.Types.Place.Photo[]) => void;
};

function convertToUploadFile(photos: App.Types.Place.Photo[]): UploadFile[] {
  return (photos || []).map((photo) => ({
    uid: photo?.id || nanoid(10),
    name: photo.name,
    url: photo.url,
    status: 'done',
  }));
}

const CustomUpload = (props: CustomUploadProps) => {
  const { value = [], onChange, ...rest } = props;

  const [internalFileList, setInternalFileList] = React.useState<UploadFile[]>(convertToUploadFile(value || []));

  const triggerChange = React.useCallback((newValue: App.Types.Place.Photo[]) => {
    onChange?.([...value, ...newValue]);
  }, [onChange, value]);

  const { mutate: upload, isPending } = useMutation({
    mutationFn: (files: File[]) => {
      return uploadService.upload(files);
    }
  });

  const customRequest: UploadProps["customRequest"] = React.useCallback(
    (options) => {
      const { onSuccess } = options;

      setTimeout(() => {
        onSuccess?.({});
      }, 1000);
    },
    []
  );

  const beforeUpload: UploadProps["beforeUpload"] = React.useCallback((file, fileList) => {
    upload(fileList, {
      onSuccess: (res) => {
        setInternalFileList(prev => [...prev, ...convertToUploadFile(res.data)]);
        triggerChange(res.data);
      },
      onError: (error) => {
        console.log(error);
      }
    })
    return true;
  }, [upload, triggerChange]);

  return (
    <>
      <Upload
        fileList={internalFileList}
        listType="picture-card"
        beforeUpload={beforeUpload}
        customRequest={customRequest}
        maxCount={16}
        multiple
        accept="image/*"
        {...rest}
      >
        <Button type="text" className="flex flex-col w-full h-full items-center justify-center gap-1">
          {isPending ? (
            <div className="flex flex-col items-center justify-center gap-1">
              <LoadingOutlined className="text-lg" />
              <Typography.Text>Đang tải lên...</Typography.Text>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-1">
              <CameraOutlined className="text-lg" />
              <Typography.Text>Thêm ảnh</Typography.Text>
            </div>
          )}
        </Button>
      </Upload>
      <Typography.Text className="text-sm text-ellipsis text-gray-500">
        Chọn tối đa 16 ảnh
      </Typography.Text>
    </>
  );
};

export default CustomUpload;
