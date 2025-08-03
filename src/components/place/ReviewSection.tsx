'use client';

import React from "react";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";

interface ReviewSectionProps {
  placeId?: string;
}

const ReviewSection: React.FC<ReviewSectionProps> = () => {
  const reviews = [
    {
      id: 1,
      userName: "Tuan Nguyen Minh",
      date: "09-11-2022",
      comment: "Quán cafe cực chill",
      likes: 0,
      isLiked: false
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Đánh giá ({reviews.length})</h3>
      
      {/* Call to Action */}
      <div className="bg-gradient-to-r from-pink-50 to-red-50 rounded-lg p-6 mb-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-red-400 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl">💻</span>
            </div>
          </div>
          <div className="flex-1">
            <p className="text-gray-700 mb-4">
              Bạn đã từng đến đây? Chia sẻ trải nghiệm và cảm nhận của bản thân cho mọi người cùng biết ❤️ 
              Những review chất lượng sẽ được xuất hiện ở bảng tin đây!
            </p>
            <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold">
              Viết đánh giá
            </button>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-semibold text-gray-900">{review.userName}</h4>
                <p className="text-sm text-gray-500">{review.date}</p>
              </div>
            </div>
            <p className="text-gray-700 mb-3">{review.comment}</p>
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors">
                {review.isLiked ? (
                  <HeartFilled className="text-red-500" />
                ) : (
                  <HeartOutlined />
                )}
                <span className="text-sm">{review.likes} Thích</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection; 