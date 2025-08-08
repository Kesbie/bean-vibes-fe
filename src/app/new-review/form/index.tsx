import { Button, Divider, Form, Input, Switch, Typography } from "antd";
import Rating from "./Rate";
import React from "react";
import Place from "./Place";
import { useCustomMutation } from "@/hooks/useQuery";
import { ratingService, reviewService } from "@/services";
import CustomUpload from "@/components/form-items/customUpload";
import { pick } from "lodash";
import { useRouter } from "next/navigation";

type Props = {
  place?: App.Types.Place.PlaceResponse;
  onSuccess?: (place: App.Types.Place.PlaceResponse) => void;
};

const NewReviewForm = (props: Props) => {
  const { place, onSuccess } = props;

  const [isLoading, setIsLoading] = React.useState(false);

  const { mutate: ratePlace } = useCustomMutation({
    mutationFn: (values: App.Types.Rating.RatingCreate) => {
      return ratingService.ratePlace(values);
    },
    messageConfigs: {
      successMessage: "Xếp hạng thành công!",
      errorMessage: "Xếp hạng thất bại!",
    },
  });

  const { mutateAsync: createReview } = useCustomMutation({
    mutationFn: (values: App.Types.Review.CreateReviewData) => {
      return reviewService.createReview(values);
    },
    messageConfigs: {
      successMessage: "Đánh giá thành công!",
      errorMessage: "Đánh giá thất bại!",
    },
  });

  const handleSubmit = (values: App.Types.Review.CreateReviewData) => {
    setIsLoading(true);

    const rating = { ...values.rating, place: values.place.id };

    const reviewPayload = {
      ...pick(values, "title", "content", "photos", "isAnonymous"),
      place: values.place.id,
    }

    ratePlace(rating);
    createReview(reviewPayload, {
      onSuccess: () => {
        setIsLoading(false);
        onSuccess?.(values.place);
      },
    });
    
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
        isAnonymous: false,
        place: place
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

      <Form.Item name="photos">
        <CustomUpload />
      </Form.Item>

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
