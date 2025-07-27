'use client';

import React from "react";
import { StarFilled, StarOutlined } from "@ant-design/icons";

interface SuggestedPlacesProps {
  currentPlaceId?: string;
}

const SuggestedPlaces: React.FC<SuggestedPlacesProps> = () => {
  const suggestedPlaces = [
    {
      id: 1,
      name: "Paleta Cafe - Láng Hạ",
      address: "123 Láng Hạ, Đống Đa",
      price: "10.000₫ - 100.000₫",
      hours: "Đang mở cửa - 07:00 - 23:00",
      rating: 4.5,
      reviews: 8,
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=300&h=200&fit=crop&crop=center",
      isHot: true
    },
    {
      id: 2,
      name: "RGB Coffee",
      address: "456 Nguyễn Du, Hai Bà Trưng",
      price: "15.000₫ - 80.000₫",
      hours: "Đang mở cửa - 08:00 - 22:00",
      rating: 4.2,
      reviews: 12,
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=200&fit=crop&crop=center",
      isHot: false
    },
    {
      id: 3,
      name: "Timeline Coffee - Hoàn Kiếm",
      address: "7 Đình Liệt, Hàng Đào, Hoàn Kiếm",
      price: "10.000₫ - 50.000₫",
      hours: "Đang đóng cửa - 07:00 - 23:00",
      rating: 5.0,
      reviews: 5,
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=300&h=200&fit=crop&crop=center",
      isHot: true
    }
  ];

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <StarFilled key={i} className="text-red-500 text-xs" />
        ) : (
          <StarOutlined key={i} className="text-gray-300 text-xs" />
        )
      );
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Địa điểm gợi ý</h3>
      
      <div className="space-y-4">
        {suggestedPlaces.map((place) => (
          <div
            key={place.id}
            className="flex space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            {/* Image */}
            <div className="flex-shrink-0 relative">
              <img
                src={place.image}
                alt={place.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              {place.isHot && (
                <div className="absolute top-1 left-1 bg-red-600 text-white px-1 py-0.5 rounded text-xs">
                  Hot
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-600 mb-1">{place.price}</p>
              <h4 className="font-semibold text-gray-900 text-sm mb-1 truncate">
                {place.name}
              </h4>
              <p className="text-xs text-gray-600 mb-1 truncate">{place.address}</p>
              <p className="text-xs text-green-600 mb-2">{place.hours}</p>
              
              {/* Rating */}
              <div className="flex items-center space-x-1">
                {renderStars(place.rating)}
                <span className="text-xs text-gray-600 ml-1">
                  {place.reviews} đánh giá
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedPlaces; 