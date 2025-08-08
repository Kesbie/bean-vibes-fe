import Box from "@/components/box";
import { EnvironmentOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import PlacePhotos from "./PlacePhotos";

type Props = {
  place: App.Types.Place.PlaceResponse;
};

const PlaceContent = (props: Props) => {
  const { place } = props;

  return (
    <Box title={<Typography.Title level={2}>{place.name}</Typography.Title>}>
      <div className="flex flex-col gap-2">
        <Typography.Text className="text-base font-medium">{place.description}</Typography.Text>
        <Typography.Text className="text-base font-semibold flex items-center gap-2">
          <EnvironmentOutlined />
          {place.address.fullAddress}
        </Typography.Text>
        <PlacePhotos photos={place.photos || []} />
      </div>
    </Box>
  );
};

export default PlaceContent;
