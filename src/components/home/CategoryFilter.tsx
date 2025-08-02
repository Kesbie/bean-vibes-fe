'use client';

import React from "react";
import { useHomeData } from "@/hooks/useHomeData";
import { Tag } from "antd";

const CategoryFilter: React.FC = () => {
  const { categories, selectedCategory, handleCategoryChange, clearFilters, hasFilters } = useHomeData();

  if (categories.length === 0) return null;

  return (
    <div className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Lọc theo danh mục
          </h3>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3">
          <Tag
            color={!selectedCategory ? "red" : "default"}
            className="cursor-pointer text-sm px-4 py-2"
            onClick={clearFilters}
          >
            Tất cả
          </Tag>
          
          {categories.map((category) => (
            <Tag
              key={category.id}
              color={selectedCategory === category.id ? "red" : "default"}
              className="cursor-pointer text-sm px-4 py-2"
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.name}
            </Tag>
          ))}
        </div>

        {hasFilters && (
          <div className="text-center mt-4">
            <button
              onClick={clearFilters}
              className="text-red-600 hover:text-red-700 text-sm underline"
            >
              Xóa bộ lọc
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryFilter; 