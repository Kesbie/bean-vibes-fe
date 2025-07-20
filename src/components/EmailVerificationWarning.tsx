'use client';

import React from 'react';
import { Alert, Button, Modal } from 'antd';
import { ExclamationCircleOutlined, MailOutlined } from '@ant-design/icons';
import { useAuth } from '@/components/providers/AuthProvider';
import { useRouter } from 'next/navigation';

interface EmailVerificationWarningProps {
  variant?: 'alert' | 'modal';
  title?: string;
  message?: string;
  showIcon?: boolean;
  closable?: boolean;
  onClose?: () => void;
}

export default function EmailVerificationWarning({
  variant = 'alert',
  title = 'Email Verification Required',
  message = 'You must verify your email address to comment, like, or review.',
  showIcon = true,
  closable = true,
  onClose
}: EmailVerificationWarningProps) {
  const { user } = useAuth();
  const router = useRouter();

  // Don't show warning if user is not logged in or already verified
  if (!user || user.isEmailVerified) {
    return null;
  }

  const handleResendEmail = () => {
    // TODO: Implement resend verification email functionality
    console.log('Resend verification email');
  };

  const handleGoToProfile = () => {
    router.push('/admin/profile');
  };

  const alertContent = (
    <div>
      <div className="mb-2">{message}</div>
      <div className="flex gap-2 mt-3">
        <Button 
          type="primary" 
          size="small" 
          icon={<MailOutlined />}
          onClick={handleResendEmail}
        >
          Resend Email
        </Button>
        <Button 
          size="small"
          onClick={handleGoToProfile}
        >
          Go to Profile
        </Button>
      </div>
    </div>
  );

  if (variant === 'modal') {
    return (
      <Modal
        title={
          <div className="flex items-center gap-2">
            <ExclamationCircleOutlined className="text-orange-500" />
            {title}
          </div>
        }
        open={true}
        onCancel={onClose}
        footer={[
          <Button key="cancel" onClick={onClose}>
            Close
          </Button>,
          <Button 
            key="resend" 
            type="primary" 
            icon={<MailOutlined />}
            onClick={handleResendEmail}
          >
            Resend Verification Email
          </Button>,
        ]}
        width={500}
      >
        <div className="py-4">
          <p className="mb-4">{message}</p>
          <p className="text-sm text-gray-600">
            Please check your email inbox and spam folder for the verification link. 
            If you don&apos;t receive it, you can request a new one.
          </p>
        </div>
      </Modal>
    );
  }

  return (
    <Alert
      message={title}
      description={alertContent}
      type="warning"
      showIcon={showIcon}
      closable={closable}
      onClose={onClose}
      className="mb-4"
    />
  );
} 