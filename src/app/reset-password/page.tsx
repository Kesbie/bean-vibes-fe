'use client';

import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { resetPassword } from '@/services/profile';
import { useSearchParams, useRouter } from 'next/navigation';

const ResetPasswordPage = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const resetPasswordMutation = useMutation({
    mutationFn: ({ token, password }: { token: string; password: string }) =>
      resetPassword(token, password),
    onSuccess: () => {
      messageApi.success('Đặt lại mật khẩu thành công! Vui lòng đăng nhập lại.');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    },
    onError: (error: any) => {
      messageApi.error(error?.message || 'Có lỗi xảy ra khi đặt lại mật khẩu');
    },
  });

  const handleSubmit = async (values: any) => {
    if (!token) {
      messageApi.error('Token không hợp lệ!');
      return;
    }

    try {
      await resetPasswordMutation.mutateAsync({ token, password: values.password });
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Token không hợp lệ</h1>
            <p className="text-gray-600 mb-4">
              Link đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.
            </p>
            <Button type="primary" onClick={() => router.push('/login')}>
              Quay lại trang đăng nhập
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
      {contextHolder}
      <div className="w-full max-w-md">
        <Card title="Đặt lại mật khẩu" className="shadow-lg">
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="text-blue-800 font-medium mb-2">Lưu ý:</h4>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• Mật khẩu mới phải có ít nhất 8 ký tự</li>
              <li>• Mật khẩu phải chứa ít nhất 1 chữ cái và 1 số</li>
              <li>• Không sử dụng mật khẩu quá đơn giản</li>
            </ul>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
          >
            <Form.Item
              label="Mật khẩu mới"
              name="password"
              rules={[
                { required: true, message: 'Vui lòng nhập mật khẩu mới!' },
                { min: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự!' },
                {
                  pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                  message: 'Mật khẩu phải chứa ít nhất 1 chữ cái và 1 số!',
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Nhập mật khẩu mới"
                size="large"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>

            <Form.Item
              label="Xác nhận mật khẩu mới"
              name="confirmPassword"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Nhập lại mật khẩu mới"
                size="large"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={resetPasswordMutation.isPending}
                className="w-full"
              >
                Đặt lại mật khẩu
              </Button>
            </Form.Item>
          </Form>

          <div className="text-center mt-4">
            <Button type="link" onClick={() => router.push('/login')}>
              Quay lại trang đăng nhập
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ResetPasswordPage; 