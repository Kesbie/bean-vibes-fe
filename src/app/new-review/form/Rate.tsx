import { Rate, Typography } from "antd";
import { RateQualityMap, RATING_TYPES, RatingTypesMap } from "@/constants";
import React from "react";
import { cn } from "@/lib/utils";

type RatingValue = {
  drinkQuality?: number;
  location?: number;
  price?: number;
  service?: number;
  staffAttitude?: number;
};

type RatingProps = {
  value?: RatingValue;
  defaultValue?: RatingValue;
  onChange?: (value: RatingProps["value"]) => void;
};

export type Ref = {
  getValue?: () => RatingValue;
};

const Rating = React.forwardRef<Ref, RatingProps>((props, ref) => {
  const {
    value = {
      drinkQuality: 5,
      location: 5,
      price: 5,
      service: 5,
      staffAttitude: 5
    },
    defaultValue,
    onChange
  } = props;

  const [internalValue, setInternalValue] = React.useState(defaultValue || value);

  const triggerChange = (changedValue: {
    drinkQuality?: number;
    location?: number;
    price?: number;
    service?: number;
    staffAttitude?: number;
  }) => {
    const newInternalValue = { ...internalValue, ...changedValue };

    setInternalValue(newInternalValue);
    onChange?.(newInternalValue);
  };

  const handleChange = (key: string, value: number) => {
    triggerChange({ [key]: value });
  };

  React.useImperativeHandle(ref, () => ({
    getValue: () => internalValue
  }));

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
              defaultValue={internalValue?.[typeValue] || 5}
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
              {RateQualityMap.get(internalValue?.[typeValue])?.title}
            </Typography.Text>
          </div>
        );
      })}
    </div>
  );
});

Rating.displayName = "Rating";

export default React.memo(
  Rating as (
    props: React.PropsWithoutRef<RatingProps> & React.RefAttributes<Ref>
  ) => ReturnType<typeof Rating>
);
