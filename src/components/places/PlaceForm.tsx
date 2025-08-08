"use client";

import { Form, Input, Button, Typography, Divider } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { placeService } from "@/services";
import RegionSelect from "./RegionSelect";
import OpenTime from "./OpenTime";
import Wifi from "./Wifi";
import Price from "./Price";
import StyleSelect from "./StyleSelect";
import ServiceSelect from "./ServiceSelect";
import PurposeSelect from "./PurposeSelect";
import Socials from "./Socials";
import { useCustomMutation } from "@/hooks/useQuery";
import { pick } from "lodash";
import CustomUpload from "../form-items/customUpload";
import { useRouter } from "next/navigation";

const { TextArea } = Input;

export default function PlaceForm() {
  const [form] = Form.useForm();
  const router = useRouter();
  const { mutate: createPlace, isPending } = useCustomMutation({
    mutationFn: (values: any) => placeService.addPlace(values),
    messageConfigs: {
      successMessage: "Thêm địa điểm thành công",
      errorMessage: "Thêm địa điểm thất bại"
    },
    onSuccess: () => {
      router.push("/add-place/success");
    }
  });

  const handleSubmit = (values: App.Types.Place.PlaceCreate) => {
    const payload = {
      ...pick(values, [
        "name",
        "description",
        "time",
        "price",
        "wifi",
        "socials",
        "photos"
      ]),
      address: {
        fullAddress: values.address
      },
      categories: [
        values?.region || "",
        ...(values?.styles || []),
        ...(values?.services || []),
        ...(values?.purposes || [])
      ]
    };

    console.log(payload);

    createPlace(payload);
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      labelAlign="left"
      initialValues={{
        time: {
          open: "08:00",
          close: "22:00"
        },
        price: {
          min: 10000,
          max: 50000
        }
      }}
      //   name: "The Alley",
      //   address: "120 Yên Lãng",
      //   description: "Yên Lãng quê tôi",
      //   wifi: {
      //     name: "thealley",
      //     password: "120yenlang"
      //   },
      //   socials: [
      //     {
      //       type: "facebook",
      //       url: "https://facebook.com/"
      //     }
      //   ],

      // }}
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
      <Form.Item name="time" label="Thời gian mở cửa">
        <OpenTime />
      </Form.Item>
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

      {/* <PhotoUpload /> */}
      <Form.Item name="photos">
        <CustomUpload />
      </Form.Item>

      <Button
        className="w-full font-bold text-lg"
        size="large"
        icon={<PlusOutlined />}
        type="primary"
        htmlType="submit"
        loading={isPending}
      >
        {"Thêm địa điểm"}
      </Button>
    </Form>
  );
}
