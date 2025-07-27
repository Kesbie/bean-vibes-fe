import { Select, SelectProps } from "antd";
import { convertMapToArray } from "@/lib/utils";
import { RestrictedWordTypesMap } from "@/constants";

const restrictedWordTypeOptions = convertMapToArray(RestrictedWordTypesMap);

const RestrictedWordTypeSelect = (props: Omit<SelectProps, "options">) => {
  return <Select options={restrictedWordTypeOptions} {...props} />;
};

export default RestrictedWordTypeSelect;
