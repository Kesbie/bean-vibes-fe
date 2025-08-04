'use client';

import React from "react";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import { useHomeData } from "@/hooks/useHomeData";
import { useRouter } from "next/navigation";
import { Spin, Empty } from "antd";
import { placeService } from "@/services";
import { useQuery } from "@tanstack/react-query";

const FeaturedLocationsSection: React.FC = () => {
  const router = useRouter();

  const { data: places, isLoading } = useQuery({
    queryKey: ["places"],
    queryFn: () => placeService.getTrendingPlaces({
      limit: 8,
    }).then((res) => res.data.results),
  });

  console.log("======",  places)

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

  const handlePlaceClick = (placeId: string) => {
    router.push(`/place/${placeId}`);
  };

  const formatPrice = (price: any) => {
    if (!price) return "Liên hệ";
    const min = price.min || 0;
    const max = price.max || 0;
    if (min === max) return `${min.toLocaleString()}₫`;
    return `${min.toLocaleString()}₫ - ${max.toLocaleString()}₫`;
  };

  const formatTime = (time: any) => {
    if (!time) return "Liên hệ";
    return `${time.open} - ${time.close}`;
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Địa điểm nổi bật
            </h2>
          </div>
          <div className="flex justify-center">
            <Spin size="large" />
          </div>
        </div>
      </section>
    );
  }

  if (places.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Địa điểm nổi bật
            </h2>
          </div>
          <div className="flex justify-center">
            <Empty description="Không thể tải dữ liệu" />
          </div>
        </div>
      </section>
    );
  }

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
        {places.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {places.map((place) => (
              <div
                key={place.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handlePlaceClick(place.id)}
              >
                {/* Image with Hot Tag */}
                <div className="relative">
                  <img
                    src={place.photos?.[0] || "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=300&h=200&fit=crop&crop=center"}
                    alt={place.name}
                    className="w-full h-48 object-cover"
                  />
                  {place.hotScore > 0 && (
                    <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
                      Hot
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  {/* Price */}
                  <p className="text-sm text-gray-600 mb-2">{formatPrice(place.price)}</p>
                  
                  {/* Name */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {place.name}
                  </h3>
                  
                  {/* Address */}
                  <p className="text-sm text-gray-600 mb-2">
                    {place.address?.fullAddress || "Địa chỉ đang cập nhật"}
                  </p>
                  
                  {/* Hours */}
                  <p className="text-sm text-green-600 mb-3">
                    {formatTime(place.time)}
                  </p>
                  
                  {/* Rating */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      {renderStars(place.averageRating || 0)}
                      <span className="text-sm text-gray-600 ml-1">
                        {place.totalRatings > 0 ? `${place.totalRatings} đánh giá` : 'chưa có đánh giá'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center">
            <Empty description="Chưa có địa điểm nổi bật" />
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedLocationsSection; 