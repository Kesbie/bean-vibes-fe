'use client';

import { Card, Typography, Alert } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import ClientLayout from '@/components/shared/ClientLayout';
import QueryProvider from '@/components/providers/QueryProvider';
import PlaceForm from '@/components/places/PlaceForm';

const { Title, Paragraph } = Typography;

export default function ContributePlacePage() {
  const handleSuccess = () => {
    // Redirect to my places page after successful contribution
    window.location.href = '/my-places';
  };

  const handleCancel = () => {
    // Redirect back to home page
    window.location.href = '/';
  };

  return (
    <QueryProvider>
      <ClientLayout>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-6">
            <Title level={2} className="text-center mb-4">
              Đóng góp địa điểm mới
            </Title>
            <Paragraph className="text-center text-gray-600 mb-6">
              Chia sẻ địa điểm yêu thích của bạn với cộng đồng
            </Paragraph>
          </div>

          <Alert
            message="Hướng dẫn đóng góp"
            description={
              <div className="space-y-2">
                <p>• Vui lòng cung cấp thông tin chính xác và đầy đủ</p>
                <p>• Địa điểm sẽ được duyệt trong vòng 24-48 giờ</p>
                <p>• Bạn có thể theo dõi trạng thái duyệt trong mục "Địa điểm đã đóng góp"</p>
                <p>• Hình ảnh chất lượng cao sẽ giúp địa điểm được duyệt nhanh hơn</p>
              </div>
            }
            type="info"
            icon={<InfoCircleOutlined />}
            className="mb-6"
          />

          <Card>
            <PlaceForm
              onSuccess={handleSuccess}
              onCancel={handleCancel}
            />
          </Card>
        </div>
      </ClientLayout>
    </QueryProvider>
  );
} 