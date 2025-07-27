'use client';

import React from "react";
import { EditOutlined, UserOutlined } from "@ant-design/icons";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-red-600">Bean Vibes</h1>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-900 hover:text-red-600 transition-colors">
              Trang chủ
            </a>
            <a href="#" className="text-gray-900 hover:text-red-600 transition-colors">
              Khám phá
            </a>
            <a href="#" className="text-gray-900 hover:text-red-600 transition-colors">
              Khuyến mại
            </a>
            <a href="#" className="text-gray-900 hover:text-red-600 transition-colors">
              Giới thiệu
            </a>
            <a href="#" className="text-gray-900 hover:text-red-600 transition-colors">
              Liên hệ - Góp ý
            </a>
            <a href="#" className="text-gray-900 hover:text-red-600 transition-colors">
              Đóng góp địa điểm
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center space-x-2">
              <EditOutlined />
              <span>Viết review</span>
            </button>
            <div className="flex items-center space-x-2 text-gray-900">
              <UserOutlined />
              <span>hieuAdmin</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 