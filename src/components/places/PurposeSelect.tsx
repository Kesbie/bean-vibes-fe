import { CATEGORY_TYPES } from "@/constants";
import { categoryService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { Form, Select } from "antd";

const PurposeSelect = () => {

  const { data: purposes } = useQuery({
    queryKey: ["purposes"],
    queryFn: () => categoryService.getCategories({ type: CATEGORY_TYPES.PURPOSE, limit: 30 }).then((res) => res.data.results.map((purpose) => ({
      label: purpose.name,
      value: purpose.id,
    }))),
  });

  return (
    <Form.Item name="purposes" label="Mục đích">
      <Select options={purposes} placeholder="Chọn mục đích" mode="multiple" showSearch />
    </Form.Item>
  );
}

export default PurposeSelect;