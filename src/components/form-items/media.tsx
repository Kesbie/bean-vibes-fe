import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, FormInstance, message, Upload } from "antd";
import type { FormItemProps, UploadFile, UploadProps } from "antd";
import { isString } from "lodash";

import { uploadService } from "@/services";
import { useMutation } from "@tanstack/react-query";

const normFile: FormItemProps["getValueFromEvent"] = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

type Props = {
  form: FormInstance;
  name: string;
};

const MediaUploadFormItem = (
  props: Props
) => {
  const { form, name } = props;

  const files = Form.useWatch(name, form);

  const uploadMutation = useMutation({
    mutationFn: (fileUpload: File) => {
      return uploadService
        .uploadMedia([fileUpload])
        .then((res) => res.data);
    }
  });

  const attachmentMutation = useMutation({
    mutationFn: (files: string[]) => {
      return Promise.all(
        files.map((file) =>
          uploadService.getMediaById(file).then((res) => res.data)
        )
      );
    },
  });

  const customRequest: UploadProps["customRequest"] = (options) => {
    const { onSuccess, onError, file } = options;

    console.log(file);

    uploadMutation.mutate(file as File, {
      onSuccess: (res) => {
        onSuccess?.(res[0]);
      },
      onError: (error) => {
        onError?.(error);
      }
    });
  };

  React.useEffect(() => {
    if (!files) return;

    console.log(files)

    const stringFiles = files.filter((file: string | UploadFile) =>
      isString(file)
    ) as string[];

    if (!stringFiles.length) return;

    attachmentMutation.mutate(stringFiles, {
      onSuccess: (res) => {
        const initialFileList = res.map(
          (file) =>
            ({
              uid: file?.id,
              size: file?.size,
              name: file?.originalName,
              type: file?.type,
              url: file?.url,
              response: file
            } as UploadFile)
        );
        form.resetFields([name]);
        form.setFieldValue(name, initialFileList);
      },
      onError: () => {
        form.resetFields([name]);
        message.error("Lỗi khi lấy tài liệu");
      }
    });
  }, [files, form]);

  return (
    <Form.Item
      name={name}
      valuePropName="fileList"
      label="Tài liệu đính kèm"
      getValueFromEvent={normFile}
    >
      <Upload
        customRequest={customRequest}
        showUploadList={{
          extra: ({ size = 0 }) => (
            <span style={{ color: "#cccccc" }}>
              ({(size / 1024 / 1024).toFixed(2)}MB)
            </span>
          ),
          showDownloadIcon: true,
          downloadIcon: "Download",
          showRemoveIcon: true
        }}
      >
        <Button icon={<UploadOutlined />}>Chọn tệp</Button>
      </Upload>
    </Form.Item>
  );
};

export default React.memo(MediaUploadFormItem);
