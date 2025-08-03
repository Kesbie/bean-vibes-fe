import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";

type Props = {
  type?: "vertical" | "horizontal";
  place: App.Types.Place.PlaceResponse;
};
const PlaceCard = (props: Props) => {
  const { type = "vertical", place } = props;

  return type === "vertical" ? (
    <article className="flex flex-col gap-4">
      <Link href={`/place/${place.id}`}>
        <div className="">
          <Image
            src={place.photos[0]}
            width={200}
            height={200}
            alt={place.name}
          />
        </div>
      </Link>
      <div className="flex flex-col gap-2">
        <Link href={`/place/${place.id}`}>
          <h3 className="text-lg font-bold">{place.name}</h3>
        </Link>
        <p className="text-sm text-gray-500 flex items-center gap-2">
          <span>{<Icon icon="ph:money-light" />}</span>
          <span className="font-bold">
            {place.price.min} - {place.price.max} VND
          </span>
        </p>
        <p className="text-sm text-gray-500 flex items-center gap-2">
          <span>{<Icon icon="ph:map-pin-light" />}</span>
          <span className="font-bold">{place.address.fullAddress}</span>
        </p>
        <p className="text-sm text-gray-500 flex items-center gap-2">
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
            src={place.photos[0]}
            width={200}
            height={200}
            alt={place.name}
          />
        </Link>
        <div className="flex flex-col gap-2">
          <Link href={`/place/${place.id}`}>
            <h3 className="text-lg font-bold">{place.name}</h3>
          </Link>
          <p className="text-sm text-gray-500 flex items-center gap-2">
            <span>{<Icon icon="ph:money-light" />}</span>
            <span className="font-bold">
              {place.price.min} - {place.price.max} VND
            </span>
          </p>
          <p className="text-sm text-gray-500 flex items-center gap-2">
            <span>{<Icon icon="ph:map-pin-light" />}</span>
            <span className="font-bold">{place.address.fullAddress}</span>
          </p>
          <p className="text-sm text-gray-500 flex items-center gap-2">
            <span>{<Icon icon="ph:clock-light" />}</span>
            <span className="font-bold">
              {place.time.open} - {place.time.close}
            </span>
          </p>
        </div>
      </div>
    </article>
  );
};

export default PlaceCard;
