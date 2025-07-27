import { CategoryTypesMap, PlaceApprovalStatusMap, PlaceStatusMap } from "@/constants";
import { Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { nanoid } from "nanoid";
import { TruncatedText } from "@/components/shared";

const columns: ColumnsType<App.Types.Place.PlaceResponse> = [
  {
    title: "Tên quán",
    dataIndex: "name",
    width: 250,
    key: "name",
    fixed: "left",
    render: (_, { name }) => {
      return <TruncatedText text={name} maxWidth={250} />;
    }
  },
  {
    title: "Đã duyệt",
    dataIndex: "approvalStatus",
    key: "approvalStatus",
    width: 120,
    fixed: "left",
    render: (_, { approvalStatus }) => {
      return (
        <Tag color={PlaceApprovalStatusMap.get(approvalStatus)?.color}>
          {PlaceApprovalStatusMap.get(approvalStatus)?.title}
        </Tag>
      );
    },
    
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    width: 140,
    fixed: "left",
    render: (_, { status }) => {
      return (
        <Tag color={PlaceStatusMap.get(status)?.color}>
          {PlaceStatusMap.get(status)?.title}
        </Tag>
      );
    }
  },
  {
    title: "Địa chỉ",
    dataIndex: "address",
    key: "address",
    width: 250,
    render: (_, { address }) => {
      return <TruncatedText text={address.fullAddress} maxWidth={250} />;
    }
  },
  {
    title: "Giới thiệu",
    dataIndex: "description",
    key: "description",
    width: 200,
    render: (_, { description }) => {
      return <TruncatedText text={description} maxWidth={200} />;
    }
  },
  {
    title: "Danh mục",
    dataIndex: "categories",
    key: "categories",
    width: 100,
    render: (_, { categories }) => {
      return categories.map((category) => (
        <Tag
          color={CategoryTypesMap.get(category.type)?.color}
          key={category.id}
        >
          {category.name}
        </Tag>
      ));
    }
  },
  
  {
    title: "Wifi",
    dataIndex: "wifi",
    key: "wifi",
    width: 200,
    render: (_, { wifi }) => {
      return (
        <Tag color="blue" key={wifi.name}>
          {wifi.name}: {wifi.password}
        </Tag>
      );
    }
  },
  {
    title: "Giá",
    dataIndex: "price",
    key: "price",
    width: 120,
    render: (_, { price }) => {
      return (
        <Tag color="blue" key={price.min}>
          {price.min} - {price.max}
        </Tag>
      );
    }
  },
  {
    title: "Đánh giá",
    dataIndex: "averageRating",
    key: "averageRating",
    width: 100,
    render: (_, { averageRating }) => {
      return averageRating;
    }
  },
  {
    title: "Tổng đánh giá",
    dataIndex: "totalRatings",
    key: "totalRatings",
    width: 130,
    render: (_, { totalRatings }) => {
      return totalRatings;
    }
  },
  {
    title: "Lượt xem",
    dataIndex: "viewCount",
    key: "viewCount",
    width: 100,
    render: (_, { viewCount }) => {
      return viewCount;
    }
  },
  {
    title: "Hot score",
    dataIndex: "hotScore",
    key: "hotScore",
    width: 100,
    render: (_, { hotScore }) => {
      return hotScore;
    }
  },
  {
    title: "Hot score tuần",
    dataIndex: "weeklyHotScore",
    key: "weeklyHotScore",
    width: 200,
    render: (_, { weeklyHotScore }) => {
      return weeklyHotScore
    }
  },
  {
    title: "Lượt xem tuần",
    dataIndex: "weeklyViews",
    key: "weeklyViews",
    width: 200,
    render: (_, { weeklyViews }) => {
      return weeklyViews;
    }
  },
  {
    title: "Hot score tuần",
    dataIndex: "weeklyHotScore",
    key: "weeklyHotScore",
    width: 200,
    render: (_, { weeklyHotScore }) => {
      return weeklyHotScore;
    }
  },
  {
    title: "Người tạo",
    dataIndex: "createdBy",
    key: "createdBy",
    width: 100,
    render: (_, { createdBy }) => {
      return (
        <Tag color="blue" key={createdBy?.id || nanoid()}>
          {createdBy?.name || "Admin"}
        </Tag>
      );
    }
  },
  {
    title: "Người duyệt",
    dataIndex: "approvedBy",
    key: "approvedBy",
    width: 120,
    render: (_, { approvedBy }) => {
      return (
        <Tag color="blue" key={approvedBy?.id || nanoid()}>
          {approvedBy?.name || "Admin"}
        </Tag>
      );
    }
  }
];

export { columns };
