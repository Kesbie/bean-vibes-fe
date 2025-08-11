import { Image } from "antd";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { StarFilled, StarOutlined } from "@ant-design/icons";

type Props = {
  type?: "vertical" | "horizontal";
  place: App.Types.Place.PlaceResponse;
};
const PlaceCard = (props: Props) => {
  const { type = "vertical", place } = props;

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <StarFilled key={i} className="text-red-500 text-sm" />
        ) : (
          <StarOutlined key={i} className="text-gray-300 text-sm" />
        )
      );
    }
    return stars;
  };

  return type === "vertical" ? (
    <article className="flex flex-col gap-4">
      <Link href={`/place/${place.slug}`}>
        <div className="">
          <Image
            preview={false}
            src={place.photos[0]?.url}
            width={200}
            height={200}
            style={{ objectFit: "cover" }}
            alt={place.name}
          />
        </div>
      </Link>
      <div className="flex flex-col gap-2">
        <Link href={`/place/${place.id}`}>
          <h3 className="text-lg text-black font-bold">{place.name}</h3>
        </Link>
        <p className="text-sm flex items-center gap-2">
          <span className="font-bold">{<Icon icon="ph:money-light" />}</span>
          <span className="font-bold">
            {place?.price?.min} - {place?.price?.max} VND
          </span>
        </p>
        <p className="text-sm flex items-center gap-2">
          <span>{<Icon icon="ph:map-pin-light" />}</span>
          <span className="font-bold">{place.address.fullAddress}</span>
        </p>
        <p className="text-sm flex items-center gap-2">
          <span>{<Icon icon="ph:clock-light" />}</span>
          <span className="font-bold">
            {place.time.open} - {place.time.close}
          </span>
        </p>
      </div>
    </article>
  ) : (
    <article className="flex flex-col gap-4 border border-gray-200 rounded-lg overflow-hidden mb-4">
      <div className="flex items-center gap-2">
        <Link href={`/place/${place.id}`}>
          <Image
            src={place.photos[0]?.url}
            width={200}
            height={200}
            objectFit="cover"
            alt={place.name}
          />
        </Link>
        <div className="flex flex-col gap-2">
          <Link href={`/place/${place.id}`}>
            <h3 className="text-lg text-black font-bold">{place.name}</h3>
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              {renderStars(place.averageRating || 0)}
              <span className="text-sm text-gray-600 ml-1">
                {place.totalRatings > 0
                  ? `${place.totalRatings} đánh giá`
                  : "chưa có đánh giá"}
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-500 flex items-center gap-2">
            <span>{<Icon icon="ph:money-light" />}</span>
            <span className="font-bold">
              {place?.price?.min} - {place?.price?.max} VND
            </span>
          </p>
          <p className="text-sm text-gray-500 flex items-center gap-2">
            <span>{<Icon icon="ph:map-pin-light" />}</span>
            <span className="font-bold">{place.address.fullAddress}</span>
          </p>
          <p className="text-sm text-gray-500 flex items-center gap-2">
            <span>{<Icon icon="ph:clock-light" />}</span>
            <span className="font-bold">
              {place?.time?.open} - {place?.time?.close}
            </span>
          </p>
        </div>
      </div>
    </article>
  );
};

export default PlaceCard;
