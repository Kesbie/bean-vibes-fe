import { Button, Divider, Form, Input, Switch, Typography } from "antd";
import Rating from "./Rate";
import PhotoUpload from "@/components/places/Upload";
import React from "react";
import Place from "./Place";

const NewReviewForm = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        title: "Đánh giá địa điểm",
        content: "Đánh giá địa điểm",
        rating: {
          drinkQuality: 5,
          location: 5,
          price: 5,
          service: 5,
          staffAttitude: 5
        },
        isAnonymous: false
      }}
    >
      <Typography.Text className="text-lg font-bold text-primary">
        Địa điểm đánh giá
      </Typography.Text>
      <Divider className="my-2" />

      <Form.Item
        name="place"
        rules={[{ required: true, message: "Vui lòng chọn địa điểm!" }]}
      >
        <Place />
      </Form.Item>

      <Typography.Text className="text-lg font-bold text-primary">
        Xếp hạng của bạn
      </Typography.Text>
      <Divider className="my-2" />

      <Form.Item name="rating">
        <Rating />
      </Form.Item>

      <div className="">
        <Typography.Text className="text-lg font-bold text-primary">
          Đánh giá của bạn
        </Typography.Text>
        <Divider className="my-2" />
      </div>

      <Form.Item
        name="title"
        rules={[{ required: true, message: "Vui lòng nhập tiêu đề đánh giá!" }]}
      >
        <Input placeholder="Nhập tiêu đề đánh giá" />
      </Form.Item>

      <Form.Item
        name="content"
        rules={[
          { required: true, message: "Vui lòng nhập nội dung đánh giá!" }
        ]}
      >
        <Input.TextArea rows={4} placeholder="Nhập nội dung đánh giá" />
      </Form.Item>

      <PhotoUpload />
      <Form.Item name="isAnonymous" label="Đánh giá ẩn danh">
        <Switch />
      </Form.Item>

      <Button
        className="w-full font-bold text-lg"
        size="large"
        type="primary"
        htmlType="submit"
        loading={isLoading}
      >
        {"Gửi đánh giá của bạn"}
      </Button>
    </Form>
  );
};

export default NewReviewForm;
