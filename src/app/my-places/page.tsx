'use client';

import { useState } from 'react';
import { Button, Card, Table, Tag, Space, Modal, message, Popconfirm, Input, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { placeService } from '@/services';
import { useRouter } from 'next/navigation';
import ClientLayout from '@/components/shared/ClientLayout';
import QueryProvider from '@/components/providers/QueryProvider';
import PlaceForm from '@/components/places/PlaceForm';

const { Search } = Input;
const { Option } = Select;

export default function MyPlacesPage() {
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPlace, setEditingPlace] = useState<App.Types.Place.PlaceResponse | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  const router = useRouter();
  const queryClient = useQueryClient();

  // Fetch user's places
  const { data: placesData, isLoading } = useQuery({
    queryKey: ['my-places', searchText, statusFilter, currentPage, pageSize],
    queryFn: () => placeService.getMyPlaces({
      search: searchText || undefined,
      status: statusFilter || undefined,
      page: currentPage,
      limit: pageSize
    }),
    staleTime: 5 * 60 * 1000,
  });

  // Delete place mutation
  const deleteMutation = useMutation({
    mutationFn: placeService.deletePlace,
    onSuccess: () => {
      message.success('Đã xóa địa điểm thành công');
      queryClient.invalidateQueries({ queryKey: ['my-places'] });
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || 'Có lỗi xảy ra khi xóa địa điểm');
    }
  });

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleEdit = (place: App.Types.Place.PlaceResponse) => {
    setEditingPlace(place);
    setIsModalVisible(true);
  };

  const handleView = (id: string) => {
    router.push(`/place/${id}`);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setEditingPlace(null);
  };

  const handleFormSuccess = () => {
    handleModalClose();
    queryClient.invalidateQueries({ queryKey: ['my-places'] });
  };

  const columns = [
    {
      title: 'Tên địa điểm',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <span className="font-medium">{text}</span>,
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      render: (text: string) => <span className="text-gray-600">{text}</span>,
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      render: (category: App.Types.Category.CategoryResponse) => (
        <Tag color="blue">{category?.name}</Tag>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string, record: App.Types.Place.PlaceResponse) => {
        let color = 'default';
        let text = 'Không xác định';
        
        if (record.isApproved === false) {
          color = 'orange';
          text = 'Chờ duyệt';
        } else if (record.isApproved === true) {
          color = 'green';
          text = 'Đã duyệt';
        } else if (status === 'active') {
          color = 'green';
          text = 'Hoạt động';
        } else if (status === 'inactive') {
          color = 'red';
          text = 'Không hoạt động';
        }
        
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: 'Đánh giá',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating: number, record: App.Types.Place.PlaceResponse) => (
        <span>
          {rating ? `${rating.toFixed(1)} ⭐` : 'Chưa có đánh giá'}
        </span>
      ),
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (_, record: App.Types.Place.PlaceResponse) => (
        <Space>
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => handleView(record.id)}
            title="Xem chi tiết"
          />
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            title="Chỉnh sửa"
          />
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa địa điểm này?"
            description="Hành động này không thể hoàn tác."
            onConfirm={() => handleDelete(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              title="Xóa"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <QueryProvider>
      <ClientLayout>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Quản lý địa điểm của tôi</h1>
            <p className="text-gray-600">Quản lý các địa điểm bạn đã đóng góp</p>
          </div>

          <Card>
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-4 flex-1">
                <Search
                  placeholder="Tìm kiếm địa điểm..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  style={{ width: 300 }}
                  allowClear
                />
                <Select
                  placeholder="Lọc theo trạng thái"
                  value={statusFilter}
                  onChange={setStatusFilter}
                  style={{ width: 200 }}
                  allowClear
                >
                  <Option value="active">Hoạt động</Option>
                  <Option value="inactive">Không hoạt động</Option>
                  <Option value="pending">Chờ duyệt</Option>
                </Select>
              </div>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setIsModalVisible(true)}
                size="large"
              >
                Thêm địa điểm mới
              </Button>
            </div>

            <Table
              columns={columns}
              dataSource={placesData?.data?.results || []}
              loading={isLoading}
              rowKey="id"
              pagination={{
                current: currentPage,
                pageSize: pageSize,
                total: placesData?.data?.totalResults || 0,
                onChange: (page, size) => {
                  setCurrentPage(page);
                  setPageSize(size);
                },
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} của ${total} địa điểm`,
              }}
            />
          </Card>

          <Modal
            title={editingPlace ? 'Chỉnh sửa địa điểm' : 'Thêm địa điểm mới'}
            open={isModalVisible}
            onCancel={handleModalClose}
            footer={null}
            width={800}
            destroyOnClose
          >
            <PlaceForm
              place={editingPlace}
              onSuccess={handleFormSuccess}
              onCancel={handleModalClose}
            />
          </Modal>
        </div>
      </ClientLayout>
    </QueryProvider>
  );
} 