"use client";

import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const HeroSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <section
      className="relative h-[500px] bg-cover bg-center py-20"
      style={{
        background:
          "linear-gradient(rgba(0,0,0,.8),rgba(0,0,0,.6)),url(https://ik.imagekit.io/reviewcafe/3511_zApiGKUaCd.jpg?tr=w-1800%2Cq-50) no-repeat"
      }}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Tìm Góc Cafe - Thỏa Sức Sống Ảo
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-white mb-12 max-w-3xl mx-auto">
            Mang đến cho bạn những sự lựa chọn tốt nhất cho điểm hẹn cafe
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <form
              onSubmit={handleSearch}
              className="flex bg-white rounded-lg shadow-lg overflow-hidden"
            >
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
