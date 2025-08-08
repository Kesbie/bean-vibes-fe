import { Modal, Typography } from "antd";
import Rating, { Ref as RatingRef } from "@/app/new-review/form/Rate";
import React from "react";
import { ratingService } from "@/services";
import { useCustomMutation } from "@/hooks/useQuery";
import { pick } from "lodash";

type Props = {
  place: App.Types.Place.PlaceResponse;
  defaultRating?: App.Types.Rating.RatingResponse;
};

export type Ref = {
  show: () => void;
};

const RatingModal = React.forwardRef<Ref, Props>((props, ref) => {
  const { place, defaultRating } = props;

  const { mutate: rateMutate, isPending } = useCustomMutation({
    mutationFn: (data: App.Types.Rating.RatingCreate) => {
      return ratingService.ratePlace(data);
    },
    onSuccess: () => {
      window.dispatchEvent(new Event("refetch-place"));
      setOpen(false);
    },
    messageConfigs: {
      successMessage: "Đánh giá thành công",
      errorMessage: "Đánh giá thất bại"
    }
  });

  const { mutate: updateMutate, isPending: isUpdating } = useCustomMutation({
    mutationFn: (data: App.Types.Rating.RatingCreate) => {
      return ratingService.updatePlaceRating(
        defaultRating.id,
        pick(data, [
          "drinkQuality",
          "location",
          "price",
          "service",
          "staffAttitude"
        ])
      );
    },
    onSuccess: () => {
      console.log("update success");

      window.dispatchEvent(new Event("refetch-place"));
      // queryClient.invalidateQueries({
      //   queryKey: ["place", placeSlug]
      // });
      setOpen(false);
    },
    messageConfigs: {
      successMessage: "Cập nhật đánh giá thành công",
      errorMessage: "Cập nhật đánh giá thất bại"
    }
  });

  const ratingRef = React.useRef<RatingRef>(null);

  const [open, setOpen] = React.useState(false);

  const handleCancel = React.useCallback(() => {
    setOpen(false);
  }, []);

  const handleOk = React.useCallback(() => {
    const rating = ratingRef.current?.getValue();
    if (!rating) return;

    if (defaultRating) {
      updateMutate(rating);
      return;
    }

    const payload = {
      place: place.id,
      ...rating
    };

    rateMutate(payload);
  }, [place.id, rateMutate, defaultRating, updateMutate]);

  React.useImperativeHandle(ref, () => ({
    show: () => {
      setOpen(true);
    }
  }));

  return (
    <Modal
      title={
        <Typography.Title level={3}>
          {defaultRating ? "Chỉnh sửa đánh giá" : "Đánh giá"}
        </Typography.Title>
      }
      open={open}
      okText={defaultRating ? "Cập nhật" : "Đánh giá"}
      cancelText="Hủy"
      onCancel={handleCancel}
      onOk={handleOk}
      loading={isPending || isUpdating}
    >
      <Rating ref={ratingRef} value={defaultRating || {
        drinkQuality: 5,
        location: 5,
        price: 5,
        service: 5,
        staffAttitude: 5
      }} />
    </Modal>
  );
});

RatingModal.displayName = "RatingModal";

export default React.memo(RatingModal);
