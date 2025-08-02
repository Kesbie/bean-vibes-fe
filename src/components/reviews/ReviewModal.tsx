'use client';

import React, { useState } from 'react';
import { Modal, Form, Input, Rate, Button, Switch, message } from 'antd';
import { reviewService } from '@/services';

const { TextArea } = Input;

interface ReviewModalProps {
  visible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
  placeId: string;
  placeName: string;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  visible,
  onCancel,
  onSuccess,
  placeId,
  placeName
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      await reviewService.createReview({
        content: values.content,
        rating: values.rating,
        placeId,
        isAnonymous: values.isAnonymous || false
      });
      
      message.success('Đánh giá đã được đăng thành công!');
      form.resetFields();
      onSuccess();
      onCancel();
    } catch (error) {
      console.error('Error creating review:', error);
      message.error('Có lỗi xảy ra khi đăng đánh giá');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={`Viết đánh giá cho ${placeName}`}
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          rating: 5,
          isAnonymous: false
        }}
      >
        <Form.Item
          label="Đánh giá"
          name="rating"
          rules={[{ required: true, message: 'Vui lòng chọn đánh giá' }]}
        >
          <Rate />
        </Form.Item>

        <Form.Item
          label="Nội dung đánh giá"
          name="content"
          rules={[
            { required: true, message: 'Vui lòng nhập nội dung đánh giá' },
            { min: 10, message: 'Nội dung phải có ít nhất 10 ký tự' },
            { max: 1000, message: 'Nội dung không được quá 1000 ký tự' }
          ]}
        >
          <TextArea
            rows={6}
            placeholder="Chia sẻ trải nghiệm của bạn về địa điểm này..."
          />
        </Form.Item>

        <Form.Item
          label="Đăng ẩn danh"
          name="isAnonymous"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item>
          <div className="flex justify-end gap-2">
            <Button onClick={onCancel}>
              Hủy
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              Đăng đánh giá
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ReviewModal; 