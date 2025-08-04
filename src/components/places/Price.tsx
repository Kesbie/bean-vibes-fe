import { Form, Input, InputNumber, Typography } from "antd";
import React from "react";

type PriceProps = {
  values?: {
    min?: number;
    max?: number;
  };
  onChange?: (values: { min?: number; max?: number }) => void;
};

const Price = (props: PriceProps) => {
  const { values = {}, onChange } = props;

  const triggerChange = (changedValue: { min?: number; max?: number }) => {
    onChange?.({ ...values, ...changedValue });
  };

  const handleMinChange = (value: number) => {
    const newValue = value;

    triggerChange({ min: newValue });
  };

  const handleMaxChange = (value: number) => {
    const newValue = value;

    triggerChange({ max: newValue });
  };

  return (
    <div className="flex items-center gap-2">
      <InputNumber
        placeholder="Nhập giá thấp nhất"
        defaultValue={values?.min || 10000}
        onChange={handleMinChange}
        className="w-full"
        suffix="đ"
      />
      <Typography.Text>-</Typography.Text>
      <InputNumber
        placeholder="Nhập giá cao nhất"
        defaultValue={values?.max || 1000000}
        onChange={handleMaxChange}
        className="w-full"
        suffix="đ"
      />
    </div>
  );
};

export default Price;
