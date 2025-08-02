'use client';

import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { changePassword } from '@/services/profile';

interface ChangePasswordProps {
  onSuccess?: () => void;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ onSuccess }) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const changePasswordMutation = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      messageApi.success('Đổi mật khẩu thành công!');
      form.resetFields();
      onSuccess?.();
    },
    onError: (error: any) => {
      messageApi.error(error?.message || 'Có lỗi xảy ra khi đổi mật khẩu');
    },
  });

  const handleSubmit = async (values: any) => {
    try {
      await changePasswordMutation.mutateAsync({ password: values.newPassword });
    } catch (error) {
      console.error('Error changing password:', error);
    }
  };

  return (
    <div className="max-w-2xl">
      {contextHolder}
      <Card title="Đổi mật khẩu" className="mb-6">
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
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
            name="newPassword"
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
            dependencies={['newPassword']}
            rules={[
              { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
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
              loading={changePasswordMutation.isPending}
              className="w-full"
            >
              Đổi mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title="Bảo mật tài khoản" className="bg-gray-50">
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <h4 className="font-medium text-gray-900">Mật khẩu mạnh</h4>
              <p className="text-sm text-gray-600">
                Sử dụng mật khẩu có ít nhất 8 ký tự, bao gồm chữ cái, số và ký tự đặc biệt
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <h4 className="font-medium text-gray-900">Không chia sẻ mật khẩu</h4>
              <p className="text-sm text-gray-600">
                Không chia sẻ mật khẩu với bất kỳ ai, kể cả nhân viên hỗ trợ
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <h4 className="font-medium text-gray-900">Đổi mật khẩu định kỳ</h4>
              <p className="text-sm text-gray-600">
                Nên đổi mật khẩu ít nhất 3-6 tháng một lần để bảo mật tài khoản
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ChangePassword; 