'use client';

import { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Upload, message, Space, Card } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useQuery, useMutation } from '@tanstack/react-query';
import { placeService, categoryService } from '@/services';
import type { UploadFile } from 'antd/es/upload/interface';

const { TextArea } = Input;
const { Option } = Select;

interface PlaceFormProps {
  place?: App.Types.Place.PlaceResponse | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function PlaceForm({ place, onSuccess, onCancel }: PlaceFormProps) {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch categories for dropdown
  const { data: categoriesData, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryService.getPublicCategories({ limit: 50 }),
    staleTime: 10 * 60 * 1000,
  });

  // Create/Update place mutation
  const mutation = useMutation({
    mutationFn: (values: any) => {
      if (place) {
        return placeService.updatePlace({ ...values, id: place.id });
      } else {
        return placeService.addPlace(values);
      }
    },
    onSuccess: () => {
      message.success(place ? 'Cập nhật địa điểm thành công!' : 'Thêm địa điểm thành công!');
      onSuccess();
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || 'Có lỗi xảy ra');
    },
    onSettled: () => {
      setIsSubmitting(false);
    }
  });

  // Initialize form with place data
  useEffect(() => {
    if (place) {
      form.setFieldsValue({
        name: place.name,
        description: place.description,
        address: place.address,
        latitude: place.latitude,
        longitude: place.longitude,
        phone: place.phone,
        website: place.website,
        categoryId: place.categoryId,
        openingHours: place.openingHours || {},
      });

      // Set photos
      if (place.photos && place.photos.length > 0) {
        const photos = place.photos.map((photo, index) => ({
          uid: `-${index}`,
          name: `photo-${index}`,
          status: 'done',
          url: photo,
        }));
        setFileList(photos);
      }
    }
  }, [place, form]);

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true);
    
    try {
      // Convert fileList to photo URLs
      const photos = fileList
        .filter(file => file.status === 'done')
        .map(file => file.url || file.response?.url)
        .filter(Boolean);

      const submitData = {
        ...values,
        photos,
      };

      mutation.mutate(submitData);
    } catch (error) {
      setIsSubmitting(false);
      message.error('Có lỗi xảy ra khi gửi form');
    }
  };

  const uploadProps = {
    listType: 'picture-card' as const,
    fileList,
    onChange: ({ fileList: newFileList }: any) => {
      setFileList(newFileList);
    },
    beforeUpload: (file: File) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('Chỉ có thể upload file ảnh!');
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Ảnh phải nhỏ hơn 2MB!');
        return false;
      }
      return false; // Prevent auto upload
    },
  };

  const openingHoursFields = [
    { name: 'monday', label: 'Thứ 2' },
    { name: 'tuesday', label: 'Thứ 3' },
    { name: 'wednesday', label: 'Thứ 4' },
    { name: 'thursday', label: 'Thứ 5' },
    { name: 'friday', label: 'Thứ 6' },
    { name: 'saturday', label: 'Thứ 7' },
    { name: 'sunday', label: 'Chủ nhật' },
  ];

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        openingHours: {},
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card title="Thông tin cơ bản" className="md:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="name"
              label="Tên địa điểm"
              rules={[{ required: true, message: 'Vui lòng nhập tên địa điểm!' }]}
            >
              <Input placeholder="Nhập tên địa điểm" />
            </Form.Item>

            <Form.Item
              name="categoryId"
              label="Danh mục"
              rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
            >
              <Select
                placeholder="Chọn danh mục"
                loading={isLoadingCategories}
                showSearch
                filterOption={(input, option) =>
                  (option?.children as unknown as string)?.toLowerCase().includes(input.toLowerCase())
                }
              >
                {categoriesData?.data?.results?.map((category) => (
                  <Option key={category.id} value={category.id}>
                    {category.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="description"
              label="Mô tả"
              rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
              className="md:col-span-2"
            >
              <TextArea
                rows={4}
                placeholder="Mô tả chi tiết về địa điểm..."
                maxLength={1000}
                showCount
              />
            </Form.Item>

            <Form.Item
              name="address"
              label="Địa chỉ"
              rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
              className="md:col-span-2"
            >
              <Input placeholder="Nhập địa chỉ chi tiết" />
            </Form.Item>

            <Form.Item
              name="latitude"
              label="Vĩ độ"
              rules={[
                { type: 'number', min: -90, max: 90, message: 'Vĩ độ phải từ -90 đến 90!' }
              ]}
            >
              <Input
                type="number"
                placeholder="Ví dụ: 10.762622"
                step="any"
              />
            </Form.Item>

            <Form.Item
              name="longitude"
              label="Kinh độ"
              rules={[
                { type: 'number', min: -180, max: 180, message: 'Kinh độ phải từ -180 đến 180!' }
              ]}
            >
              <Input
                type="number"
                placeholder="Ví dụ: 106.660172"
                step="any"
              />
            </Form.Item>
          </div>
        </Card>

        {/* Contact Information */}
        <Card title="Thông tin liên hệ">
          <Form.Item
            name="phone"
            label="Số điện thoại"
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>

          <Form.Item
            name="website"
            label="Website"
            rules={[
              { type: 'url', message: 'Vui lòng nhập URL hợp lệ!' }
            ]}
          >
            <Input placeholder="https://example.com" />
          </Form.Item>
        </Card>

        {/* Photos */}
        <Card title="Hình ảnh">
          <Form.Item name="photos">
            <Upload {...uploadProps}>
              {fileList.length < 8 && (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Thêm ảnh</div>
                </div>
              )}
            </Upload>
          </Form.Item>
        </Card>

        {/* Opening Hours */}
        <Card title="Giờ mở cửa" className="md:col-span-2">
          <Form.List name="openingHours">
            {(fields, { add, remove }) => (
              <>
                {openingHoursFields.map((field, index) => (
                  <div key={field.name} className="flex items-center gap-4 mb-4">
                    <div className="w-20 font-medium">{field.label}</div>
                    <Form.Item
                      name={['openingHours', field.name, 'open']}
                      noStyle
                    >
                      <Input
                        placeholder="08:00"
                        style={{ width: 100 }}
                      />
                    </Form.Item>
                    <span>đến</span>
                    <Form.Item
                      name={['openingHours', field.name, 'close']}
                      noStyle
                    >
                      <Input
                        placeholder="22:00"
                        style={{ width: 100 }}
                      />
                    </Form.Item>
                    <Form.Item
                      name={['openingHours', field.name, 'closed']}
                      noStyle
                    >
                      <Select
                        placeholder="Trạng thái"
                        style={{ width: 120 }}
                        defaultValue="open"
                      >
                        <Option value="open">Mở cửa</Option>
                        <Option value="closed">Đóng cửa</Option>
                      </Select>
                    </Form.Item>
                  </div>
                ))}
              </>
            )}
          </Form.List>
        </Card>
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <Button onClick={onCancel}>
          Hủy
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          loading={isSubmitting}
        >
          {place ? 'Cập nhật' : 'Thêm địa điểm'}
        </Button>
      </div>
    </Form>
  );
} 