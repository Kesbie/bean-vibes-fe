'use client';

import Link from 'next/link';
import { Button } from 'antd';
import { LockOutlined, HomeOutlined, LoginOutlined } from '@ant-design/icons';

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100">
      <div className="text-center px-6 py-12">
        {/* Icon */}
        <div className="text-8xl text-red-400 mb-6">
          <LockOutlined />
        </div>
        
        {/* Main Message */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Access Denied
        </h1>
        
        {/* Description */}
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          You don&apos;t have permission to access this page. Please log in with appropriate credentials.
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/login">
            <Button 
              type="primary" 
              size="large"
              icon={<LoginOutlined />}
              className="flex items-center"
            >
              Login
            </Button>
          </Link>
          
          <Link href="/">
            <Button 
              size="large"
              icon={<HomeOutlined />}
              className="flex items-center"
            >
              Go to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 