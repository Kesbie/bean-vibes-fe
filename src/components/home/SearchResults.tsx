'use client';

import React from "react";
import { useHomeData } from "@/hooks/useHomeData";
import { useRouter } from "next/navigation";
import { Spin, Empty, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const SearchResults: React.FC = () => {
  const { 
    featuredPlaces, 
    isLoadingFeatured, 
    featuredError, 
    hasFilters, 
    totalResults,
    clearFilters 
  } = useHomeData();
  const router = useRouter();

  const handlePlaceClick = (placeId: string) => {
    router.push(`/place/${placeId}`);
  };

  const handleViewAll = () => {
    router.push('/search');
  };

  if (!hasFilters) return null;

  if (isLoadingFeatured) {
    return (
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <Spin size="large" />
          </div>
        </div>
      </section>
    );
  }

  if (featuredError) {
    return (
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <Empty description="Không thể tải dữ liệu" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              Kết quả tìm kiếm
            </h3>
            <p className="text-gray-600 mt-1">
              Tìm thấy {totalResults} kết quả
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={clearFilters}>
              Xóa bộ lọc
            </Button>
            <Button type="primary" icon={<SearchOutlined />} onClick={handleViewAll}>
              Xem tất cả
            </Button>
          </div>
        </div>

        {/* Results */}
        {featuredPlaces.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPlaces.map((place) => (
              <div
                key={place.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handlePlaceClick(place.id)}
              >
                {/* Image */}
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
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {place.name}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    {place.address?.fullAddress || "Địa chỉ đang cập nhật"}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {place.averageRating ? `${place.averageRating}/5` : 'Chưa có đánh giá'}
                    </span>
                    <span className="text-sm text-gray-600">
                      {place.totalRatings || 0} đánh giá
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Empty 
              description="Không tìm thấy kết quả phù hợp" 
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
            <Button 
              type="primary" 
              className="mt-4"
              onClick={clearFilters}
            >
              Xóa bộ lọc
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchResults; 