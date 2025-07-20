'use client';

import Link from 'next/link';
import { Button } from 'antd';
import { HomeOutlined, ArrowLeftOutlined } from '@ant-design/icons';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center px-6 py-12">
        {/* 404 Number */}
        <div className="text-9xl font-bold text-gray-300 mb-4">404</div>
        
        {/* Main Message */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Page Not Found
        </h1>
        
        {/* Description */}
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Sorry, the page you are looking for doesn&apos;t exist or has been moved.
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button 
              type="primary" 
              size="large"
              icon={<HomeOutlined />}
              className="flex items-center"
            >
              Go to Home
            </Button>
          </Link>
          
          <Button 
            size="large"
            icon={<ArrowLeftOutlined />}
            onClick={() => window.history.back()}
            className="flex items-center"
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
} 