'use client';

import React, { useState } from 'react';
import { Modal, List, Avatar, Input, Button, Form, message, Divider } from 'antd';
import { UserOutlined, SendOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { reviewService } from '@/services';

const { TextArea } = Input;

interface CommentModalProps {
  visible: boolean;
  onCancel: () => void;
  review: any;
  onSuccess: () => void;
}

const CommentModal: React.FC<CommentModalProps> = ({
  visible,
  onCancel,
  review,
  onSuccess
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const { data: reviewDetail, refetch } = useQuery({
    queryKey: ['review', review._id],
    queryFn: () => reviewService.getReview(review._id),
    enabled: visible && !!review._id,
  });

  const handleSubmitComment = async (values: any) => {
    try {
      setLoading(true);
      await reviewService.addCommentToReview(review._id, {
        content: values.content
      });
      
      message.success('Bình luận đã được đăng thành công!');
      form.resetFields();
      refetch();
      onSuccess();
    } catch (error) {
      console.error('Error adding comment:', error);
      message.error('Có lỗi xảy ra khi đăng bình luận');
    } finally {
      setLoading(false);
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

  return (
    <Modal
      title={`Bình luận - ${review?.content?.substring(0, 50)}...`}
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={600}
    >
      <div className="mb-4">
        <div className="flex items-start gap-3 mb-3">
          <Avatar 
            size={40} 
            src={review?.user?.avatar}
            icon={<UserOutlined />}
          />
          <div className="flex-1">
            <div className="font-semibold">
              {review?.isAnonymous ? 'Người dùng ẩn danh' : review?.user?.name || 'Người dùng'}
            </div>
            <div className="text-gray-600 text-sm">
              {formatDate(review?.createdAt)}
            </div>
            <div className="mt-2 text-gray-700">
              {review?.content}
            </div>
          </div>
        </div>
      </div>

      <Divider />

      <div className="mb-4">
        <h4 className="font-semibold mb-3">Bình luận ({reviewDetail?.comments?.length || 0})</h4>
        
        {reviewDetail?.comments?.length === 0 ? (
          <div className="text-gray-500 text-center py-4">
            Chưa có bình luận nào
          </div>
        ) : (
          <List
            dataSource={reviewDetail?.comments || []}
            renderItem={(comment: any) => (
              <List.Item className="px-0">
                <div className="flex items-start gap-3 w-full">
                  <Avatar 
                    size={32} 
                    src={comment?.user?.avatar}
                    icon={<UserOutlined />}
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-sm">
                      {comment?.user?.name || 'Người dùng'}
                    </div>
                    <div className="text-gray-600 text-xs">
                      {formatDate(comment?.createdAt)}
                    </div>
                    <div className="mt-1 text-gray-700">
                      {comment?.content}
                    </div>
                  </div>
                </div>
              </List.Item>
            )}
          />
        )}
      </div>

      <Divider />

      <Form form={form} onFinish={handleSubmitComment}>
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
    </Modal>
  );
};

export default CommentModal; 