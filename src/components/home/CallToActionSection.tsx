'use client';

import React from "react";

const CallToActionSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Illustration */}
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <div className="relative">
              {/* Map-like illustration */}
              <div className="w-full h-64 bg-gradient-to-br from-red-100 to-orange-100 rounded-lg relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-8 left-8 w-16 h-16 bg-red-300 rounded-full opacity-60"></div>
                <div className="absolute top-16 right-12 w-12 h-12 bg-orange-300 rounded-full opacity-60"></div>
                <div className="absolute bottom-12 left-16 w-10 h-10 bg-yellow-300 rounded-full opacity-60"></div>
                <div className="absolute bottom-8 right-8 w-14 h-14 bg-red-400 rounded-full opacity-60"></div>
                
                {/* Connection lines */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 256">
                  <line x1="80" y1="64" x2="320" y2="96" stroke="#ef4444" strokeWidth="2" opacity="0.3"/>
                  <line x1="320" y1="96" x2="160" y2="160" stroke="#ef4444" strokeWidth="2" opacity="0.3"/>
                  <line x1="160" y1="160" x2="80" y2="64" stroke="#ef4444" strokeWidth="2" opacity="0.3"/>
                  <line x1="160" y1="160" x2="320" y2="200" stroke="#ef4444" strokeWidth="2" opacity="0.3"/>
                </svg>
                
                {/* Location pins */}
                <div className="absolute top-8 left-8 w-4 h-4 bg-red-600 rounded-full"></div>
                <div className="absolute top-16 right-12 w-4 h-4 bg-red-600 rounded-full"></div>
                <div className="absolute bottom-12 left-16 w-4 h-4 bg-red-600 rounded-full"></div>
                <div className="absolute bottom-8 right-8 w-4 h-4 bg-red-600 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:w-1/2 lg:pl-12 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Chúng tôi có đang bỏ lỡ địa điểm nào bạn biết?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Hãy đóng góp những địa điểm cafe tuyệt vời mà bạn đã khám phá để cộng đồng cùng thưởng thức.
            </p>
            <button className="bg-red-600 text-white px-8 py-4 rounded-lg hover:bg-red-700 transition-colors text-lg font-semibold">
              Đóng góp địa điểm
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection; 