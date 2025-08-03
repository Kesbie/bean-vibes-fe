import React from "react";
import CategoryFilter from "./Category";
import { Divider, Typography } from "antd";

const SearchFilter = () => {
  return (
    <div className="sticky top-[65px] z-10 bg-white p-4 rounded-lg">
      <Typography.Title level={5}>Filter</Typography.Title>
      <Divider />
      <CategoryFilter label="region" />
      <CategoryFilter label="purpose" />
      <CategoryFilter label="style" />
      <CategoryFilter label="service" />
    </div>
  );
};

export default React.memo(SearchFilter);
