import { Form, Rate, Typography } from "antd";
import { RateQualityMap, RATING_TYPES, RatingTypesMap } from "@/constants";
import React from "react";
import { cn } from "@/lib/utils";

type RatingProps = {
  value?: {
    drinkQuality?: number;
    location?: number;
    price?: number;
    service?: number;
    staffAttitude?: number;
  };
  onChange?: (value: RatingProps["value"]) => void;
};

const Rating = (props: RatingProps) => {
  const { value, onChange } = props;

  const triggerChange = (changedValue: {
    drinkQuality?: number;
    location?: number;
    price?: number;
    service?: number;
    staffAttitude?: number;
  }) => {
    onChange?.({ ...value, ...changedValue });
  };

  const handleChange = (key: string, value: number) => {
    triggerChange({ [key]: value });
  };

  return (
    <div className="flex flex-col gap-2">
      {Object.entries(RATING_TYPES).map(([key, typeValue]) => {
        return (
          <div className="flex items-center gap-4 select-none" key={key}>
            <Typography.Text className="min-w-40 font-semibold">
              {RatingTypesMap.get(typeValue)?.title}
            </Typography.Text>
            <Rate
              allowClear={false}
              className="text-primary"
              defaultValue={value[typeValue] || 5}
              onChange={(value) => handleChange(typeValue, value)}
            />
            <Typography.Text
              className={cn(
                "ml-10 bg-primary text-white font-semibold",
                "rounded-md rounded-l-none px-2 py-1",
                "relative before:absolute",
                "before:-left-[15px] before:top-0 before:border-r-[15px] before:border-y-[15px] before:border-l-0",
                "before:border-r-primary before:border-y-transparent"
              )}
            >
              {RateQualityMap.get(value[typeValue])?.title}
            </Typography.Text>
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(Rating);
