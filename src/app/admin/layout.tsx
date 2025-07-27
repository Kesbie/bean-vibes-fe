'use client'

import React, { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown, Button, theme } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  BellOutlined,
  TeamOutlined,
  FileTextOutlined,
  BarChartOutlined,
  ShopOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { useAuth } from '@/components/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { ROLES } from '@/constants';

const { Header, Sider, Content } = Layout;

export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout, isLoading } = useAuth();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
      onClick: () => router.push('/admin/profile'),
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
      onClick: () => router.push('/admin/settings'),
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  const menuItems = [
    {
      key: '/admin',
      icon: <DashboardOutlined />,
      label: 'Tổng quan',
    },
    {
      key: '/admin/users',
      icon: <TeamOutlined />,
      label: 'Tài khoản',
    },
    {
      key: '/admin/places',
      icon: <ShopOutlined />,
      label: 'Địa điểm',
    },
    {
      key: '/admin/reviews',
      icon: <EditOutlined />,
      label: 'Bài đánh giá',
    },
    {
      key: '/admin/reports',
      icon: <FileTextOutlined />,
      label: 'Báo cáo',
    },
    {
      key: '/admin/restricted-words',
      icon: <BarChartOutlined />,
      label: 'Từ khóa nhạy cảm',
    },
    {
      key: '/admin/categories',
      icon: <SettingOutlined />,
      label: 'Danh mục',
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        style={{
          background: colorBgContainer,
          boxShadow: '2px 0 8px 0 rgba(29,35,41,.05)',
        }}
      >
        <div className="demo-logo-vertical" style={{ 
          height: 64, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          borderBottom: '1px solid #f0f0f0'
        }}>
          <h2 style={{ 
            color: '#1890ff', 
            margin: 0, 
            fontSize: collapsed ? '16px' : '20px',
            fontWeight: 'bold'
          }}>
            {collapsed ? 'BV' : 'Bean Vibes'}
          </h2>
        </div>
        
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['/admin']}
          items={menuItems}
          onClick={({ key }) => router.push(key)}
          style={{ borderRight: 0 }}
        />
      </Sider>
      
      <Layout>
        <Header style={{ 
          padding: '0 24px', 
          background: colorBgContainer,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 1px 4px rgba(0,21,41,.08)'
        }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Button
              type="text"
              icon={<BellOutlined />}
              style={{ fontSize: '16px' }}
            />
            
            <Dropdown
              menu={{ items: userMenuItems }}
              placement="bottomRight"
              arrow
            >
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 8, 
                cursor: 'pointer',
                padding: '4px 8px',
                borderRadius: 6,
                transition: 'background-color 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f5f5f5';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              >
                <Avatar 
                  icon={<UserOutlined />} 
                  style={{ backgroundColor: '#1890ff' }}
                />
                {!collapsed && (
                  <span style={{ color: '#666' }}>
                    {user?.name || 'Admin User'}
                  </span>
                )}
              </div>
            </Dropdown>
          </div>
        </Header>
        
        <Content
          className=''
          style={{
            margin: 16,
            padding: 16,
            height: 'calc(100vh - 96px)', // Fixed height: viewport height minus header and margins
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
            overflow: 'hidden' // Enable scrolling when content exceeds the fixed height
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
