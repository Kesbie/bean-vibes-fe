import React from "react";
import {
  Input,
  InputNumber,
  Select,
  DatePicker,
  Switch,
  Checkbox,
  Radio,
  Slider,
  Rate,
  Upload,
  AutoComplete,
  Typography,
  Form
} from "antd";
import { cn } from "@/lib/utils";
import { nanoid } from "nanoid";

const { TextArea } = Input;

const DEFAULT_ELEMENT_TYPES = {
  input: Input,
  inputNumber: InputNumber,
  password: Input.Password,
  select: Select,
  datePicker: DatePicker,
  switch: Switch,
  checkbox: Checkbox,
  radio: Radio,
  slider: Slider,
  rate: Rate,
  upload: Upload,
  textarea: TextArea,
  autoComplete: AutoComplete
};

export const DynamicRenderer = <T extends object>(
  props: App.Components.FormAdvance.DynamicRendererProps<T>
) => {
  const { elements, elementTypes, form } = props;

  const renderElement = (type: string, inputProps: Record<string, unknown>) => {
    const Component = { ...DEFAULT_ELEMENT_TYPES, ...elementTypes }[
      type
    ] as React.ComponentType;

    const componentProps = { ...inputProps, form } as Record<string, unknown>;

    if (!Component) {
      if (process.env.NODE_ENV === "development") {
        console.warn(`Component ${type} not found`);
      }
      return null;
    }

    return <Component key={nanoid()} {...componentProps} />;
  };

  return (
    <>
      {elements.map((element) => {
        const {
          className,
          type,
          inputProps,
          noFormItem = false,
          cols = 1,
          ...restProps
        } = element;

        if (type === "title") {
          const { label, subTitle, ...rest } = restProps;

          return (
            <div className="col-span-full" key={nanoid(10)}>
              <Typography.Title className="mb-0" level={2} {...rest}>
                {label}
              </Typography.Title>
              {subTitle && (
                <Typography.Text className="text-gray-500" key={nanoid(10)}>
                  {subTitle}
                </Typography.Text>
              )}
            </div>
          );
        }

        return noFormItem ? (
          <React.Fragment key={nanoid(10)}>
            {renderElement(type, { ...element })}
          </React.Fragment>
        ) : (
          <Form.Item<T>
            className={cn("mb-0", className)}
            style={{ gridColumn: `span ${cols} / span ${cols}` }}
            key={nanoid(10)}
            {...restProps}
          >
            {type ? renderElement(type, inputProps) : <Input {...inputProps} />}
          </Form.Item>
        );
      })}
    </>
  );
};
