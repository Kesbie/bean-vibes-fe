'use client';

import React from "react";

const NearbyAreasSection: React.FC = () => {
  const areas = [
    {
      id: 1,
      name: "Quận Ba Đình",
      cafeCount: "50 quán cafe",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=300&fit=crop&crop=center"
    },
    {
      id: 2,
      name: "Quận Cầu Giấy",
      cafeCount: "50 quán cafe",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=300&fit=crop&crop=center"
    },
    {
      id: 3,
      name: "Quận Đống Đa",
      cafeCount: "50 quán cafe",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop&crop=center"
    },
    {
      id: 4,
      name: "Quận Hoàn Kiếm",
      cafeCount: "50 quán cafe",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop&crop=center"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Khu vực gần đây
          </h2>
        </div>

        {/* Area Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {areas.map((area) => (
            <div
              key={area.id}
              className="group cursor-pointer transform transition-transform hover:scale-105"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-square relative">
                  <img
                    src={area.image}
                    alt={area.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all"></div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {area.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {area.cafeCount}
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

export default NearbyAreasSection; 