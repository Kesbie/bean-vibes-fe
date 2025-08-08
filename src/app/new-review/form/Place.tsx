import { placeService } from "@/services";
import { SearchOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Image, Input, Modal, Typography } from "antd";
import React from "react";

type PlaceProps = {
  value?: App.Types.Place.PlaceResponse;
  onChange?: (value: App.Types.Place.PlaceResponse) => void;
};

type PlaceItemProps = {
  place: App.Types.Place.PlaceResponse;
  onSelect?: (place: App.Types.Place.PlaceResponse) => void;
  size?: "small" | "large";
};

const PlaceItem = (props: PlaceItemProps) => {
  const { place, onSelect, size = "small" } = props;

  return (
    <div
      className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 mr-2 rounded-md"
      onClick={() => onSelect(place)}
    >
      <Image
        className="min-w-[40px] rounded-md"
        src={place.photos?.[0]?.url || "https://ik.imagekit.io/reviewcafe/default-place.png"}
        alt={place.name}
        width={size === "small" ? 40 : 80}
        height={size === "small" ? 40 : 80}
      />
      <div className="flex flex-col">
        <Typography.Text
          className={`${
            size === "small" ? "text-sm font-semibold" : "text-base font-bold"
          }`}
        >
          {place.name}
        </Typography.Text>
        <Typography.Text
          className={`${size === "small" ? "text-xs" : "text-sm"}`}
        >
          {place.address.fullAddress}
        </Typography.Text>
      </div>
    </div>
  );
};

const Place = (props: PlaceProps) => {
  const { value , onChange } = props;
  const [isOpen, setIsOpen] = React.useState(false);
  const [currentPlace, setCurrentPlace] =
    React.useState<App.Types.Place.PlaceResponse | null>(value);

  const { data: places } = useQuery({
    queryKey: ["places"],
    queryFn: () =>
      placeService
        .getPlaces({
          limit: 10
        })
        .then((res) => res.data.results)
  });

  const showModal = React.useCallback(() => {
    setIsOpen(true);
  }, []);

  const hideModal = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleSelect = React.useCallback(
    (place: App.Types.Place.PlaceResponse) => {
      setCurrentPlace(place);
      onChange?.(place);
      hideModal();
    },
    [onChange, hideModal]
  );

  return (
    <div className="flex flex-col">
      {currentPlace ? (
        <PlaceItem place={currentPlace} onSelect={showModal} size="large" />
      ) : (
        <Button
          type="dashed"
          className="h-20 w-full"
          icon={<SearchOutlined />}
          onClick={showModal}
        >
          Nhấn vào đây để chọn địa điểm
        </Button>
      )}

      <Modal
        title="Chọn địa điểm đánh giá"
        open={isOpen}
        onCancel={hideModal}
        footer={null}
        width={800}
      >
        <div>
          <Input allowClear size="large" placeholder="Tìm kiếm địa điểm" />

          <div className="mt-4 flex flex-col h-full max-h-[250px] overflow-y-auto">
            {places?.map((place: App.Types.Place.PlaceResponse) => (
              <PlaceItem key={place.id} place={place} onSelect={handleSelect} />
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Place;
