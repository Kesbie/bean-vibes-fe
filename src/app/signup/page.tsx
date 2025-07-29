"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Button, Card, Typography, Divider, Alert } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone
} from "@ant-design/icons";
import { authService } from "@/services";
import { localStorageService } from "@/services/storages";
import { useAuth } from "@/components/providers/AuthProvider";
import { sendVerifyEmail } from "@/services/auth";

const { Title, Text } = Typography;

export default function SignupPage() {
  const [form] = Form.useForm();
  const router = useRouter();
  const [status, setStatus] = React.useState<"form" | "success">("form");
  const [message, setMessage] = React.useState<string>("");
  const [error, setError] = React.useState<string | null>()

  const { signup, isLoading, sendVerifyEmail } = useAuth()

  const onFinish = async (values: {
    email: string;
    password: string;
    name: string;
    confirmPassword: string;
  }) => {

    signup({
      email: values.email,
      password: values.password,
      name: values.name
    }).then(() => {
      setStatus('success')
    }).catch((error) => {
      setError(error?.message || "Có lỗi xảy ra")
    })


    // try {
    //   const response = await authService.register({
    //     email: values.email,
    //     password: values.password,
    //     name: values.name,
    //   });

    //   if (response.code >= 200 && response.code < 300 && response.data) {
    //     // Save tokens and user data
    //     const { access, refresh } = response.data.tokens;

    //     console.log(response.data)

    //     localStorageService.save("user", response.data.user);
    //     localStorageService.save("accessToken", access.token);
    //     localStorageService.save("refreshToken", refresh.token);

    //     // Show verification message instead of redirecting
    //     setStatus("success");
    //     setMessage("Account created successfully! Please check your email to verify your account.");
    //   } else {
    //     setError(response.message || "Registration failed. Please try again.");
    //   }
    // } catch (error: unknown) {
    //   console.error("Registration failed:", error);
    //   const errorMessage = error instanceof Error ? error.message : "Registration failed. Please try again.";
    //   setError(errorMessage);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const handleLoginClick = () => {
    router.push("/");
  };

  const handleVerifyClick = () => {
    // setIsLoading(true);
    sendVerifyEmail()
  }

  if (status === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-xl border-0">
            <div className="text-center mb-8">
              <Title level={2} className="mb-2 text-gray-800">
                Check Your Email
              </Title>
              <Text type="secondary" className="text-base">
                We&apos;ve sent you a verification link
              </Text>
            </div>

            <div className="text-center mb-8">
              <div className="text-6xl text-green-500 mb-4">📧</div>
              <Title level={3} className="mb-4">
                Verify Your Email
              </Title>
              <Text className="text-base text-gray-600 mb-6 block">
                {message}
              </Text>

              <Alert
                message="Important Notice"
                description="You must verify your email to comment, like, or review. Please check your inbox and click the verification link."
                type="warning"
                showIcon
                className="mb-6"
              />
            </div>

            <div className="text-center">
              <Button
                type="primary"
                onClick={handleVerifyClick}
                size="large"
                className="mb-4"
                loading={isLoading}
              >
                Verify Now
              </Button>
              <Button
                type="primary"
                onClick={handleLoginClick}
                size="large"
                className="mb-4"
              >
                Go to Home
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0">
          <div className="text-center mb-8">
            <Title level={2} className="mb-2 text-gray-800">
              Create Account
            </Title>
            <Text type="secondary" className="text-base">
              Join us and start your journey
            </Text>
          </div>

          {error && (
            <Alert
              message="Registration Failed"
              description={error}
              type="error"
              showIcon
              className="mb-6"
            />
          )}

          <Form
            form={form}
            name="signup"
            onFinish={onFinish}
            layout="vertical"
            size="large"
            requiredMark={false}
          >
            <Form.Item
              name="name"
              label="Full Name"
              rules={[
                { required: true, message: "Please enter your full name" },
                { min: 2, message: "Name must be at least 2 characters" }
              ]}
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="Enter your full name"
                autoComplete="name"
              />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" }
              ]}
            >
              <Input
                prefix={<MailOutlined className="text-gray-400" />}
                placeholder="Enter your email"
                autoComplete="email"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please enter your password" },
                { min: 6, message: "Password must be at least 6 characters" },
                {
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                  message: "Password must contain at least one uppercase letter, one lowercase letter, and one number"
                }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Enter your password"
                autoComplete="new-password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              dependencies={['password']}
              rules={[
                { required: true, message: "Please confirm your password" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Passwords do not match'));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Confirm your password"
                autoComplete="new-password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            <Form.Item className="mb-6">
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                className="w-full h-12 text-base font-medium"
                size="large"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </Form.Item>
          </Form>

          <Divider className="my-6">
            <Text type="secondary">or</Text>
          </Divider>

          <div className="text-center">
            <Text type="secondary">Already have an account? </Text>
            <Button
              type="link"
              onClick={handleLoginClick}
              className="p-0 h-auto text-base font-medium"
            >
              Sign in here
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
} 