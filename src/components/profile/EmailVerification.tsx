'use client';

import React from 'react';
import { Card, Button, message, Alert } from 'antd';
import { MailOutlined, CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { sendVerificationEmail } from '@/services/profile';

interface EmailVerificationProps {
  isEmailVerified?: boolean;
  email?: string;
  onSuccess?: () => void;
}

const EmailVerification: React.FC<EmailVerificationProps> = ({ 
  isEmailVerified, 
  email, 
  onSuccess 
}) => {
  const [messageApi, contextHolder] = message.useMessage();

  const sendVerificationMutation = useMutation({
    mutationFn: sendVerificationEmail,
    onSuccess: () => {
      messageApi.success('Email xác thực đã được gửi! Vui lòng kiểm tra hộp thư của bạn.');
      onSuccess?.();
    },
    onError: (error: any) => {
      messageApi.error(error?.message || 'Có lỗi xảy ra khi gửi email xác thực');
    },
  });

  const handleSendVerification = async () => {
    try {
      await sendVerificationMutation.mutateAsync();
    } catch (error) {
      console.error('Error sending verification email:', error);
    }
  };

  if (isEmailVerified) {
    return (
      <Card title="Xác thực email" className="mb-6">
        {contextHolder}
        <div className="flex items-center space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg">
          <CheckCircleOutlined className="text-green-600 text-xl" />
          <div>
            <h4 className="font-medium text-green-800">Email đã được xác thực</h4>
            <p className="text-green-700 text-sm">
              Tài khoản của bạn đã được xác thực thành công.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card title="Xác thực email" className="mb-6">
      {contextHolder}
      <div className="space-y-4">
        <Alert
          message="Email chưa được xác thực"
          description="Vui lòng xác thực email để sử dụng đầy đủ tính năng của tài khoản."
          type="warning"
          showIcon
          icon={<ExclamationCircleOutlined />}
        />

        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">Hướng dẫn xác thực:</h4>
          <ol className="text-blue-700 text-sm space-y-1">
            <li>1. Nhấn nút "Gửi email xác thực" bên dưới</li>
            <li>2. Kiểm tra hộp thư và spam folder</li>
            <li>3. Click vào link trong email để xác thực</li>
            <li>4. Tài khoản sẽ được xác thực tự động</li>
          </ol>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="text-sm text-gray-600">Email hiện tại:</p>
            <p className="font-medium">{email}</p>
          </div>
          <Button
            type="primary"
            icon={<MailOutlined />}
            onClick={handleSendVerification}
            loading={sendVerificationMutation.isPending}
          >
            Gửi email xác thực
          </Button>
        </div>

        <div className="text-sm text-gray-600 space-y-2">
          <p><strong>Lưu ý:</strong></p>
          <ul className="list-disc list-inside space-y-1">
            <li>Email có thể bị gửi vào thư mục spam</li>
            <li>Link xác thực có thời hạn 24 giờ</li>
            <li>Nếu không nhận được email, vui lòng thử lại sau 5 phút</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default EmailVerification; 