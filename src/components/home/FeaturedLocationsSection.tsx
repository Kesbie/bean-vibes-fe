'use client';

import React from "react";
import { StarFilled, StarOutlined } from "@ant-design/icons";

const FeaturedLocationsSection: React.FC = () => {
  const cafes = [
    {
      id: 1,
      name: "EEBakery Coffee",
      address: "2 Đình Liệt, Hoàn Kiếm",
      price: "30.000₫ - 60.000₫",
      hours: "Đang mở cửa - 07:00 - 23:00",
      rating: 4.5,
      reviews: 2,
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=300&h=200&fit=crop&crop=center",
      isHot: true
    },
    {
      id: 2,
      name: "Sunny Garden Coffee",
      address: "15 Nguyễn Du, Hai Bà Trưng",
      price: "25.000₫ - 55.000₫",
      hours: "Đang mở cửa - 08:00 - 22:00",
      rating: 4.2,
      reviews: 5,
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=300&h=200&fit=crop&crop=center",
      isHot: false
    },
    {
      id: 3,
      name: "The XX - Coffee Bar",
      address: "45 Trần Phú, Ba Đình",
      price: "35.000₫ - 70.000₫",
      hours: "Đang mở cửa - 06:00 - 24:00",
      rating: 4.8,
      reviews: 12,
      image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=300&h=200&fit=crop&crop=center",
      isHot: true
    },
    {
      id: 4,
      name: "Ban Công Cafe",
      address: "78 Lý Thường Kiệt, Đống Đa",
      price: "20.000₫ - 45.000₫",
      hours: "Đang mở cửa - 07:30 - 21:30",
      rating: 4.0,
      reviews: 0,
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=200&fit=crop&crop=center",
      isHot: false
    },
    {
      id: 5,
      name: "Joie Coffee",
      address: "123 Cầu Giấy, Cầu Giấy",
      price: "40.000₫ - 80.000₫",
      hours: "Đang mở cửa - 08:00 - 23:00",
      rating: 4.6,
      reviews: 8,
      image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=300&h=200&fit=crop&crop=center",
      isHot: false
    },
    {
      id: 6,
      name: "REFINED",
      address: "56 Kim Mã, Ba Đình",
      price: "50.000₫ - 100.000₫",
      hours: "Đang mở cửa - 09:00 - 22:00",
      rating: 4.7,
      reviews: 15,
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=200&fit=crop&crop=center",
      isHot: true
    },
    {
      id: 7,
      name: "CAFE KOEM",
      address: "89 Đội Cấn, Ba Đình",
      price: "30.000₫ - 65.000₫",
      hours: "Đang mở cửa - 07:00 - 22:30",
      rating: 4.3,
      reviews: 3,
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=300&h=200&fit=crop&crop=center",
      isHot: false
    },
    {
      id: 8,
      name: "Flamant Bistro",
      address: "234 Tây Sơn, Đống Đa",
      price: "45.000₫ - 90.000₫",
      hours: "Đang mở cửa - 08:30 - 23:30",
      rating: 4.9,
      reviews: 20,
      image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=300&h=200&fit=crop&crop=center",
      isHot: true
    }
  ];

  const renderStars = (rating: number) => {
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

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Địa điểm nổi bật
          </h2>
        </div>

        {/* Cafe Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cafes.map((cafe) => (
            <div
              key={cafe.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            >
              {/* Image with Hot Tag */}
              <div className="relative">
                <img
                  src={cafe.image}
                  alt={cafe.name}
                  className="w-full h-48 object-cover"
                />
                {cafe.isHot && (
                  <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
                    Hot
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Price */}
                <p className="text-sm text-gray-600 mb-2">{cafe.price}</p>
                
                {/* Name */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {cafe.name}
                </h3>
                
                {/* Address */}
                <p className="text-sm text-gray-600 mb-2">{cafe.address}</p>
                
                {/* Hours */}
                <p className="text-sm text-green-600 mb-3">{cafe.hours}</p>
                
                {/* Rating */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {renderStars(cafe.rating)}
                    <span className="text-sm text-gray-600 ml-1">
                      {cafe.reviews > 0 ? `${cafe.reviews} đánh giá` : 'chưa có đánh giá'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedLocationsSection; 