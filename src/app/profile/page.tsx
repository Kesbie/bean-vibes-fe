'use client';

import React, { useState, useEffect } from 'react';
import { Card, Tabs, TabsProps, message, Spin } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, CheckCircleOutlined, UserAddOutlined, ShopOutlined } from '@ant-design/icons';
import ProfileInfo from '../../components/profile/ProfileInfo';
import ChangePassword from '../../components/profile/ChangePassword';
import ForgotPassword from '../../components/profile/ForgotPassword';
import EmailVerification from '../../components/profile/EmailVerification';
import ModeratorRequest from '../../components/profile/ModeratorRequest';
import MyPlacesTab from '../../components/profile/MyPlacesTab';
import { useAuth } from '../../components/providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { getProfile } from '@/services/profile';

const ProfilePage = () => {
  const { user } = useAuth();
  const [messageApi, contextHolder] = message.useMessage();

  const { data: profile, isLoading, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    enabled: !!user,
  });

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: (
        <span>
          <UserOutlined />
          Thông tin tài khoản
        </span>
      ),
      children: (
        <ProfileInfo 
          profile={profile?.data} 
          onSuccess={() => {
            messageApi.success('Cập nhật thông tin thành công!');
            refetch();
          }}
        />
      ),
    },
    {
      key: '2',
      label: (
        <span>
          <ShopOutlined />
          Địa điểm đã đóng góp
        </span>
      ),
      children: (
        <MyPlacesTab />
      ),
    },
    {
      key: '3',
      label: (
        <span>
          <CheckCircleOutlined />
          Xác thực email
        </span>
      ),
      children: (
        <EmailVerification 
          isEmailVerified={profile?.data?.isEmailVerified}
          email={profile?.data?.email}
          onSuccess={() => {
            messageApi.success('Email xác thực đã được gửi!');
            refetch();
          }}
        />
      ),
    },
    {
      key: '4',
      label: (
        <span>
          <LockOutlined />
          Đổi mật khẩu
        </span>
      ),
      children: (
        <ChangePassword 
          onSuccess={() => {
            messageApi.success('Đổi mật khẩu thành công!');
          }}
        />
      ),
    },
    {
      key: '5',
      label: (
        <span>
          <MailOutlined />
          Quên mật khẩu
        </span>
      ),
      children: (
        <ForgotPassword 
          onSuccess={() => {
            messageApi.success('Email đặt lại mật khẩu đã được gửi!');
          }}
        />
      ),
    },
    {
      key: '6',
      label: (
        <span>
          <UserAddOutlined />
          Yêu cầu kiểm duyệt viên
        </span>
      ),
      children: (
        <ModeratorRequest 
          onSuccess={() => {
            messageApi.success('Yêu cầu đã được gửi thành công!');
          }}
        />
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-8">
      {contextHolder}
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Quản lý tài khoản</h1>
          <p className="text-gray-600 mt-2">
            Quản lý thông tin cá nhân và bảo mật tài khoản của bạn
          </p>
        </div>
        
        <Card>
          <Tabs 
            defaultActiveKey="1" 
            items={items}
            className="profile-tabs"
          />
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage; 