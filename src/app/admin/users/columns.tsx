import { RestrictedWordTypesMap } from "@/constants";
import { Tag } from "antd";
import { ColumnsType } from "antd/es/table";

const columns: ColumnsType<App.Types.User.UserResponse> =
  [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role"
    },
    {
      title: "Trạng thái",
      dataIndex: "isActive",
      key: "isActive"
    }
  ];

export { columns };
