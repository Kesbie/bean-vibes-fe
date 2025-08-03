"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  EditOutlined,
  UserOutlined,
  LoginOutlined,
  LogoutOutlined,
  MenuOutlined,
  CloseOutlined,
  ShopOutlined,
  PlusOutlined
} from "@ant-design/icons";
import { useAuth } from "@/components/providers/AuthProvider";
import { Button, Dropdown, Avatar, Typography } from "antd";

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleContributePlace = () => {
    if (isAuthenticated) {
      router.push("/add-place");
    } else {
      router.push("/login");
    }
  };

  const userMenuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Quản lý tài khoản",
      onClick: () => router.push("/profile")
    },
    {
      key: "my-places",
      icon: <ShopOutlined />,
      label: "Địa điểm đã đóng góp",
      onClick: () => router.push("/my-places")
    },
    {
      type: "divider" as const
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Đăng xuất",
      onClick: handleLogout
    }
  ];

  const adminMenuItems = [
    {
      key: "admin",
      icon: <UserOutlined />,
      label: "Quản lý",
      onClick: () => router.push("/admin")
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: handleLogout
    }
  ];

  const navigationLinks = [
    { href: "/explore", label: "Khám phá" },
    { href: "/add-place", label: "Đóng góp địa điểm" }
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-bold text-red-600 hover:text-red-700 transition-colors"
            >
              Bean Vibes
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex space-x-8 ml-10 mr-auto">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg font-semibold text-gray-900 hover:text-red-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {/* Write Review Button */}
            <Button
              type="primary"
              icon={<EditOutlined />}
              className="bg-red-600 border-red-600 hover:bg-red-700 hover:border-red-700"
              onClick={() => {
                if (isAuthenticated) {
                  router.push("/new-review");
                } else {
                  router.push("/login");
                }
              }}
            >
              Viết review
            </Button>

            {/* User Section */}
            {isAuthenticated ? (
              <Dropdown
                menu={{
                  items: user?.role !== "user" ? adminMenuItems : userMenuItems
                }}
                placement="bottomRight"
                arrow
              >
                <div className="flex items-center space-x-2 text-gray-900 cursor-pointer hover:text-red-600 transition-colors">
                  <Avatar
                    icon={<UserOutlined />}
                    style={{ backgroundColor: "#1890ff" }}
                  />
                  <span className="hidden sm:inline">
                    {user?.name || "User"}
                  </span>
                </div>
              </Dropdown>
            ) : (
              <Button
                icon={<LoginOutlined />}
                onClick={() => router.push("/login")}
              >
                <span className="hidden sm:inline">Đăng nhập</span>
              </Button>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md text-gray-900 hover:text-red-600 hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-900 hover:text-red-600 transition-colors px-4 py-2 rounded-md hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
