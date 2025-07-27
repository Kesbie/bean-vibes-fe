import React from "react";
import { Typography } from "antd";

const { Title, Text } = Typography;

const AdminContentHeader = (props: App.Components.AdminContentHeader.Props) => {
  const { title, description, buttons } = props;

  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <Title className="mb-2" level={3}>{title}</Title>
        <Text>{description}</Text>
      </div>
      <div className="flex gap-2">{buttons}</div>
    </div>
  );
};

export { AdminContentHeader };
