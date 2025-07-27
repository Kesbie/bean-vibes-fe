'use client';

import React from "react";
import { StarFilled, StarOutlined, CloseOutlined, EnvironmentOutlined, ClockCircleOutlined, TagOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";

const SearchResults: React.FC = () => {

  const searchResults = [
    {
      id: 1,
      name: "EEBakery Coffee",
      rating: 5,
      reviews: 2,
      price: "30.000₫ - 60.000₫",
      address: "8 Ngõ 24 Đào Tấn, Ba Đình",
      hours: "Đang mở cửa - 07:00 - 23:00",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=300&h=200&fit=crop&crop=center"
    },
    {
      id: 2,
      name: "Sunny Garden Coffee",
      rating: 5,
      reviews: 2,
      price: "35.000₫ - 45.000₫",
      address: "3 Võ Quý Huơn, Bắc Từ Liêm",
      hours: "Đang mở cửa - 08:00 - 22:00",
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=300&h=200&fit=crop&crop=center"
    },
    {
      id: 3,
      name: "The XX - Coffee Bar",
      rating: 5,
      reviews: 1,
      price: "40.000₫ - 120.000₫",
      address: "136 Hồ Tùng Mậu (332 Hoàng Công Chất), Bắc Từ Liêm",
      hours: "Đang mở cửa - 07:00 - 23:00",
      image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=300&h=200&fit=crop&crop=center"
    },
    {
      id: 4,
      name: "Ban Công Cafe",
      rating: 4.9,
      reviews: 3,
      price: "50.000₫ - 75.000₫",
      address: "2 Đình Liệt, Hoàn Kiếm",
      hours: "Đang mở cửa - 07:00 - 23:00",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=200&fit=crop&crop=center"
    },
    {
      id: 5,
      name: "Joie Coffee",
      rating: 5,
      reviews: 1,
      price: "25.000₫ - 55.000₫",
      address: "116 C3 Hoàng Ngọc Phách, Đống Đa",
      hours: "Đang mở cửa - 07:30 - 21:30",
      image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=300&h=200&fit=crop&crop=center"
    },
    {
      id: 6,
      name: "REFINED",
      rating: undefined,
      reviews: 0,
      price: "58.000₫ - 108.000₫",
      address: "11 NGÔ TẤT TỐ, ĐỐNG ĐA",
      hours: "Đang mở cửa - 08:00 - 22:00",
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=200&fit=crop&crop=center"
    },
    {
      id: 7,
      name: "CAFE KOEM",
      rating: undefined,
      reviews: 0,
      price: "30.000₫ - 80.000₫",
      address: "70 Trần Quang Diệu, Đống Đa 10000",
      hours: "Đang mở cửa - 07:00 - 23:00",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=300&h=200&fit=crop&crop=center"
    },
    {
      id: 8,
      name: "Flamant Bistro",
      rating: undefined,
      reviews: 0,
      price: "75.000₫ - 200.000₫",
      address: "100A Xuân Diệu, Quảng An, Tây Hồ",
      hours: "Đang mở cửa - 09:00 - 23:59",
      image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=300&h=200&fit=crop&crop=center"
    },
    {
      id: 9,
      name: "2 Friday",
      rating: undefined,
      reviews: 0,
      price: "29.000₫ - 45.000₫",
      address: "177 Lê Lai-Hà Đông",
      hours: "Đang mở cửa - 07:30 - 22:30",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=200&fit=crop&crop=center"
    },
    {
      id: 10,
      name: "The Shelter cafe & pub",
      rating: undefined,
      reviews: 0,
      price: "30.000₫ - 50.000₫",
      address: "Tầng 7 Số 277 Quan Hoa, Cầu Giấy",
      hours: "Đang mở cửa - 14:00 - 23:59",
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=300&h=200&fit=crop&crop=center"
    }
  ];

  const renderStars = (rating: number | undefined) => {
    if (rating === undefined) return null;
    
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <StarFilled key={i} className="text-red-500 text-sm" />
        ) : (
          <StarOutlined key={i} className="text-gray-300 text-sm" />
        )
      );
    }
    return stars;
  };

  const renderRating = (rating: number | undefined, reviews: number) => {
    if (rating === undefined) {
      return <span className="text-gray-500">undefined - chưa có đánh giá</span>;
    }
    return (
      <span className="text-gray-700">
        {rating} - {reviews} đánh giá
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold text-gray-900">
            100 Địa điểm khớp với tìm kiếm của bạn:
          </h2>
          <div className="flex items-center space-x-2 bg-red-100 text-red-700 px-3 py-1 rounded-full">
            <span>Quận Ba Đình</span>
            <button className="ml-1 hover:text-red-800">
              <CloseOutlined className="text-xs" />
            </button>
          </div>
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-4">
        {searchResults.map((cafe) => (
          <div
            key={cafe.id}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="flex space-x-4">
              {/* Image */}
              <div className="flex-shrink-0">
                <img
                  src={cafe.image}
                  alt={cafe.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {cafe.name}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center space-x-2 mb-2">
                  {renderStars(cafe.rating)}
                  <span className="text-sm text-gray-600">
                    {renderRating(cafe.rating, cafe.reviews)}
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-2 mb-2">
                  <TagOutlined className="text-gray-500" />
                  <span className="text-sm text-gray-700">{cafe.price}</span>
                </div>

                {/* Address */}
                <div className="flex items-center space-x-2 mb-2">
                  <EnvironmentOutlined className="text-gray-500" />
                  <span className="text-sm text-gray-700">{cafe.address}</span>
                </div>

                {/* Hours */}
                <div className="flex items-center space-x-2">
                  <ClockCircleOutlined className="text-gray-500" />
                  <span className="text-sm text-green-600">{cafe.hours}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <LeftOutlined />
          </button>
          
          <div className="flex items-center space-x-1">
            <button className="w-8 h-8 bg-red-600 text-white rounded-lg text-sm font-semibold">
              1
            </button>
            <button className="w-8 h-8 hover:bg-gray-100 rounded-lg text-sm">2</button>
            <button className="w-8 h-8 hover:bg-gray-100 rounded-lg text-sm">3</button>
            <button className="w-8 h-8 hover:bg-gray-100 rounded-lg text-sm">4</button>
            <button className="w-8 h-8 hover:bg-gray-100 rounded-lg text-sm">5</button>
            <span className="text-gray-500">...</span>
            <button className="w-8 h-8 hover:bg-gray-100 rounded-lg text-sm">11</button>
          </div>
          
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <RightOutlined />
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm">
            <option>10/page</option>
            <option>20/page</option>
            <option>50/page</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchResults; 