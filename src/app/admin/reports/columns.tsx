import {
  PlaceApprovalStatusMap,
  ReportStatusMap,
  ReportTypesMap,
  RestrictedWordTypesMap
} from "@/constants";
import { Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

const columns: ColumnsType<App.Types.RestrictedWord.RestrictedWordResponse> = [
  {
    title: "Tiêu đề",
    dataIndex: "title",
    key: "title"
  },
  {
    title: "Lý do",
    dataIndex: "reason",
    key: "reason"
  },
  {
    title: "Đối tượng",
    dataIndex: "reportableModel",
    key: "reportableModel",
    render: (_, { reportableModel }) => {
      return (
        <Tag color={ReportTypesMap.get(reportableModel)?.color}>
          {ReportTypesMap.get(reportableModel)?.title}
        </Tag>
      );
    }
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    render: (_, { status }) => {
      return (
        <Tag color={ReportStatusMap.get(status)?.color}>
          {ReportStatusMap.get(status)?.title}
        </Tag>
      );
    }
  },
  {
    title: "Ngày báo cáo",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (_, { createdAt }) => {
      return <span>{dayjs(createdAt).format("DD/MM/YYYY")}</span>;
    }
  }
];

export { columns };
