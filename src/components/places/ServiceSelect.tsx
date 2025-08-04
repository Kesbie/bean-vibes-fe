import { CATEGORY_TYPES } from "@/constants";
import { categoryService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { Form, Select } from "antd";

const ServiceSelect = () => {

  const { data: services } = useQuery({
    queryKey: ["services"],
    queryFn: () => categoryService.getCategories({ type: CATEGORY_TYPES.SERVICE }).then((res) => res.data.results.map((service) => ({
      label: service.name,
      value: service.id,
    }))),
  });

  return (
    <Form.Item name="services" label="Tiện ích">
      <Select options={services} placeholder="Chọn tiện ích" mode="multiple" showSearch />
    </Form.Item>
  );
}

export default ServiceSelect;