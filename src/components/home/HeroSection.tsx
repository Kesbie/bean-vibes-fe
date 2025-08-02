'use client';

import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const HeroSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <section className="relative bg-gradient-to-r from-orange-50 to-red-50 py-20">
      {/* Background Illustration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-100/30 to-red-100/30"></div>
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-red-200 rounded-full opacity-20"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-orange-200 rounded-full opacity-20"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-200 rounded-full opacity-20"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Tìm Góc Cafe - Thỏa Sức Sống Ảo
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Mang đến cho bạn những sự lựa chọn tốt nhất cho điểm hẹn cafe
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSearch} className="flex bg-white rounded-lg shadow-lg overflow-hidden">
              <input
                type="text"
                placeholder="Tìm kiếm cafe, địa điểm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-6 py-4 text-gray-900 placeholder-gray-500 focus:outline-none"
              />
              <button 
                type="submit"
                className="bg-red-600 text-white px-8 py-4 hover:bg-red-700 transition-colors flex items-center space-x-2"
              >
                <SearchOutlined />
                <span>Tìm kiếm</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 