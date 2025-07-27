'use client';

import React from "react";

const PurposeSection: React.FC = () => {
  const purposes = [
    {
      id: 1,
      title: "Chill",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop&crop=center",
      description: "Thư giãn và tận hưởng"
    },
    {
      id: 2,
      title: "Đọc Sách",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=300&fit=crop&crop=center",
      description: "Không gian yên tĩnh để đọc"
    },
    {
      id: 3,
      title: "Hẹn Hò",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=300&h=300&fit=crop&crop=center",
      description: "Lãng mạn và ấm cúng"
    },
    {
      id: 4,
      title: "Làm Việc",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&h=300&fit=crop&crop=center",
      description: "Không gian làm việc chuyên nghiệp"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Mục đích bạn cần ?
          </h2>
        </div>

        {/* Purpose Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {purposes.map((purpose) => (
            <div
              key={purpose.id}
              className="group cursor-pointer transform transition-transform hover:scale-105"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-square relative">
                  <img
                    src={purpose.image}
                    alt={purpose.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all"></div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {purpose.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {purpose.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center space-x-2">
          {[1, 2, 3, 4].map((dot) => (
            <div
              key={dot}
              className={`w-3 h-3 rounded-full ${
                dot === 1 ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PurposeSection; 