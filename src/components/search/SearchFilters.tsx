'use client';

import React, { useState } from "react";
import { DownOutlined, UpOutlined, EnvironmentOutlined } from "@ant-design/icons";

const SearchFilters: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState({
    area: true,
    purpose: true,
    cafeType: true,
    priceRange: true,
    amenities: true
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev]
    }));
  };

  const areas = [
    { name: "Quận Ba Đình", checked: true },
    { name: "Quận Bắc Từ Liêm", checked: false },
    { name: "Quận Cầu Giấy", checked: false },
    { name: "Quận Đống Đa", checked: false },
    { name: "Quận Hai Bà Trưng", checked: false },
    { name: "Quận Hà Đông", checked: false },
    { name: "Quận Hoàn Kiếm", checked: false }
  ];

  const purposes = [
    { name: "Chill", checked: false },
    { name: "Đọc Sách", checked: false },
    { name: "Hẹn Hò", checked: false },
    { name: "Làm Việc", checked: false },
    { name: "Sống Ảo", checked: false }
  ];

  const cafeTypes = [
    { name: "Cafe Acoustic", checked: false },
    { name: "Cafe Bình Dân", checked: false },
    { name: "Cafe Cổ Điển", checked: false },
    { name: "Cafe Lounge", checked: false },
    { name: "Cafe Ngoài Trời", checked: false },
    { name: "Cafe Sách", checked: false },
    { name: "Cafe Sống Trọn", checked: false }
  ];

  const amenities = [
    { name: "Bàn ngoài trời", checked: false },
    { name: "Bánh ngọt", checked: false },
    { name: "Chiếu bóng đá", checked: false },
    { name: "Chỗ chơi cho trẻ em", checked: false },
    { name: "Chỗ đậu ôtô", checked: false },
    { name: "Giao hàng", checked: false },
    { name: "Giữ xe máy", checked: false }
  ];

  return (
    <div className="space-y-6">
      {/* Map View */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="w-full h-32 bg-gray-200 rounded-lg mb-3 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100">
            <svg className="w-full h-full" viewBox="0 0 300 128">
              <defs>
                <pattern id="grid" width="15" height="15" patternUnits="userSpaceOnUse">
                  <path d="M 15 0 L 0 0 0 15" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        </div>
        <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2">
          <EnvironmentOutlined />
          <span>Xem bản đồ</span>
        </button>
      </div>

      {/* Area Filter */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <button
          onClick={() => toggleSection('area')}
          className="w-full flex items-center justify-between text-lg font-semibold text-gray-900 mb-3"
        >
          Khu vực
          {expandedSections.area ? <UpOutlined /> : <DownOutlined />}
        </button>
        {expandedSections.area && (
          <div className="space-y-2">
            {areas.map((area, index) => (
              <label key={index} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={area.checked}
                  className="rounded text-red-600 focus:ring-red-500"
                />
                <span className="text-gray-700">{area.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Purpose Filter */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <button
          onClick={() => toggleSection('purpose')}
          className="w-full flex items-center justify-between text-lg font-semibold text-gray-900 mb-3"
        >
          Mục đích
          {expandedSections.purpose ? <UpOutlined /> : <DownOutlined />}
        </button>
        {expandedSections.purpose && (
          <div className="space-y-2">
            {purposes.map((purpose, index) => (
              <label key={index} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={purpose.checked}
                  className="rounded text-red-600 focus:ring-red-500"
                />
                <span className="text-gray-700">{purpose.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Cafe Type Filter */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <button
          onClick={() => toggleSection('cafeType')}
          className="w-full flex items-center justify-between text-lg font-semibold text-gray-900 mb-3"
        >
          Kiểu quán
          {expandedSections.cafeType ? <UpOutlined /> : <DownOutlined />}
        </button>
        {expandedSections.cafeType && (
          <div className="space-y-2">
            {cafeTypes.map((type, index) => (
              <label key={index} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={type.checked}
                  className="rounded text-red-600 focus:ring-red-500"
                />
                <span className="text-gray-700">{type.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <button
          onClick={() => toggleSection('priceRange')}
          className="w-full flex items-center justify-between text-lg font-semibold text-gray-900 mb-3"
        >
          Khoảng giá
          {expandedSections.priceRange ? <UpOutlined /> : <DownOutlined />}
        </button>
        {expandedSections.priceRange && (
          <div className="space-y-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-red-500 h-2 rounded-full w-1/3"></div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>0</span>
              <span>3.000.000 VND</span>
            </div>
          </div>
        )}
      </div>

      {/* Amenities Filter */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <button
          onClick={() => toggleSection('amenities')}
          className="w-full flex items-center justify-between text-lg font-semibold text-gray-900 mb-3"
        >
          Tiện ích
          {expandedSections.amenities ? <UpOutlined /> : <DownOutlined />}
        </button>
        {expandedSections.amenities && (
          <div className="space-y-2">
            {amenities.map((amenity, index) => (
              <label key={index} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={amenity.checked}
                  className="rounded text-red-600 focus:ring-red-500"
                />
                <span className="text-gray-700">{amenity.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilters; 