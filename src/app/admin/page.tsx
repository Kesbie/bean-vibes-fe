'use client';

import React from 'react';
import { Card, Row, Col, Statistic, Typography, Space } from 'antd';
import { 
  UserOutlined, 
  ShoppingCartOutlined, 
  DollarOutlined, 
  RiseOutlined 
} from '@ant-design/icons';
import { useAuth } from '@/components/providers/AuthProvider';

const { Title } = Typography;

export default function Admin() {
  const { user } = useAuth();

  return (
    <div>
      <Title level={2}>Dashboard</Title>
      <p style={{ color: '#666', marginBottom: 24 }}>
        Welcome back, {user?.email || 'Admin'}! Here&apos;s what&apos;s happening today.
      </p>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Users"
              value={1128}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Orders"
              value={93}
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Revenue"
              value={11280}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Growth"
              value={11.28}
              prefix={<RiseOutlined />}
              suffix="%"
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={12}>
          <Card title="Recent Activity" style={{ height: 400 }}>
            <p>Recent activity content will go here...</p>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Quick Actions" style={{ height: 400 }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <p>Quick action buttons will go here...</p>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
}