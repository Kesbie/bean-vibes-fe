import { Form, Input, Typography } from "antd";
import React from "react";

type WifiProps = {
  value?: {
    name?: string;
    password?: string;
  };
  onChange?: (values: { name?: string; password?: string }) => void;
};

const Wifi = (props: WifiProps) => {
  const { value = {}, onChange } = props;

  const triggerChange = (changedValue: {
    name?: string;
    password?: string;
  }) => {
    onChange?.({ ...value, ...changedValue });
  };


  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    const newValues = { ...value, name: newValue };

    triggerChange(newValues);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    const newValues = { ...value, password: newValue };

    triggerChange(newValues);
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        placeholder="Tên wifi"
        defaultValue={value?.name || null}
        onChange={handleNameChange}
      />
      <Typography.Text>-</Typography.Text>
      <Input
        placeholder="Mật khẩu wifi"
        defaultValue={value?.password || null}
        onChange={handlePasswordChange}
      />
    </div>
  );
};

export default Wifi;
