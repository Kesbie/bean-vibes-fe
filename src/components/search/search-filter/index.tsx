import React from "react";
import CategoryFilter from "./Category";
import { Divider, Typography } from "antd";
import "./style.css";

const SearchFilter = () => {
  return (
    <div className="sticky top-[65px] z-10 bg-white p-4 rounded-lg">
      <Typography.Text className="text-2xl font-semibold text-primary">
        Bộ lọc
      </Typography.Text>
      <Divider className="my-1" />
      <CategoryFilter label="region" />
      <CategoryFilter label="purpose" />
      <CategoryFilter label="style" />
      <CategoryFilter label="service" />
    </div>
  );
};

export default React.memo(SearchFilter);
