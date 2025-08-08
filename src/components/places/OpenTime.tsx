import { Form, TimePicker, Typography } from "antd";
import dayjs from "dayjs";
import React from "react";

type OpenTimeProps = {
  value?: App.Types.Place.Time;
  onChange?: (value: App.Types.Place.Time) => void;
};

const OpenTime = (props: OpenTimeProps) => {
  const { value, onChange } = props;

  const triggerChange = (changedValue: App.Types.Place.Time) => {
    onChange?.({ ...value, ...changedValue });
  };

  const handleChange = React.useCallback((value) => {
    triggerChange({ open: value[0].format("HH:mm"), close: value[1].format("HH:mm") });
  }, [])

  return (
    <TimePicker.RangePicker
      className="w-full"
      format="HH:mm"
      value={[dayjs(value?.open, "HH:mm"), dayjs(value?.close, "HH:mm")]}
      onChange={handleChange}
    />
  );
};

export default OpenTime;
