'use client';

import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { forgotPassword } from '@/services/profile';

interface ForgotPasswordProps {
  onSuccess?: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onSuccess }) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const forgotPasswordMutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      messageApi.success('Email đặt lại mật khẩu đã được gửi! Vui lòng kiểm tra hộp thư của bạn.');
      form.resetFields();
      onSuccess?.();
    },
    onError: (error: any) => {
      messageApi.error(error?.message || 'Có lỗi xảy ra khi gửi email đặt lại mật khẩu');
    },
  });

  const handleSubmit = async (values: any) => {
    try {
      await forgotPasswordMutation.mutateAsync(values.email);
    } catch (error) {
      console.error('Error sending forgot password email:', error);
    }
  };

  return (
    <div className="max-w-2xl">
      {contextHolder}
      <Card title="Quên mật khẩu" className="mb-6">
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="text-blue-800 font-medium mb-2">Hướng dẫn:</h4>
          <ol className="text-blue-700 text-sm space-y-1">
            <li>1. Nhập email đăng ký tài khoản của bạn</li>
            <li>2. Hệ thống sẽ gửi link đặt lại mật khẩu vào email</li>
            <li>3. Kiểm tra hộp thư và spam folder</li>
            <li>4. Click vào link trong email để đặt lại mật khẩu</li>
          </ol>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Nhập email đăng ký tài khoản"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={forgotPasswordMutation.isPending}
              className="w-full"
            >
              Gửi email đặt lại mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title="Lưu ý quan trọng" className="bg-gray-50">
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <h4 className="font-medium text-gray-900">Kiểm tra spam folder</h4>
              <p className="text-sm text-gray-600">
                Email có thể bị gửi vào thư mục spam. Vui lòng kiểm tra cả hộp thư chính và spam folder.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <h4 className="font-medium text-gray-900">Link có thời hạn</h4>
              <p className="text-sm text-gray-600">
                Link đặt lại mật khẩu có thời hạn 24 giờ. Vui lòng sử dụng ngay khi nhận được.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <h4 className="font-medium text-gray-900">Bảo mật thông tin</h4>
              <p className="text-sm text-gray-600">
                Không chia sẻ link đặt lại mật khẩu với bất kỳ ai. Link chỉ dành cho bạn.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <h4 className="font-medium text-gray-900">Không nhận được email?</h4>
              <p className="text-sm text-gray-600">
                Nếu không nhận được email trong 5 phút, vui lòng kiểm tra lại email hoặc liên hệ hỗ trợ.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPassword; 