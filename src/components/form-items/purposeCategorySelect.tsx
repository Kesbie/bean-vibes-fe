
import { Select, SelectProps } from "antd";
import { CategoryTypes } from "@/constants";
import { categoryService } from "@/services";
import { useQuery } from "@tanstack/react-query";

const CategoryTypeSelect = (props: Omit<SelectProps, "options">) => {

  const { data: options } = useQuery({
    queryKey: ["purpose-categories"],
    queryFn: () => categoryService.getCategories({
      type: CategoryTypes.PURPOSE,
    }),
  })

  console.log(options)

  return <Select options={options} {...props} />;
};

export default CategoryTypeSelect;
