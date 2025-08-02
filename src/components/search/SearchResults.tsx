'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, List, Tag, Rate, Button, Space, Pagination, Empty, Spin, message } from 'antd';
import { EyeOutlined, StarOutlined, EnvironmentOutlined, PhoneOutlined, GlobalOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { placeService } from '@/services';
import { useRouter } from 'next/navigation';

export default function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  // Get all search parameters
  const filters = {
    search: searchParams.get('q') || '',
    categoryId: searchParams.get('category') || '',
    district: searchParams.get('district') || '',
    ward: searchParams.get('ward') || '',
    priceMin: searchParams.get('priceMin') || '',
    priceMax: searchParams.get('priceMax') || '',
    rating: searchParams.get('rating') || '',
    isVerified: searchParams.get('isVerified') === 'true',
    hasWifi: searchParams.get('hasWifi') === 'true',
    hasParking: searchParams.get('hasParking') === 'true',
    sortBy: searchParams.get('sortBy') || 'hotScore',
    sortOrder: searchParams.get('sortOrder') || 'desc',
    page: currentPage,
    limit: pageSize
  };

  // Fetch search results
  const { data: searchResults, isLoading, error } = useQuery({
    queryKey: ['search-results', filters],
    queryFn: () => placeService.getPublicPlaces({
      limit: filters.limit,
      page: filters.page,
      ...(filters.search && { search: filters.search }),
      ...(filters.categoryId && { categoryId: filters.categoryId }),
      ...(filters.district && { district: filters.district }),
      ...(filters.ward && { ward: filters.ward }),
      ...(filters.priceMin && { priceMin: filters.priceMin }),
      ...(filters.priceMax && { priceMax: filters.priceMax }),
      ...(filters.rating && { rating: filters.rating }),
      ...(filters.isVerified && { isVerified: filters.isVerified }),
      ...(filters.hasWifi && { hasWifi: filters.hasWifi }),
      ...(filters.hasParking && { hasParking: filters.hasParking }),
      ...(filters.sortBy && { sortBy: filters.sortBy }),
      ...(filters.sortOrder && { sortOrder: filters.sortOrder })
    }),
    staleTime: 2 * 60 * 1000,
  });

  const handlePlaceClick = (placeId: string) => {
    router.push(`/place/${placeId}`);
  };

  const formatPrice = (price: number) => {
    if (!price) return 'Chưa có thông tin';
    return `${price.toLocaleString()} VNĐ`;
  };

  const formatTime = (time: string) => {
    if (!time) return 'Chưa có thông tin';
    return time;
  };

  const getActiveFilters = () => {
    const active: string[] = [];
    if (filters.search) active.push(`Tìm kiếm: "${filters.search}"`);
    if (filters.categoryId) active.push(`Danh mục: ${filters.categoryId}`);
    if (filters.district) active.push(`Quận: ${filters.district}`);
    if (filters.ward) active.push(`Phường: ${filters.ward}`);
    if (filters.rating) active.push(`Đánh giá: ${filters.rating}⭐ trở lên`);
    if (filters.isVerified) active.push('Đã xác thực');
    if (filters.hasWifi) active.push('Có WiFi');
    if (filters.hasParking) active.push('Có bãi đỗ xe');
    return active;
  };

  const clearFilters = () => {
    router.push('/search-advanced');
  };

  if (isLoading) {
    return (
      <Card>
        <div className="flex justify-center items-center py-12">
          <Spin size="large" />
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <Empty description="Có lỗi xảy ra khi tải dữ liệu" />
      </Card>
    );
  }

  const results = searchResults?.data?.results || [];
  const totalResults = searchResults?.data?.totalResults || 0;
  const totalPages = searchResults?.data?.totalPages || 0;
  const activeFilters = getActiveFilters();

  return (
    <Card>
      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-gray-700">Bộ lọc đang áp dụng:</span>
            <Button 
              type="text" 
              size="small" 
              onClick={clearFilters}
              className="text-red-600"
            >
              Xóa tất cả
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filter, index) => (
              <Tag key={index} color="blue" closable>
                {filter}
              </Tag>
            ))}
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-gray-600">
          Tìm thấy {totalResults} địa điểm
          {activeFilters.length > 0 && ` với ${activeFilters.length} bộ lọc`}
        </p>
      </div>

      {/* Results List */}
      {results.length > 0 ? (
        <>
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 2,
              lg: 3,
              xl: 3,
              xxl: 4,
            }}
            dataSource={results}
            renderItem={(place) => (
              <List.Item>
                <Card
                  hoverable
                  cover={
                    place.photos && place.photos.length > 0 ? (
                      <img
                        alt={place.name}
                        src={place.photos[0]}
                        className="h-48 object-cover"
                      />
                    ) : (
                      <div className="h-48 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">Không có ảnh</span>
                      </div>
                    )
                  }
                  actions={[
                    <Button
                      type="text"
                      icon={<EyeOutlined />}
                      onClick={() => handlePlaceClick(place.id)}
                    >
                      Xem chi tiết
                    </Button>
                  ]}
                >
                  <Card.Meta
                    title={
                      <div className="flex items-start justify-between">
                        <span className="font-medium text-lg line-clamp-2">
                          {place.name}
                        </span>
                        {place.isVerified && (
                          <Tag color="blue" size="small">Đã xác thực</Tag>
                        )}
                      </div>
                    }
                    description={
                      <div className="space-y-2">
                        <p className="text-gray-600 line-clamp-2">
                          {place.description}
                        </p>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <EnvironmentOutlined />
                          <span className="line-clamp-1">{place.address}</span>
                        </div>

                        {place.category && (
                          <Tag color="blue" size="small">
                            {place.category.name}
                          </Tag>
                        )}

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Rate disabled defaultValue={place.rating || 0} allowHalf size="small" />
                            <span className="text-sm text-gray-600">
                              {place.rating ? place.rating.toFixed(1) : 'Chưa có đánh giá'}
                            </span>
                          </div>
                          {place.totalRatings && (
                            <span className="text-sm text-gray-500">
                              ({place.totalRatings} đánh giá)
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          {place.phone && (
                            <span className="flex items-center gap-1">
                              <PhoneOutlined />
                              {place.phone}
                            </span>
                          )}
                          {place.website && (
                            <span className="flex items-center gap-1">
                              <GlobalOutlined />
                              Website
                            </span>
                          )}
                        </div>
                      </div>
                    }
                  />
                </Card>
              </List.Item>
            )}
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <Pagination
                current={currentPage}
                total={totalResults}
                pageSize={pageSize}
                onChange={(page, size) => {
                  setCurrentPage(page);
                  setPageSize(size);
                }}
                showSizeChanger
                showQuickJumper
                showTotal={(total, range) =>
                  `${range[0]}-${range[1]} của ${total} địa điểm`
                }
              />
            </div>
          )}
        </>
      ) : (
        <Empty 
          description="Không tìm thấy địa điểm nào phù hợp với tiêu chí tìm kiếm"
          className="py-12"
        />
      )}
    </Card>
  );
} 