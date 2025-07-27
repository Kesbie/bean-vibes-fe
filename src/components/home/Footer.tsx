'use client';

import React from "react";
import { FacebookOutlined, MailOutlined, PinterestOutlined, ArrowUpOutlined } from "@ant-design/icons";

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-red-500 mb-4">Bean Vibes</h3>
            <p className="text-gray-300 mb-4">
              Khám phá những góc cafe tuyệt vời nhất tại Việt Nam. 
              Chia sẻ trải nghiệm và tìm kiếm địa điểm lý tưởng cho mọi nhu cầu.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-red-500 transition-colors">
                <FacebookOutlined className="text-xl" />
              </a>
              <a href="#" className="text-gray-300 hover:text-red-500 transition-colors">
                <MailOutlined className="text-xl" />
              </a>
              <a href="#" className="text-gray-300 hover:text-red-500 transition-colors">
                <PinterestOutlined className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liên kết nhanh</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-red-500 transition-colors">
                  Giới thiệu
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-red-500 transition-colors">
                  Giải đáp thắc mắc
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-red-500 transition-colors">
                  Liên hệ, góp ý
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-red-500 transition-colors">
                  Điều khoản sử dụng
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Thông tin liên hệ</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Email: info@beanvibes.com</li>
              <li>Điện thoại: +84 123 456 789</li>
              <li>Địa chỉ: Hà Nội, Việt Nam</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © 2024 Bean Vibes | All Rights Reserved.
          </p>
          
          {/* Scroll to Top Button */}
          <button
            onClick={scrollToTop}
            className="mt-4 md:mt-0 w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"
          >
            <ArrowUpOutlined className="text-white" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 