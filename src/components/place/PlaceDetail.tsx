"use client";

import { Typography } from "antd";
import React from "react";
import Box from "../box";
import { nanoid } from "nanoid";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { OPEN_STATUS, SOCIAL_TYPES } from "@/constants/types";
import dayjs from "dayjs";
import { OpenStatusMap } from "@/constants/map";
interface PlaceDetailProps {
  place: App.Types.Place.PlaceResponse;
}

const getSocialIcon = (type: string) => {
  switch (type) {
    case SOCIAL_TYPES.FACEBOOK:
      return "ph:facebook-logo-light";
    case SOCIAL_TYPES.INSTAGRAM:
      return "ph:instagram-logo-light";
    case SOCIAL_TYPES.YOUTUBE:
      return "ph:youtube-logo-light";
    case SOCIAL_TYPES.TIKTOK:
      return "ph:tiktok-logo-light";
    case SOCIAL_TYPES.WEBSITE:
      return "ph:globe-light";
    default:
      "";
  }
};

const getOpenStatus = (time: App.Types.Place.Time) => {
  const now = dayjs();
  const openHour = dayjs(time.open, "HH:mm");
  const closeHour = dayjs(time.close, "HH:mm");
  if (now.isAfter(openHour) && now.isBefore(closeHour)) {
    return OPEN_STATUS.OPEN;
  }
  return OPEN_STATUS.CLOSE;
};

const PlaceDetail: React.FC<PlaceDetailProps> = (props: PlaceDetailProps) => {
  const { place } = props;

  return (
    <Box
      title={
        <Typography.Title level={3}>{`Thông tin chi tiết`}</Typography.Title>
      }
    >
      <div className="flex flex-col gap-2 font-semibold">
        {place.price && (
          <Typography.Text className="flex text-base items-center gap-2">
            <Icon icon="ph:money-light" />
            {`${place.price.min}đ - ${place.price.max}đ`}
          </Typography.Text>
        )}
        {place.time && (
          <Typography.Text className="flex text-base items-center gap-2">
            <Icon icon="ph:clock-light" />
            <span
              style={{
                color: OpenStatusMap.get(getOpenStatus(place.time))?.color
              }}
            >
              {OpenStatusMap.get(getOpenStatus(place.time))?.title}
            </span>
            <span className="text-gray-500">
              {`${place.time.open} - ${place.time.close}`}
            </span>
          </Typography.Text>
        )}
        {place.socials &&
          place.socials.map((social) => (
            <Link href={social.url} target="_blank" key={nanoid()}>
              <Typography.Text className="flex text-base items-center gap-2">
                {<Icon icon={getSocialIcon(social.type)} />}
                {place.name}
              </Typography.Text>
            </Link>
          ))}
      </div>
    </Box>
  );
};

export default PlaceDetail;
