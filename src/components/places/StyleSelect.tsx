import { CATEGORY_TYPES } from "@/constants";
import { categoryService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { Form, Select } from "antd";

const StyleSelect = () => {

  const { data: styles } = useQuery({
    queryKey: ["styles"],
    queryFn: () => categoryService.getCategories({ type: CATEGORY_TYPES.STYLE, limit: 30 }).then((res) => res.data.results.map((style) => ({
      label: style.name,
      value: style.id,
    }))),
  });

  return (
    <Form.Item name="styles" label="Kiểu quán">
      <Select options={styles} placeholder="Chọn kiểu quán" mode="multiple" showSearch />
    </Form.Item>
  );
}

export default StyleSelect;