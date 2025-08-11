import React from "react";
import Box from "../box";
import { Button, Empty, Typography } from "antd";
import PlaceReviewItem from "./PlaceReviewItem";
import { useCustomPaginatedQuery } from "@/hooks/useQuery";
import { reviewService } from "@/services";
import Modal from "../modals";
import NewReviewForm from "@/app/new-review/form";

type Props = {
  place: App.Types.Place.PlaceResponse;
};

const PlaceReview = (props: Props) => {
  const { place } = props;

  const reviewModalRef = React.useRef<App.Components.Modal.ModalRef>(null);

  console.log(place)

  const { data: reviews } = useCustomPaginatedQuery({
    queryKey: ["reviews", place.id],
    api: reviewService.getReviewsByPlace(place.id, {}),
    enabled: !!place.id
  });


  const showReviewModal = React.useCallback(() => {
    reviewModalRef.current?.show();
  }, [])

  const boxTitle = (
    <div className="flex items-center mb-4 justify-between">
      <Typography.Title level={3}>Đánh giá từ cộng đồng</Typography.Title>
      <Button type="primary" className="font-semibold" onClick={showReviewModal}>
        Viết đánh giá
      </Button>
    </div>
  );

  return (
    <Box title={boxTitle}>
      <div className="flex flex-col gap-4">

        {reviews?.results?.length === 0 && (
          <div className="flex justify-center items-center h-full">
            <Empty className="text-center text-gray-500">Chưa có đánh giá</Empty>
          </div>
        )} 

        {reviews?.results?.map((review) => (
          <PlaceReviewItem key={review.id} review={review} />
        ))}
      </div>
      <Modal footer={false} ref={reviewModalRef} title={<Typography.Text className="text-2xl font-bold text-center">{`Đánh giá - ${place.name}`}</Typography.Text>} width={800}>
        <NewReviewForm place={place} onSuccess={() => {
          reviewModalRef.current?.hide();
          window.dispatchEvent(new Event("refetch-place"));
        }} />
      </Modal>
    </Box>
  );
};

export default PlaceReview;
