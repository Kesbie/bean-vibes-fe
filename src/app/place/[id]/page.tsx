'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Card, Descriptions, Tag, Button, Space, Image, Divider, Rate, Statistic, Row, Col, Spin, Empty } from 'antd';
import { PhoneOutlined, GlobalOutlined, EnvironmentOutlined, ClockCircleOutlined, StarOutlined, EyeOutlined } from '@ant-design/icons';
import { placeService } from '@/services';
import ClientLayout from '@/components/shared/ClientLayout';
import QueryProvider from '@/components/providers/QueryProvider';
import ReviewList from '@/components/reviews/ReviewList';

export default function PlaceDetailPage() {
  const params = useParams();
  const placeId = params.id as string;

  const { data: place, isLoading, error } = useQuery({
    queryKey: ['place', placeId],
    queryFn: () => placeService.getPublicPlace(placeId),
    enabled: !!placeId,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <QueryProvider>
        <ClientLayout>
          <div className="flex justify-center items-center min-h-screen">
            <Spin size="large" />
          </div>
        </ClientLayout>
      </QueryProvider>
    );
  }

  if (error || !place) {
    return (
      <QueryProvider>
        <ClientLayout>
          <div className="flex justify-center items-center min-h-screen">
            <Empty description="Không tìm thấy địa điểm" />
          </div>
        </ClientLayout>
      </QueryProvider>
    );
  }

  const placeData = place?.data || place;

  const formatOpeningHours = (openingHours: any) => {
    if (!openingHours) return 'Chưa có thông tin';
    
    const days = {
      monday: 'Thứ 2',
      tuesday: 'Thứ 3', 
      wednesday: 'Thứ 4',
      thursday: 'Thứ 5',
      friday: 'Thứ 6',
      saturday: 'Thứ 7',
      sunday: 'Chủ nhật'
    };

    return Object.entries(openingHours).map(([day, hours]: [string, any]) => {
      if (hours?.closed) {
        return `${days[day as keyof typeof days]}: Đóng cửa`;
      }
      if (hours?.open && hours?.close) {
        return `${days[day as keyof typeof days]}: ${hours.open} - ${hours.close}`;
      }
      return null;
    }).filter(Boolean).join(', ');
  };

  return (
    <QueryProvider>
      <ClientLayout>
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{placeData.name}</h1>
                         <div className="flex items-center gap-4 text-gray-600">
               <span>{placeData.address?.fullAddress || placeData.address}</span>
               {placeData.category && (
                 <Tag color="blue">{placeData.category.name}</Tag>
               )}
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Photos */}
              {placeData.photos && placeData.photos.length > 0 && (
                <Card className="mb-6">
                  <Image.PreviewGroup>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {placeData.photos.map((photo, index) => (
                        <Image
                          key={index}
                          src={photo}
                          alt={`${placeData.name} - Ảnh ${index + 1}`}
                          className="rounded-lg"
                          style={{ height: 200, objectFit: 'cover' }}
                        />
                      ))}
                    </div>
                  </Image.PreviewGroup>
                </Card>
              )}

              {/* Description */}
              <Card title="Mô tả" className="mb-6">
                <p className="text-gray-700 leading-relaxed">
                  {placeData.description}
                </p>
              </Card>

              {/* Contact Information */}
              <Card title="Thông tin liên hệ" className="mb-6">
                <Descriptions column={1}>
                  {(placeData.phone || placeData.website) && (
                    <>
                      {placeData.phone && (
                        <Descriptions.Item 
                          label={
                            <span className="flex items-center gap-2">
                              <PhoneOutlined />
                              Số điện thoại
                            </span>
                          }
                        >
                          <a href={`tel:${placeData.phone}`} className="text-blue-600 hover:text-blue-800">
                            {placeData.phone}
                          </a>
                        </Descriptions.Item>
                      )}
                      
                      {placeData.website && (
                        <Descriptions.Item 
                          label={
                            <span className="flex items-center gap-2">
                              <GlobalOutlined />
                              Website
                            </span>
                          }
                        >
                          <a 
                            href={placeData.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            {placeData.website}
                          </a>
                        </Descriptions.Item>
                      )}
                    </>
                  )}
                  
                                     <Descriptions.Item 
                     label={
                       <span className="flex items-center gap-2">
                         <EnvironmentOutlined />
                         Địa chỉ
                       </span>
                     }
                   >
                     {placeData.address?.fullAddress || placeData.address}
                   </Descriptions.Item>

                                     {placeData.address?.coordinates && (
                     <Descriptions.Item label="Tọa độ">
                       {placeData.address.coordinates.coordinates[0]}, {placeData.address.coordinates.coordinates[1]}
                     </Descriptions.Item>
                   )}
                </Descriptions>
              </Card>

                             {/* Opening Hours */}
               {placeData.openingHours && Object.keys(placeData.openingHours).length > 0 && (
                 <Card 
                   title={
                     <span className="flex items-center gap-2">
                       <ClockCircleOutlined />
                       Giờ mở cửa
                     </span>
                   }
                   className="mb-6"
                 >
                   <p className="text-gray-700">{formatOpeningHours(placeData.openingHours)}</p>
                 </Card>
               )}

               {/* Reviews Section */}
               <Card title="Đánh giá và bình luận" className="mb-6">
                 <ReviewList 
                   placeId={placeId} 
                   placeName={placeData.name} 
                 />
               </Card>
             </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Stats */}
              <Card className="mb-6">
                <Row gutter={16}>
                  <Col span={12}>
                                         <Statistic
                       title="Đánh giá"
                       value={placeData.averageRating || 0}
                       precision={1}
                       prefix={<StarOutlined />}
                       suffix="⭐"
                     />
                  </Col>
                  <Col span={12}>
                    <Statistic
                      title="Lượt đánh giá"
                      value={placeData.totalRatings || 0}
                      prefix={<EyeOutlined />}
                    />
                  </Col>
                </Row>
                
                                 {placeData.averageRating && (
                   <div className="mt-4">
                     <Rate disabled defaultValue={placeData.averageRating} allowHalf />
                     <span className="ml-2 text-gray-600">
                       {placeData.averageRating.toFixed(1)} / 5
                     </span>
                   </div>
                 )}
              </Card>

              {/* Status */}
              <Card title="Trạng thái" className="mb-6">
                <Space direction="vertical" className="w-full">
                  <div className="flex justify-between items-center">
                    <span>Trạng thái:</span>
                    <Tag color={placeData.status === 'active' ? 'green' : 'red'}>
                      {placeData.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                    </Tag>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Duyệt:</span>
                    <Tag color={placeData.isApproved ? 'green' : 'orange'}>
                      {placeData.isApproved ? 'Đã duyệt' : 'Chờ duyệt'}
                    </Tag>
                  </div>
                  
                  {placeData.isVerified && (
                    <div className="flex justify-between items-center">
                      <span>Xác thực:</span>
                      <Tag color="blue">Đã xác thực</Tag>
                    </div>
                  )}
                </Space>
              </Card>

              {/* Actions */}
              <Card title="Thao tác">
                <Space direction="vertical" className="w-full">
                                     <Button 
                     type="primary" 
                     block
                     onClick={() => {
                       const coords = placeData.address?.coordinates?.coordinates;
                       if (coords) {
                         window.open(`https://maps.google.com/?q=${coords[1]},${coords[0]}`, '_blank');
                       }
                     }}
                     disabled={!placeData.address?.coordinates}
                   >
                     Xem trên bản đồ
                   </Button>
                  
                  {placeData.phone && (
                    <Button 
                      block
                      icon={<PhoneOutlined />}
                      onClick={() => window.open(`tel:${placeData.phone}`, '_blank')}
                    >
                      Gọi điện
                    </Button>
                  )}
                  
                  {placeData.website && (
                    <Button 
                      block
                      icon={<GlobalOutlined />}
                      onClick={() => window.open(placeData.website, '_blank')}
                    >
                      Truy cập website
                    </Button>
                  )}
                </Space>
              </Card>
            </div>
          </div>
        </div>
      </ClientLayout>
    </QueryProvider>
  );
} 