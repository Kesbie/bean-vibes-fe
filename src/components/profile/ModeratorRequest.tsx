'use client';

import React from 'react';
import { Card, Form, Input, Button, message, Alert } from 'antd';
import { UserOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { requestModerator } from '@/services/profile';

const { TextArea } = Input;

interface ModeratorRequestProps {
  onSuccess?: () => void;
}

const ModeratorRequest: React.FC<ModeratorRequestProps> = ({ onSuccess }) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const requestModeratorMutation = useMutation({
    mutationFn: requestModerator,
    onSuccess: () => {
      messageApi.success('Yêu cầu trở thành kiểm duyệt viên đã được gửi! Chúng tôi sẽ xem xét và phản hồi sớm nhất.');
      form.resetFields();
      onSuccess?.();
    },
    onError: (error: any) => {
      messageApi.error(error?.message || 'Có lỗi xảy ra khi gửi yêu cầu');
    },
  });

  const handleSubmit = async (values: any) => {
    try {
      await requestModeratorMutation.mutateAsync(values);
    } catch (error) {
      console.error('Error requesting moderator:', error);
    }
  };

  return (
    <Card title="Yêu cầu trở thành kiểm duyệt viên" className="mb-6">
      {contextHolder}
      <div className="space-y-4">
        <Alert
          message="Thông tin quan trọng"
          description="Kiểm duyệt viên có quyền quản lý nội dung, đánh giá và báo cáo trên hệ thống. Yêu cầu sẽ được xem xét cẩn thận."
          type="info"
          showIcon
          icon={<ExclamationCircleOutlined />}
        />

        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">Quyền lợi của kiểm duyệt viên:</h4>
          <ul className="text-blue-700 text-sm space-y-1">
            <li>• Quản lý và duyệt nội dung đánh giá</li>
            <li>• Xử lý báo cáo vi phạm</li>
            <li>• Đóng góp vào việc phát triển cộng đồng</li>
            <li>• Nhận thông báo về các vấn đề quan trọng</li>
          </ul>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Lý do muốn trở thành kiểm duyệt viên"
            name="reason"
            rules={[
              { required: true, message: 'Vui lòng nhập lý do!' },
              { min: 20, message: 'Lý do phải có ít nhất 20 ký tự!' },
              { max: 500, message: 'Lý do không được quá 500 ký tự!' },
            ]}
          >
            <TextArea
              rows={4}
              placeholder="Hãy chia sẻ lý do bạn muốn trở thành kiểm duyệt viên..."
              showCount
              maxLength={500}
            />
          </Form.Item>

          <Form.Item
            label="Kinh nghiệm liên quan (tùy chọn)"
            name="experience"
            rules={[
              { max: 300, message: 'Kinh nghiệm không được quá 300 ký tự!' },
            ]}
          >
            <TextArea
              rows={3}
              placeholder="Chia sẻ kinh nghiệm của bạn về quản lý cộng đồng, kiểm duyệt nội dung..."
              showCount
              maxLength={300}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={requestModeratorMutation.isPending}
              className="w-full"
              icon={<EditOutlined />}
            >
              Gửi yêu cầu
            </Button>
          </Form.Item>
        </Form>

        <div className="text-sm text-gray-600 space-y-2">
          <p><strong>Lưu ý:</strong></p>
          <ul className="list-disc list-inside space-y-1">
            <li>Yêu cầu sẽ được xem xét trong vòng 3-5 ngày làm việc</li>
            <li>Chúng tôi sẽ liên hệ qua email để thông báo kết quả</li>
            <li>Kiểm duyệt viên phải tuân thủ các quy định của cộng đồng</li>
            <li>Có thể rút lại quyền kiểm duyệt viên nếu vi phạm quy định</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default ModeratorRequest; 