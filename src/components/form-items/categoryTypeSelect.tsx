import { Select, SelectProps } from "antd";
import { convertMapToArray } from "@/lib/utils";
import { CategoryTypesMap } from "@/constants";

const categoryTypeOptions = convertMapToArray(CategoryTypesMap);

const CategoryTypeSelect = (props: Omit<SelectProps, "options">) => {
  return <Select options={categoryTypeOptions} {...props} />;
};

export default CategoryTypeSelect;
