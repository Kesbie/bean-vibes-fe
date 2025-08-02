'use client';

import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, MailOutlined } from '@ant-design/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfile } from '@/services/profile';

interface ProfileInfoProps {
  profile?: App.Types.User.UserResponse;
  onSuccess?: () => void;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ profile, onSuccess }) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      messageApi.success('Cập nhật thông tin thành công!');
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      onSuccess?.();
    },
    onError: (error: any) => {
      messageApi.error(error?.message || 'Có lỗi xảy ra khi cập nhật thông tin');
    },
  });

  const handleSubmit = async (values: any) => {
    try {
      await updateProfileMutation.mutateAsync(values);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="max-w-2xl">
      {contextHolder}
      <Card title="Thông tin cá nhân" className="mb-6">
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            name: profile?.name || '',
            email: profile?.email || '',
          }}
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Họ và tên"
            name="name"
            rules={[
              { required: true, message: 'Vui lòng nhập họ và tên!' },
              { min: 2, message: 'Họ và tên phải có ít nhất 2 ký tự!' },
            ]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Nhập họ và tên"
              size="large"
            />
          </Form.Item>

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
              placeholder="Nhập email"
              size="large"
              disabled
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              size="large"
              loading={updateProfileMutation.isPending}
              className="w-full"
            >
              Cập nhật thông tin
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title="Thông tin tài khoản" className="bg-gray-50">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Trạng thái email:</span>
            <span className={`px-2 py-1 rounded-full text-sm ${
              profile?.isEmailVerified 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {profile?.isEmailVerified ? 'Đã xác thực' : 'Chưa xác thực'}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Vai trò:</span>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {profile?.role === 'admin' ? 'Quản trị viên' : 'Người dùng'}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Trạng thái tài khoản:</span>
            <span className={`px-2 py-1 rounded-full text-sm ${
              profile?.isBanned 
                ? 'bg-red-100 text-red-800' 
                : 'bg-green-100 text-green-800'
            }`}>
              {profile?.isBanned ? 'Đã bị cấm' : 'Hoạt động'}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfileInfo; 