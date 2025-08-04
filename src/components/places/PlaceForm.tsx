"use client";

import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  message,
  Typography,
  Divider
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useQuery, useMutation } from "@tanstack/react-query";
import { placeService, categoryService } from "@/services";
import type { UploadFile } from "antd/es/upload/interface";
import RegionSelect from "./RegionSelect";
import OpenTime from "./OpenTime";
import Wifi from "./Wifi";
import Price from "./Price";
import StyleSelect from "./StyleSelect";
import ServiceSelect from "./ServiceSelect";
import PurposeSelect from "./PurposeSelect";
import Socials from "./Socials";
import PhotoUpload from "./Upload";

const { TextArea } = Input;
const { Option } = Select;

export default function PlaceForm() {
  
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    console.log(values);
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      labelAlign="left"
      initialValues={{
        name: "The Alley",
        address: "120 Yên Lãng",
        description: "Yên Lãng quê tôi",
        wifi: {
          name: "thealley",
          password: "120yenlang"
        },
        socials: [
          {
            type: "facebook",
            url: "https://facebook.com/"
          }
        ],
        region: "6886b954248c5c75361b7c7f",
        styles: ["6886ac57c0394f1b55fef0b3", "6886ac57c0394f1b55fef0b4"],
        purposes: ["6886ac57c0394f1b55fef0b7", "6886ac57c0394f1b55fef0b8"],
        services: ["6886ac57c0394f1b55fef0b0", "6886ac57c0394f1b55fef0af"]
      }}
    >
      <div className="">
        <Typography.Text className="text-lg font-bold text-primary">
          Thông tin cơ bản
        </Typography.Text>
        <Divider className="my-2" />
      </div>
      <Form.Item
        name="name"
        label="Tên quán"
        rules={[{ required: true, message: "Vui lòng nhập tên quán!" }]}
      >
        <Input placeholder="Nhập tên quán" />
      </Form.Item>

      <RegionSelect />

      <Form.Item
        name="address"
        label="Địa chỉ"
        rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
        className="md:col-span-2"
      >
        <Input placeholder="Nhập địa chỉ chi tiết" />
      </Form.Item>

      <Form.Item
        name="description"
        label="Mô tả"
        rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
      >
        <TextArea rows={4} placeholder="Nhập mô tả" />
      </Form.Item>

      <div className="">
        <Typography.Text className="text-lg font-bold text-primary">
          Thông tin khác
        </Typography.Text>
        <Divider className="my-2" />
      </div>

      <OpenTime />
      <Form.Item name="price" label="Giá">
        <Price />
      </Form.Item>
      <Form.Item name="wifi" label="Wifi (Nếu có)">
        <Wifi />
      </Form.Item>
      <PurposeSelect />
      <StyleSelect />
      <ServiceSelect />

      <div className="">
        <Typography.Text className="text-lg font-bold text-primary">
          Thông tin mạng xã hội
        </Typography.Text>
        <Divider className="my-2" />
      </div>

      <Socials />

      <div className="">
        <Typography.Text className="text-lg font-bold text-primary">
          Hình ảnh
        </Typography.Text>
        <Divider className="my-2" />
      </div>

      <PhotoUpload />

      <Button
        className="w-full font-bold text-lg"
        size="large"
        icon={<PlusOutlined />}
        type="primary"
        htmlType="submit"
        loading={isLoading}
      >
        {"Thêm địa điểm"}
      </Button>
    </Form>
  );
}
