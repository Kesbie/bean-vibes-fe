import { Form, TimePicker, Typography } from "antd";
import dayjs from "dayjs";
import React from "react";

const OpenTime = () => {
  return (
    <Form.Item name="time" label="Thời gian mở cửa">
      <TimePicker.RangePicker defaultValue={[dayjs("08:00", "HH:mm"), dayjs("22:00", "HH:mm")]} className="w-full" format="HH:mm" />
    </Form.Item>
  );
};

export default OpenTime;
