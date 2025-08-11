import Box from "../box";
import { Empty, Image, Typography } from "antd";

type Props = {
  place: App.Types.Place.PlaceResponse;
}

const PlaceMenu = (props: Props) => {
  const { place } = props;

  return <Box title={<Typography.Text className="text-2xl font-bold text-center">{`Menu của quán`}</Typography.Text>}>
    <div className="flex flex-col justify-center items-center gap-4">

      {place.menu?.length === 0 && (
        <div className="flex justify-center items-center h-full">
          <Empty className="text-center text-gray-500">Chưa có menu</Empty>
        </div>
      )}

      <Image.PreviewGroup>
        {place.menu?.map((photo) => (
          <Image key={photo.id} src={photo.url} />
        ))}
      </Image.PreviewGroup>
    </div>
  </Box>;
};

export default PlaceMenu; 