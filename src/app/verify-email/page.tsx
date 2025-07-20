"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, Typography, Button, Result, Spin, Alert } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  HomeOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import AuthService from "@/services/auth";
import LocalStorage from "@/services/storages/localStorage";
import { useMutation } from "@tanstack/react-query";

const { Title, Text } = Typography;

const authService = new AuthService();
const localStorage = new LocalStorage();

type VerificationStatus = "loading" | "success" | "error" | "invalid";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<VerificationStatus>("loading");
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const verifyMutation = useMutation({
    mutationFn: authService.verifyEmail,
    onSuccess: (res) => {
      console.log('verify success', res)
    },
    onError: (error) => {
      console.error('verify error', error)
    }
  })

  // useEffect(() => {
  //   const verifyEmail = async () => {
  //     const token = searchParams.get("token");

  //     if (!token) {
  //       setStatus("invalid");
  //       setError("Verification token is missing. Please check your email for the correct verification link.");
  //       return;
  //     }

  //     try {
  //       const response = await verifyMutation.mutateAsync(token);

  //       const currentUser = localStorage.load("user");

  //       if (response.code === 204) {
  //         localStorage.save("user", { ...currentUser, isEmailVerified: true });
  //         setStatus("success");
  //         setMessage(response.data.message || "Your email has been successfully verified!");
  //       } else {
  //         setStatus("error");
  //         setError(response.message || "Email verification failed. Please try again.");
  //       }
  //     } catch (error: unknown) {
  //       console.error("Email verification error:", error);
  //       setStatus("error");
  //       const errorMessage = error instanceof Error ? error.message : "Email verification failed. Please try again.";
  //       setError(errorMessage);
  //     }
  //   };

  //   verifyEmail();
  // }, [searchParams, verifyMutation]);

  const handleGoHome = () => {
    router.push("/");
  };

  const handleGoLogin = () => {
    router.push("/login");
  };

  const renderContent = () => {
    switch (status) {
      case "loading":
        return (
          <Result
            icon={<Spin size="large" />}
            title="Verifying Your Email"
            subTitle="Please wait while we verify your email address..."
          />
        );

      case "success":
        return (
          <Result
            status="success"
            icon={<CheckCircleOutlined />}
            title="Email Verified Successfully!"
            subTitle={message}
            extra={[
              <Button
                type="primary"
                key="home"
                icon={<HomeOutlined />}
                onClick={handleGoHome}
                size="large"
              >
                Go to Home
              </Button>,
              <Button
                key="login"
                icon={<LoginOutlined />}
                onClick={handleGoLogin}
                size="large"
              >
                Sign In
              </Button>,
            ]}
          />
        );

      case "error":
        return (
          <Result
            status="error"
            icon={<CloseCircleOutlined />}
            title="Verification Failed"
            subTitle={error}
            extra={[
              <Button
                type="primary"
                key="login"
                icon={<LoginOutlined />}
                onClick={handleGoLogin}
                size="large"
              >
                Go to Login
              </Button>,
              <Button
                key="home"
                icon={<HomeOutlined />}
                onClick={handleGoHome}
                size="large"
              >
                Go to Home
              </Button>,
            ]}
          />
        );

      case "invalid":
        return (
          <Result
            status="warning"
            icon={<ExclamationCircleOutlined />}
            title="Invalid Verification Link"
            subTitle={error}
            extra={[
              <Button
                type="primary"
                key="login"
                icon={<LoginOutlined />}
                onClick={handleGoLogin}
                size="large"
              >
                Go to Login
              </Button>,
              <Button
                key="home"
                icon={<HomeOutlined />}
                onClick={handleGoHome}
                size="large"
              >
                Go to Home
              </Button>,
            ]}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100 p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0">
          <div className="text-center mb-8">
            <Title level={2} className="mb-2 text-gray-800">
              Email Verification
            </Title>
            <Text type="secondary" className="text-base">
              {status === "loading" && "Verifying your email address..."}
              {status === "success" && "Your account is now verified!"}
              {status === "error" && "Something went wrong"}
              {status === "invalid" && "Invalid verification link"}
            </Text>
          </div>

          {renderContent()}

          {status === "error" && (
            <Alert
              message="Need Help?"
              description="If you're having trouble verifying your email, please contact support or try signing up again."
              type="info"
              showIcon
              className="mt-6"
            />
          )}
        </Card>
      </div>
    </div>
  );
} 