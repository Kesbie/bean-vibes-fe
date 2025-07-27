'use client';

import React from "react";

interface RatingSectionProps {
  rating: number;
  totalReviews: number;
}

const RatingSection: React.FC<RatingSectionProps> = ({ rating, totalReviews }) => {
  const ratingCategories = [
    { name: "Vị trí", rating: 5 },
    { name: "Không gian", rating: 5 },
    { name: "Đồ uống", rating: 5 },
    { name: "Phục vụ", rating: 5 },
    { name: "Giá cả", rating: 5 }
  ];

  const getRatingText = (rating: number) => {
    if (rating >= 4.5) return "Tuyệt vời";
    if (rating >= 4.0) return "Rất tốt";
    if (rating >= 3.5) return "Tốt";
    if (rating >= 3.0) return "Khá";
    return "Trung bình";
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Đánh giá</h3>
      
      <div className="flex flex-col md:flex-row items-start gap-8">
        {/* Overall Rating */}
        <div className="text-center">
          <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-white text-2xl font-bold">{rating}</span>
          </div>
          <p className="text-lg font-semibold text-gray-900 mb-1">
            {getRatingText(rating)}
          </p>
          <p className="text-gray-600">
            {rating}/5 ({totalReviews} đánh giá)
          </p>
        </div>

        {/* Detailed Ratings */}
        <div className="flex-1">
          <div className="space-y-3">
            {ratingCategories.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-700 min-w-[80px]">{category.name}</span>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-red-500 h-2 rounded-full"
                      style={{ width: `${(category.rating / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-gray-600 text-sm min-w-[30px] text-right">
                  {category.rating}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingSection; 