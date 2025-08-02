'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, Input, Select, Button, Slider, Space, Row, Col, Divider, Tag, Checkbox } from 'antd';
import { SearchOutlined, FilterOutlined, ClearOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { placeService, categoryService } from '@/services';
import ClientLayout from '@/components/shared/ClientLayout';
import QueryProvider from '@/components/providers/QueryProvider';
import SearchResults from '@/components/search/SearchResults';

const { Search } = Input;
const { Option } = Select;

export default function AdvancedSearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [filters, setFilters] = useState({
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
  });

  // Fetch categories for filter
  const { data: categoriesData } = useQuery({
    queryKey: ['search-categories'],
    queryFn: () => categoryService.getPublicCategories({ limit: 50 }),
    staleTime: 10 * 60 * 1000,
  });

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Update URL params
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v !== '' && v !== null && v !== undefined) {
        params.set(k, String(v));
      }
    });
    
    router.push(`/search-advanced?${params.toString()}`);
  };

  const handleSearch = (value: string) => {
    handleFilterChange('search', value);
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      categoryId: '',
      district: '',
      ward: '',
      priceMin: '',
      priceMax: '',
      rating: '',
      isVerified: false,
      hasWifi: false,
      hasParking: false,
      sortBy: 'hotScore',
      sortOrder: 'desc',
    });
    router.push('/search-advanced');
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    value !== '' && value !== null && value !== undefined && value !== false
  );

  return (
    <QueryProvider>
      <ClientLayout>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Tìm kiếm nâng cao</h1>
            <p className="text-gray-600">Tìm kiếm địa điểm với nhiều tiêu chí khác nhau</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <Card 
                title={
                  <span className="flex items-center gap-2">
                    <FilterOutlined />
                    Bộ lọc
                  </span>
                }
                extra={
                  hasActiveFilters && (
                    <Button 
                      type="text" 
                      icon={<ClearOutlined />}
                      onClick={handleClearFilters}
                      size="small"
                    >
                      Xóa bộ lọc
                    </Button>
                  )
                }
              >
                <Space direction="vertical" className="w-full">
                  {/* Search */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tìm kiếm
                    </label>
                    <Search
                      placeholder="Tên địa điểm, mô tả..."
                      value={filters.search}
                      onChange={(e) => handleFilterChange('search', e.target.value)}
                      onSearch={handleSearch}
                      allowClear
                    />
                  </div>

                  <Divider />

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Danh mục
                    </label>
                    <Select
                      placeholder="Chọn danh mục"
                      value={filters.categoryId}
                      onChange={(value) => handleFilterChange('categoryId', value)}
                      allowClear
                      className="w-full"
                      showSearch
                      filterOption={(input, option) =>
                        (option?.children as unknown as string)?.toLowerCase().includes(input.toLowerCase())
                      }
                    >
                      {categoriesData?.data?.results?.map((category) => (
                        <Option key={category.id} value={category.id}>
                          {category.name}
                        </Option>
                      ))}
                    </Select>
                  </div>

                  <Divider />

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quận/Huyện
                    </label>
                    <Input
                      placeholder="Nhập quận/huyện"
                      value={filters.district}
                      onChange={(e) => handleFilterChange('district', e.target.value)}
                      allowClear
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phường/Xã
                    </label>
                    <Input
                      placeholder="Nhập phường/xã"
                      value={filters.ward}
                      onChange={(e) => handleFilterChange('ward', e.target.value)}
                      allowClear
                    />
                  </div>

                  <Divider />

                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Khoảng giá
                    </label>
                    <Row gutter={8}>
                      <Col span={12}>
                        <Input
                          placeholder="Từ"
                          value={filters.priceMin}
                          onChange={(e) => handleFilterChange('priceMin', e.target.value)}
                          type="number"
                        />
                      </Col>
                      <Col span={12}>
                        <Input
                          placeholder="Đến"
                          value={filters.priceMax}
                          onChange={(e) => handleFilterChange('priceMax', e.target.value)}
                          type="number"
                        />
                      </Col>
                    </Row>
                  </div>

                  <Divider />

                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Đánh giá tối thiểu
                    </label>
                    <Select
                      placeholder="Chọn đánh giá"
                      value={filters.rating}
                      onChange={(value) => handleFilterChange('rating', value)}
                      allowClear
                      className="w-full"
                    >
                      <Option value="4">4⭐ trở lên</Option>
                      <Option value="3">3⭐ trở lên</Option>
                      <Option value="2">2⭐ trở lên</Option>
                      <Option value="1">1⭐ trở lên</Option>
                    </Select>
                  </div>

                  <Divider />

                  {/* Features */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tính năng
                    </label>
                    <Space direction="vertical" className="w-full">
                      <Checkbox
                        checked={filters.isVerified}
                        onChange={(e) => handleFilterChange('isVerified', e.target.checked)}
                      >
                        Đã xác thực
                      </Checkbox>
                      <Checkbox
                        checked={filters.hasWifi}
                        onChange={(e) => handleFilterChange('hasWifi', e.target.checked)}
                      >
                        Có WiFi
                      </Checkbox>
                      <Checkbox
                        checked={filters.hasParking}
                        onChange={(e) => handleFilterChange('hasParking', e.target.checked)}
                      >
                        Có bãi đỗ xe
                      </Checkbox>
                    </Space>
                  </div>

                  <Divider />

                  {/* Sort */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sắp xếp theo
                    </label>
                    <Select
                      value={filters.sortBy}
                      onChange={(value) => handleFilterChange('sortBy', value)}
                      className="w-full mb-2"
                    >
                      <Option value="hotScore">Độ nổi bật</Option>
                      <Option value="rating">Đánh giá</Option>
                      <Option value="totalRatings">Số lượt đánh giá</Option>
                      <Option value="createdAt">Mới nhất</Option>
                    </Select>
                    <Select
                      value={filters.sortOrder}
                      onChange={(value) => handleFilterChange('sortOrder', value)}
                      className="w-full"
                    >
                      <Option value="desc">Giảm dần</Option>
                      <Option value="asc">Tăng dần</Option>
                    </Select>
                  </div>
                </Space>
              </Card>
            </div>

            {/* Results */}
            <div className="lg:col-span-3">
              <SearchResults />
            </div>
          </div>
        </div>
      </ClientLayout>
    </QueryProvider>
  );
} 