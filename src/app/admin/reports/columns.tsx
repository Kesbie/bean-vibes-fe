import { RestrictedWordTypesMap } from "@/constants";
import { Tag } from "antd";
import { ColumnsType } from "antd/es/table";

const columns: ColumnsType<App.Types.RestrictedWord.RestrictedWordResponse> =
  [
    {
      title: "Từ khóa",
      dataIndex: "word",
      key: "word"
    },
    {
      title: "Từ khóa chuẩn hóa",
      dataIndex: "normalizedWord",
      key: "normalizedWord"
    },
    {
      title: "Từ thay thế",
      dataIndex: "replacement",
      key: "replacement"
    },
    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
      render: (_, { type }) => {
        return (
          <Tag color={RestrictedWordTypesMap.get(type)?.color}>
            {RestrictedWordTypesMap.get(type)?.title}
          </Tag>
        );
      }
    }
  ];

export { columns };
