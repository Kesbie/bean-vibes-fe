'use client';

import React from "react";
import { useHomeData } from "@/hooks/useHomeData";
import { CoffeeOutlined, StarOutlined, EnvironmentOutlined, FireOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const StatsSection: React.FC = () => {
  const { featuredPlaces, isLoadingFeatured } = useHomeData();

  const stats = [
    {
      icon: <CoffeeOutlined className="text-3xl text-red-500" />,
      title: "Quán Cafe",
      value: featuredPlaces.length > 0 ? "100+" : "Đang tải...",
      description: "Địa điểm đã được kiểm duyệt"
    },
    {
      icon: <StarOutlined className="text-3xl text-yellow-500" />,
      title: "Đánh Giá",
      value: featuredPlaces.length > 0 ? "500+" : "Đang tải...",
      description: "Đánh giá từ người dùng"
    },
    {
      icon: <EnvironmentOutlined className="text-3xl text-blue-500" />,
      title: "Khu Vực",
      value: "12",
      description: "Quận huyện được phủ sóng"
    },
    {
      icon: <FireOutlined className="text-3xl text-orange-500" />,
      title: "Hot Places",
      value: featuredPlaces.filter(p => p.hotScore > 0).length.toString(),
      description: "Địa điểm nổi bật"
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-r from-red-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Thống kê tổng quan
          </h2>
          <p className="text-gray-600">
            Những con số ấn tượng về cộng đồng cafe của chúng tôi
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-center mb-4">
                {stat.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {isLoadingFeatured ? (
                  <Spin size="small" />
                ) : (
                  stat.value
                )}
              </h3>
              <h4 className="text-lg font-semibold text-gray-700 mb-1">
                {stat.title}
              </h4>
              <p className="text-sm text-gray-500">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection; 