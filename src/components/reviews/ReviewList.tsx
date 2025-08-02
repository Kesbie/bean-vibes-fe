'use client';

import React, { useState } from 'react';
import { Card, Avatar, Rate, Button, Space, Tag, Divider, Empty, Spin, Statistic, Row, Col } from 'antd';
import { LikeOutlined, HeartOutlined, SmileOutlined, ThumbsUpOutlined, MessageOutlined, UserOutlined, EyeOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { reviewService } from '@/services';
import ReviewModal from './ReviewModal';
import CommentModal from './CommentModal';
import { useRouter } from 'next/navigation';

interface ReviewListProps {
  placeId: string;
  placeName: string;
}

const ReviewList: React.FC<ReviewListProps> = ({ placeId, placeName }) => {
  const router = useRouter();
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [selectedReview, setSelectedReview] = useState<any>(null);

  const { data: reviews, isLoading, refetch } = useQuery({
    queryKey: ['reviews', placeId],
    queryFn: () => reviewService.getReviewsByPlace(placeId, { limit: 10, sortBy: 'createdAt' }),
    enabled: !!placeId,
  });

  const handleReviewSuccess = () => {
    refetch();
  };

  const handleShowComments = (review: any) => {
    setSelectedReview(review);
    setCommentModalVisible(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getReactionCount = (reactions: any[], type: string) => {
    return reactions?.filter((r: any) => r.type === type).length || 0;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Đánh giá ({reviews?.totalResults || 0})</h3>
        <Button type="primary" onClick={() => setReviewModalVisible(true)}>
          Viết đánh giá
        </Button>
      </div>

      {reviews?.results?.length === 0 ? (
        <Empty description="Chưa có đánh giá nào" />
      ) : (
        <div className="space-y-4">
          {reviews?.results?.map((review: any) => (
            <Card key={review._id} className="mb-4">
              <div className="flex items-start gap-4">
                <Avatar 
                  size={48} 
                  src={review.user?.avatar}
                  icon={<UserOutlined />}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">
                      {review.isAnonymous ? 'Người dùng ẩn danh' : review.user?.name || 'Người dùng'}
                    </span>
                    {review.isAnonymous && <Tag color="orange">Ẩn danh</Tag>}
                  </div>
                  
                  <div className="mb-2">
                    <Rate disabled defaultValue={review.rating} />
                    <span className="ml-2 text-gray-600">
                      {formatDate(review.createdAt)}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-3">{review.content}</p>
                  
                                     {/* Stats */}
                   <Row gutter={16} className="mb-3">
                     <Col span={6}>
                       <Statistic
                         title="Lượt xem"
                         value={review.viewCount || 0}
                         prefix={<EyeOutlined />}
                         size="small"
                       />
                     </Col>
                     <Col span={6}>
                       <Statistic
                         title="Bình luận"
                         value={review.comments?.length || 0}
                         prefix={<MessageOutlined />}
                         size="small"
                       />
                     </Col>
                     <Col span={6}>
                       <Statistic
                         title="Thích"
                         value={getReactionCount(review.reactions, 'like')}
                         prefix={<LikeOutlined />}
                         size="small"
                       />
                     </Col>
                     <Col span={6}>
                       <Statistic
                         title="Yêu thích"
                         value={getReactionCount(review.reactions, 'love')}
                         prefix={<HeartOutlined />}
                         size="small"
                       />
                     </Col>
                   </Row>

                   <div className="flex items-center gap-4 text-gray-500">
                     <Space>
                       <Button 
                         type="text" 
                         size="small" 
                         icon={<LikeOutlined />}
                       >
                         {getReactionCount(review.reactions, 'like')}
                       </Button>
                       <Button 
                         type="text" 
                         size="small" 
                         icon={<HeartOutlined />}
                       >
                         {getReactionCount(review.reactions, 'love')}
                       </Button>
                       <Button 
                         type="text" 
                         size="small" 
                         icon={<ThumbsUpOutlined />}
                       >
                         {getReactionCount(review.reactions, 'helpful')}
                       </Button>
                       <Button 
                         type="text" 
                         size="small" 
                         icon={<SmileOutlined />}
                       >
                         {getReactionCount(review.reactions, 'funny')}
                       </Button>
                     </Space>
                     
                     <Button 
                       type="text" 
                       size="small" 
                       icon={<MessageOutlined />}
                       onClick={() => handleShowComments(review)}
                     >
                       {review.comments?.length || 0} bình luận
                     </Button>

                     <Button 
                       type="link" 
                       size="small"
                       onClick={() => router.push(`/review/${review._id}`)}
                     >
                       Xem chi tiết
                     </Button>
                   </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <ReviewModal
        visible={reviewModalVisible}
        onCancel={() => setReviewModalVisible(false)}
        onSuccess={handleReviewSuccess}
        placeId={placeId}
        placeName={placeName}
      />

      {selectedReview && (
        <CommentModal
          visible={commentModalVisible}
          onCancel={() => setCommentModalVisible(false)}
          review={selectedReview}
          onSuccess={() => {
            refetch();
            setCommentModalVisible(false);
          }}
        />
      )}
    </div>
  );
};

export default ReviewList; 