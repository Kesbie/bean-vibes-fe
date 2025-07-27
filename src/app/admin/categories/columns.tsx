import { CategoryTypesMap } from "@/constants";
import { Tag } from "antd";
import { ColumnsType } from "antd/es/table";
// import Image from "next/image";
import { Image } from "antd";

const columns: ColumnsType<App.Types.Category.CategoryResponse> = [
  {
    title: "Tên danh mục",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "Ảnh đại diện",
    dataIndex: "thumbnail",
    key: "thumbnail",
    render: (_, { name, thumbnail }) => {
      if (!thumbnail) return null;

      return (
        <Image
          src={thumbnail}
          alt={name}
          width={100}
          height={100}
        />
      );
    }
  },
  {
    title: "Slug",
    dataIndex: "slug",
    key: "slug"
  },
  {
    title: "Mô tả",
    dataIndex: "description",
    key: "description"
  },
  {
    title: "Loại",
    dataIndex: "type",
    key: "type",
    render: (_, { type }) => {
      return (
        <Tag color={CategoryTypesMap.get(type)?.color}>
          {CategoryTypesMap.get(type)?.title}
        </Tag>
      );
    }
  }
];

export { columns };
