import { CATEGORY_TYPES } from "@/constants";
import { categoryService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { Form, Select } from "antd";

const RegionSelect = () => {
  const { data: regions } = useQuery({
    queryKey: ["regions"],
    queryFn: () => categoryService.getCategories({ type: CATEGORY_TYPES.REGION }).then((res) => res.data.results.map((region) => ({
      label: region.name,
      value: region.id,
    }))),
  });

  return (
    <Form.Item name="region" label="Khu vực">
      <Select options={regions} placeholder="Chọn khu vực" showSearch />
    </Form.Item>
  );
}

export default RegionSelect;