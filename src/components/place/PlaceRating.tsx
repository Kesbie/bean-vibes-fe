"use client";

import Box from "@/components/box";
import { RATING_TYPES } from "@/constants";
import { RateQualityMap, RatingTypesMap } from "@/constants/map";
import { Button, Rate, Typography } from "antd";
import React from "react";
import RatingModal, { Ref } from "./RatingModal";
import { useAuth } from "@/components/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ratingService } from "@/services";

type Props = {
  place: App.Types.Place.PlaceResponse;
};

const getRatingStatus = (score: number): string => {
  if (score >= 4.5) return RateQualityMap.get(5).title;
  if (score >= 3.5) return RateQualityMap.get(4).title;
  if (score >= 2.5) return RateQualityMap.get(3).title;
  if (score >= 1.5) return RateQualityMap.get(2).title;
  return RateQualityMap.get(1).title;
};

const PlaceRating = (props: Props) => {
  const { place } = props;
  const { user } = useAuth();
  const router = useRouter();
  const ratingModalRef = React.useRef<Ref>(null);

  const {
    averageRating = 5,
    totalRatings = 10,
    ratingDetails = {
      drinkQuality: 5,
      location: 5,
      price: 5,
      service: 5,
      staffAttitude: 5
    }
  } = place;

  const { data: currentRating, refetch } = useQuery({
    queryKey: ["place-rating", place.id],
    queryFn: () => {
      return ratingService
        .getPlaceRatingByUser(place.id)
        .then((res) => res.data);
    },
    enabled: !!user && !!place.id
  });

  React.useEffect(() => {
    function fetchRating() {
      refetch();
    }

    window.addEventListener("refetch-place", fetchRating);

    return () => {
      window.removeEventListener("refetch-place", fetchRating);
    };
  }, [currentRating]);

  const handleRate = React.useCallback(() => {
    if (!user) {
      router.push("/login?redirect=" + window.location.pathname);
      return;
    }

    ratingModalRef.current?.show();
  }, [user]);

  console.log(currentRating);

  return (
    <Box
      title={
        <div className="flex items-center mb-4 justify-between">
          <Typography.Title className="!mb-0" level={3}>
            Đánh giá
          </Typography.Title>
          {totalRatings !== 0 && (
            <Button
              type="primary"
              className="font-semibold"
              onClick={handleRate}
            >
              {currentRating ? "Chỉnh sửa đánh giá" : "Đánh giá ngay"}
            </Button>
          )}
        </div>
      }
    >
      <div className="flex flex-col gap-3">
        <RatingModal
          ref={ratingModalRef}
          place={place}
          defaultRating={
            currentRating
          }
        />
        {totalRatings === 0 ? (
          <>
            <Typography.Text className="text-center font-semibold">
              Chưa có đánh giá
            </Typography.Text>
            <Typography.Text className="text-center">
              Hãy là người đầu tiên đánh giá địa điểm này
            </Typography.Text>
            <Button type="primary" className="w-full" onClick={handleRate}>
              Đánh giá
            </Button>
          </>
        ) : (
          <>
            <div className="flex gap-2 justify-center">
              <Typography.Text className="text-4xl text-white bg-primary font-bold rounded-md flex items-center justify-center px-2 py-2">
                {averageRating?.toFixed(1)}
              </Typography.Text>
              <div className="flex flex-col justify-between items-start">
                <Typography.Text className="text-2xl font-semibold">
                  {getRatingStatus(averageRating)}
                </Typography.Text>
                <Typography.Text className="text-sm font-semibold">{`/5 (${totalRatings} đánh giá)`}</Typography.Text>
              </div>
            </div>
            {Object.entries(RATING_TYPES).map(([key, typeValue]) => {
              return (
                <div className="flex items-center gap-4 select-none" key={key}>
                  <Typography.Text className="min-w-40 text-base font-semibold">
                    {RatingTypesMap.get(typeValue)?.title}
                  </Typography.Text>
                  <Rate
                    allowClear={false}
                    className="text-primary"
                    value={ratingDetails[typeValue]}
                    disabled
                    // onChange={(value) => handleChange(typeValue, value)}
                  />
                  <Typography.Text className="text-base font-semibold">
                    {ratingDetails[typeValue]?.toFixed(1)}
                  </Typography.Text>
                </div>
              );
            })}
          </>
        )}
      </div>
    </Box>
  );
};

export default React.memo(PlaceRating);
