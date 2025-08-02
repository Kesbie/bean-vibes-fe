"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Button, Card, Typography, Divider, Alert } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone
} from "@ant-design/icons";
import { useAuth } from "@/components/providers/AuthProvider";

const { Title, Text } = Typography;

export default function LoginPage() {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loginError, setLoginError] = React.useState<string | null>(null);

  const auth = useAuth();
  const { login, isLoginLoading } = auth;

  const onFinish = async (values: { email: string; password: string }) => {
    console.log('Login values:', values);
    setLoginError(null); // Clear previous errors
    
    try {
      const result = await login(values);
      console.log('Login result:', result);
      // Login success - AuthProvider will handle redirect
    } catch (error) {
      console.error("Login failed:", error);
      setLoginError("Email hoặc mật khẩu không đúng. Vui lòng thử lại.");
    }
  };

  const handleRegisterClick = () => {
    router.push("/signup");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0">
          <div className="text-center mb-8">
            <Title level={2} className="mb-2 text-gray-800">
              Welcome Back
            </Title>
            <Text type="secondary" className="text-base">
              Sign in to your account to continue
            </Text>
          </div>

          {loginError && (
            <Alert
              message="Đăng nhập thất bại"
              description={loginError}
              type="error"
              showIcon
              className="mb-6"
            />
          )}

          <Form
            form={form}
            name="login"
            onFinish={onFinish}
            layout="vertical"
            size="large"
            requiredMark={false}
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" }
              ]}
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="Enter your email"
                autoComplete="email"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please enter your password" },
                { min: 6, message: "Password must be at least 6 characters" }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Enter your password"
                autoComplete="current-password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            <Form.Item className="mb-6">
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoginLoading}
                className="w-full h-12 text-base font-medium"
                size="large"
              >
                {isLoginLoading ? "Signing In..." : "Sign In"}
              </Button>
            </Form.Item>
          </Form>

          <Divider className="my-6">
            <Text type="secondary">or</Text>
          </Divider>

          <div className="text-center">
            <Text type="secondary">Don&apos;t have an account? </Text>
            <Button
              type="link"
              onClick={handleRegisterClick}
              className="p-0 h-auto text-base font-medium"
            >
              Sign up here
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
