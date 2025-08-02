'use client';

import React from 'react';
import { Card, Button, message, Result } from 'antd';
import { CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { verifyEmail } from '@/services/profile';
import { useSearchParams, useRouter } from 'next/navigation';

const VerifyEmailPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const verifyEmailMutation = useMutation({
    mutationFn: (token: string) => verifyEmail(token),
    onSuccess: () => {
      messageApi.success('Xác thực email thành công!');
      setTimeout(() => {
        router.push('/profile');
      }, 2000);
    },
    onError: (error: any) => {
      messageApi.error(error?.message || 'Có lỗi xảy ra khi xác thực email');
    },
  });

  const handleVerifyEmail = async () => {
    if (!token) {
      messageApi.error('Token không hợp lệ!');
      return;
    }

    try {
      await verifyEmailMutation.mutateAsync(token);
    } catch (error) {
      console.error('Error verifying email:', error);
    }
  };

  React.useEffect(() => {
    if (token) {
      handleVerifyEmail();
    }
  }, [token]);

  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <Result
            status="error"
            icon={<ExclamationCircleOutlined />}
            title="Token không hợp lệ"
            subTitle="Link xác thực email không hợp lệ hoặc đã hết hạn."
            extra={[
              <Button type="primary" key="login" onClick={() => router.push('/login')}>
                Quay lại trang đăng nhập
              </Button>,
            ]}
          />
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
      {contextHolder}
      <div className="w-full max-w-md">
        <Card>
          <Result
            status={verifyEmailMutation.isSuccess ? "success" : "info"}
            icon={verifyEmailMutation.isSuccess ? <CheckCircleOutlined /> : undefined}
            title={
              verifyEmailMutation.isSuccess 
                ? "Xác thực email thành công!" 
                : "Đang xác thực email..."
            }
            subTitle={
              verifyEmailMutation.isSuccess 
                ? "Tài khoản của bạn đã được xác thực thành công. Bạn sẽ được chuyển đến trang quản lý tài khoản."
                : "Vui lòng đợi trong khi chúng tôi xác thực email của bạn."
            }
            extra={
              verifyEmailMutation.isSuccess ? [
                <Button type="primary" key="profile" onClick={() => router.push('/profile')}>
                  Quản lý tài khoản
                </Button>,
              ] : undefined
            }
          />
        </Card>
      </div>
    </div>
  );
};

export default VerifyEmailPage; 