'use client';

import React from "react";
import { EnvironmentOutlined, MenuOutlined } from "@ant-design/icons";

interface PlaceInfoProps {
  place: {
    name: string;
    address: string;
    priceRange: string;
    status: string;
    phone: string;
    email: string;
    amenities: Array<{ name: string; icon: string }>;
    categoryTags: string[];
  };
}

const PlaceInfo: React.FC<PlaceInfoProps> = ({ place }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {place.name}
        </h1>
        <p className="text-gray-600 mb-4">{place.address}</p>
        
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
            <EnvironmentOutlined />
            <span>Hiển thị bản đồ</span>
          </button>
          <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
            <MenuOutlined />
            <span>Xem menu</span>
          </button>
        </div>
      </div>

      {/* Price and Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-sm text-gray-600">Giá cả</p>
          <p className="text-lg font-semibold text-gray-900">{place.priceRange}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Trạng thái</p>
          <p className="text-lg font-semibold text-red-600">{place.status}</p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Thông tin liên hệ</h3>
        <div className="space-y-2">
          <p className="text-gray-700">
            <span className="font-medium">Điện thoại:</span> {place.phone}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Email:</span> {place.email}
          </p>
        </div>
      </div>

      {/* Category Tags */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Danh mục</h3>
        <div className="flex flex-wrap gap-2">
          {place.categoryTags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Tiện ích</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {place.amenities.map((amenity, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg"
            >
              <span className="text-lg">{amenity.icon}</span>
              <span className="text-sm text-gray-700">{amenity.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaceInfo; 