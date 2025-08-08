"use client";

import { Checkbox, Collapse, Typography } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { CategoryTypesMap } from "@/constants";
import React from "react";
import { categoryService } from "@/services";
import { useCustomPaginatedQuery } from "@/hooks/useQuery";

type Props = {
  label: string;
};

const CategoryFilter = (props: Props) => {
  const { label } = props;

  const params = useSearchParams();
  const router = useRouter();

  const currentCategory = React.useMemo(() => {
    return params.getAll(label);
  }, [params, label]);

  const { data: categories } = useCustomPaginatedQuery({
    queryKey: ["category", label],
    api: categoryService.getCategories({ type: label, limit: 30 }),
    enabled: !!label
  });

  const options = React.useMemo(() => {
    return (
      categories?.results.map((item) => ({
        label: item.name,
        value: item?.slug || "xxx"
      })) || []
    );
  }, [categories]);

  const item = React.useMemo(() => {
    const handleChange = (checkedValues: string[]) => {
      const newParams = new URLSearchParams(params);

      newParams.delete(label);
      checkedValues.forEach((category) => {
        newParams.append(label, category);
      });

      router.push(`?${newParams.toString()}`);
    };

    return {
      key: label,
      label: (
        <Typography.Text className="text-lg font-semibold text-gray-900">
          {CategoryTypesMap.get(label)?.title}
        </Typography.Text>
      ),
      children: (
        <Checkbox.Group
          onChange={handleChange}
          className="flex flex-col gap-2"
          options={options}
          defaultValue={currentCategory}
        />
      )
    };
  }, [label, options, currentCategory, params, router]);

  return (
    <Collapse
      className="bg-white select-none"
      bordered={false}
      expandIconPosition="end"
      items={[item]}
      defaultActiveKey={label}
    />
  );
};

export default React.memo(CategoryFilter);
