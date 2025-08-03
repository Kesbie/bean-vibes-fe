'use client';

import React, { useState } from 'react';
import { Card, Form, Input, Rate, Button, Switch, message, Select, Spin, Empty } from 'antd';
import { SearchOutlined, StarOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { placeService, reviewService } from '@/services';
import ClientLayout from '@/components/shared/ClientLayout';
import QueryProvider from '@/components/providers/QueryProvider';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const { TextArea } = Input;
const { Option } = Select;

export default function WriteReviewPage() {
  const [form] = Form.useForm();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  console.log("hello")

  const { data: places, isLoading: searchingPlaces } = useQuery({
    queryKey: ['places', 'search', searchQuery],
    queryFn: () => placeService.getPublicPlaces({ 
      search: searchQuery, 
      limit: 10 
    }),
    enabled: searchQuery.length > 2,
  });

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const handlePlaceSelect = (placeId: string) => {
    const place = places?.results?.find((p: any) => p.id === placeId);
    setSelectedPlace(place);
    form.setFieldsValue({ placeId });
  };

  const handleSubmit = async (values: any) => {
    if (!selectedPlace) {
      message.error('Vui lòng chọn địa điểm');
      return;
    }

    try {
      setLoading(true);
      await reviewService.createReview({
        content: values.content,
        rating: values.rating,
        placeId: selectedPlace.id,
        isAnonymous: values.isAnonymous || false
      });
      
      message.success('Đánh giá đã được đăng thành công!');
      router.push(`/place/${selectedPlace.id}`);
    } catch (error) {
      console.error('Error creating review:', error);
      message.error('Có lỗi xảy ra khi đăng đánh giá');
    } finally {
      setLoading(false);
    }
  };

  return (
    <QueryProvider>
      <ClientLayout>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Viết đánh giá</h1>
            <p className="text-gray-600">Chia sẻ trải nghiệm của bạn về địa điểm yêu thích</p>
          </div>

          <Card>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              initialValues={{
                rating: 5,
                isAnonymous: false
              }}
            >
              {/* Place Selection */}
              <Form.Item
                label="Chọn địa điểm"
                required
                help="Tìm kiếm và chọn địa điểm bạn muốn đánh giá"
              >
                <div className="space-y-4">
                  <Select
                    showSearch
                    placeholder="Tìm kiếm địa điểm..."
                    value={selectedPlace?.id}
                    onChange={handlePlaceSelect}
                    onSearch={handleSearch}
                    filterOption={false}
                    notFoundContent={
                      searchingPlaces ? (
                        <div className="text-center py-4">
                          <Spin size="small" />
                        </div>
                      ) : searchQuery.length > 2 ? (
                        <Empty description="Không tìm thấy địa điểm" />
                      ) : (
                        <div className="text-gray-500 text-center py-4">
                          Nhập ít nhất 3 ký tự để tìm kiếm
                        </div>
                      )
                    }
                    style={{ width: '100%' }}
                  >
                    {places?.results?.map((place: any) => (
                      <Option key={place.id} value={place.id}>
                        <div className="flex items-center gap-3">
                          <div className="flex-1">
                            <div className="font-medium">{place.name}</div>
                            <div className="text-sm text-gray-500">
                              {place.address?.fullAddress || place.address}
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <StarOutlined className="text-yellow-400" />
                            <span className="text-sm">{place.averageRating || 0}</span>
                          </div>
                        </div>
                      </Option>
                    ))}
                  </Select>

                  {selectedPlace && (
                    <Card size="small" className="bg-gray-50">
                      <div className="flex items-start gap-3">
                        {selectedPlace.photos?.[0] && (
                          <Image
                            src={selectedPlace.photos[0]}
                            alt={selectedPlace.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                        )}
                        <div className="flex-1">
                          <h3 className="font-semibold">{selectedPlace.name}</h3>
                          <p className="text-sm text-gray-600">
                            {selectedPlace.address?.fullAddress || selectedPlace.address}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Rate disabled defaultValue={selectedPlace.averageRating || 0} size="small" />
                            <span className="text-sm text-gray-500">
                              ({selectedPlace.totalRatings || 0} đánh giá)
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  )}
                </div>
              </Form.Item>

              {/* Rating */}
              <Form.Item
                label="Đánh giá của bạn"
                name="rating"
                rules={[{ required: true, message: 'Vui lòng chọn đánh giá' }]}
              >
                <Rate />
              </Form.Item>

              {/* Content */}
              <Form.Item
                label="Nội dung đánh giá"
                name="content"
                rules={[
                  { required: true, message: 'Vui lòng nhập nội dung đánh giá' },
                  { min: 10, message: 'Nội dung phải có ít nhất 10 ký tự' },
                  { max: 1000, message: 'Nội dung không được quá 1000 ký tự' }
                ]}
              >
                <TextArea
                  rows={6}
                  placeholder="Chia sẻ trải nghiệm của bạn về địa điểm này... (Tối thiểu 10 ký tự)"
                  showCount
                  maxLength={1000}
                />
              </Form.Item>

              {/* Anonymous */}
              <Form.Item
                label="Đăng ẩn danh"
                name="isAnonymous"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              {/* Submit */}
              <Form.Item>
                <div className="flex justify-end gap-3">
                  <Button onClick={() => router.back()}>
                    Hủy
                  </Button>
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    loading={loading}
                    disabled={!selectedPlace}
                  >
                    Đăng đánh giá
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </ClientLayout>
    </QueryProvider>
  );
} 