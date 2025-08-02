'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Card, Avatar, Rate, Button, Space, Tag, Divider, Spin, Empty, List, Input, Form, message, Statistic, Row, Col } from 'antd';
import { LikeOutlined, HeartOutlined, SmileOutlined, ThumbsUpOutlined, MessageOutlined, UserOutlined, SendOutlined, EyeOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { reviewService } from '@/services';
import ClientLayout from '@/components/shared/ClientLayout';
import QueryProvider from '@/components/providers/QueryProvider';

const { TextArea } = Input;

export default function ReviewDetailPage() {
  const params = useParams();
  const router = useRouter();
  const reviewId = params.id as string;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const { data: review, isLoading, refetch } = useQuery({
    queryKey: ['review', reviewId],
    queryFn: async () => {
      const reviewData = await reviewService.getReview(reviewId);
      // Increment view count when viewing review detail
      try {
        await reviewService.incrementViewCount(reviewId);
      } catch (error) {
        console.error('Error incrementing view count:', error);
      }
      return reviewData;
    },
    enabled: !!reviewId,
  });

  const handleAddComment = async (values: any) => {
    try {
      setLoading(true);
      await reviewService.addCommentToReview(reviewId, {
        content: values.content
      });
      
      message.success('Bình luận đã được đăng thành công!');
      form.resetFields();
      refetch();
    } catch (error) {
      console.error('Error adding comment:', error);
      message.error('Có lỗi xảy ra khi đăng bình luận');
    } finally {
      setLoading(false);
    }
  };

  const handleReaction = async (type: string) => {
    try {
      await reviewService.addReactionToReview(reviewId, { type });
      refetch();
      message.success('Đã thêm reaction!');
    } catch (error) {
      console.error('Error adding reaction:', error);
      message.error('Có lỗi xảy ra');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getReactionCount = (reactions: any[], type: string) => {
    return reactions?.filter((r: any) => r.type === type).length || 0;
  };

  if (isLoading) {
    return (
      <QueryProvider>
        <ClientLayout>
          <div className="flex justify-center items-center min-h-screen">
            <Spin size="large" />
          </div>
        </ClientLayout>
      </QueryProvider>
    );
  }

  if (!review) {
    return (
      <QueryProvider>
        <ClientLayout>
          <div className="flex justify-center items-center min-h-screen">
            <Empty description="Không tìm thấy review" />
          </div>
        </ClientLayout>
      </QueryProvider>
    );
  }

  return (
    <QueryProvider>
      <ClientLayout>
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-6">
            <Button 
              icon={<ArrowLeftOutlined />} 
              onClick={() => router.back()}
              className="mb-4"
            >
              Quay lại
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">Chi tiết đánh giá</h1>
          </div>

          {/* Review Content */}
          <Card className="mb-6">
            <div className="flex items-start gap-4">
              <Avatar 
                size={64} 
                src={review.user?.avatar}
                icon={<UserOutlined />}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-semibold text-lg">
                    {review.isAnonymous ? 'Người dùng ẩn danh' : review.user?.name || 'Người dùng'}
                  </span>
                  {review.isAnonymous && <Tag color="orange">Ẩn danh</Tag>}
                </div>
                
                <div className="mb-3">
                  <Rate disabled defaultValue={review.rating} size="large" />
                  <span className="ml-3 text-gray-600">
                    {formatDate(review.createdAt)}
                  </span>
                </div>
                
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  {review.content}
                </p>

                {/* Stats */}
                <Row gutter={16} className="mb-4">
                  <Col span={6}>
                    <Statistic
                      title="Lượt xem"
                      value={review.viewCount || 0}
                      prefix={<EyeOutlined />}
                    />
                  </Col>
                  <Col span={6}>
                    <Statistic
                      title="Bình luận"
                      value={review.comments?.length || 0}
                      prefix={<MessageOutlined />}
                    />
                  </Col>
                  <Col span={6}>
                    <Statistic
                      title="Thích"
                      value={getReactionCount(review.reactions, 'like')}
                      prefix={<LikeOutlined />}
                    />
                  </Col>
                  <Col span={6}>
                    <Statistic
                      title="Yêu thích"
                      value={getReactionCount(review.reactions, 'love')}
                      prefix={<HeartOutlined />}
                    />
                  </Col>
                </Row>

                {/* Reactions */}
                <div className="flex items-center gap-4">
                  <Space>
                    <Button 
                      type="text" 
                      icon={<LikeOutlined />}
                      onClick={() => handleReaction('like')}
                    >
                      Thích ({getReactionCount(review.reactions, 'like')})
                    </Button>
                    <Button 
                      type="text" 
                      icon={<HeartOutlined />}
                      onClick={() => handleReaction('love')}
                    >
                      Yêu thích ({getReactionCount(review.reactions, 'love')})
                    </Button>
                    <Button 
                      type="text" 
                      icon={<ThumbsUpOutlined />}
                      onClick={() => handleReaction('helpful')}
                    >
                      Hữu ích ({getReactionCount(review.reactions, 'helpful')})
                    </Button>
                    <Button 
                      type="text" 
                      icon={<SmileOutlined />}
                      onClick={() => handleReaction('funny')}
                    >
                      Hài hước ({getReactionCount(review.reactions, 'funny')})
                    </Button>
                  </Space>
                </div>
              </div>
            </div>
          </Card>

          {/* Comments Section */}
          <Card title={`Bình luận (${review.comments?.length || 0})`}>
            {/* Add Comment */}
            <div className="mb-6">
              <Form form={form} onFinish={handleAddComment}>
                <Form.Item
                  name="content"
                  rules={[
                    { required: true, message: 'Vui lòng nhập nội dung bình luận' },
                    { max: 500, message: 'Bình luận không được quá 500 ký tự' }
                  ]}
                >
                  <TextArea
                    rows={3}
                    placeholder="Viết bình luận của bạn..."
                    showCount
                    maxLength={500}
                  />
                </Form.Item>
                
                <Form.Item>
                  <div className="flex justify-end">
                    <Button 
                      type="primary" 
                      htmlType="submit" 
                      loading={loading}
                      icon={<SendOutlined />}
                    >
                      Gửi bình luận
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </div>

            <Divider />

            {/* Comments List */}
            {review.comments?.length === 0 ? (
              <Empty description="Chưa có bình luận nào" />
            ) : (
              <List
                dataSource={review.comments || []}
                renderItem={(comment: any) => (
                  <List.Item className="px-0">
                    <div className="flex items-start gap-3 w-full">
                      <Avatar 
                        size={40} 
                        src={comment?.user?.avatar}
                        icon={<UserOutlined />}
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold">
                            {comment?.user?.name || 'Người dùng'}
                          </span>
                          <span className="text-xs text-gray-500">
                            {formatDate(comment?.createdAt)}
                          </span>
                        </div>
                        <div className="text-gray-700">
                          {comment?.content}
                        </div>
                      </div>
                    </div>
                  </List.Item>
                )}
              />
            )}
          </Card>
        </div>
      </ClientLayout>
    </QueryProvider>
  );
} 