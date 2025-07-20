'use client';

import { useAuth } from '@/components/providers/AuthProvider';
import { Modal } from 'antd';
import { useRouter } from 'next/navigation';

export function useEmailVerification() {
  const { user } = useAuth();
  const router = useRouter();

  const isEmailVerified = user?.isEmailVerified ?? false;
  const isLoggedIn = !!user;

  const requireEmailVerification = (action: string) => {
    if (!isLoggedIn) {
      Modal.confirm({
        title: 'Login Required',
        content: `You must be logged in to ${action}.`,
        okText: 'Login',
        cancelText: 'Cancel',
        onOk: () => router.push('/login'),
      });
      return false;
    }

    if (!isEmailVerified) {
      Modal.confirm({
        title: 'Email Verification Required',
        content: `You must verify your email address to ${action}. Please check your email and click the verification link, or request a new one from your profile.`,
        okText: 'Go to Profile',
        cancelText: 'Cancel',
        onOk: () => router.push('/admin/profile'),
      });
      return false;
    }

    return true;
  };

  const canComment = () => requireEmailVerification('comment');
  const canLike = () => requireEmailVerification('like');
  const canReview = () => requireEmailVerification('review');
  const canInteract = () => requireEmailVerification('interact');

  return {
    isEmailVerified,
    isLoggedIn,
    requireEmailVerification,
    canComment,
    canLike,
    canReview,
    canInteract,
  };
} 