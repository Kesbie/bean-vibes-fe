"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { categoryService, reportService } from "@/services";
import { Avatar, Button, UploadFile } from "antd";
import { columns } from "./columns";
import { AdminContentHeader } from "@/components/admin-content-header";
import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined
} from "@ant-design/icons";
import FormAdvance from "@/components/form-advance";
// import { useAuth } from "@/components/providers/AuthProvider";
import { elementTypes } from "@/components";
import Table from "@/components/table";
import { useCustomMutation } from "@/hooks/useQuery";
import { useConfirmModal } from "@/hooks/useConfirm";
import {
  categoryFormElement,
  categoryFormElementEdit
} from "@/components/form-elements/category";
import Modal from "@/components/modals";
import { reviewService, userService } from "@/services";
import { REPORT_STATUS, REPORT_TYPES } from "@/constants";

const ReportsPage = () => {
  // const { user } = useAuth();

  const [filters, setFilters] = React.useState<{
    page: number;
    limit: number;
  }>({
    page: 1,
    limit: 10
  });

  const [selectedReport, setSelectedReport] =
    React.useState<App.Types.Report.ReportResponse | null>(null);
  const [deleteContentLoading, setDeleteContentLoading] = React.useState(false);
  const [hideContentLoading, setHideContentLoading] = React.useState(false);
  const [banUserLoading, setBanUserLoading] = React.useState(false);
  const [warnUserLoading, setWarnUserLoading] = React.useState(false);
  const [resolveLoading, setResolveLoading] = React.useState(false);

  const { data: reports, refetch } = useQuery({
    queryKey: ["reports"],
    queryFn: () => reportService.getReports(filters).then((res) => res.data)
  });

  const { showDeleteConfirm } = useConfirmModal();

  const formRef = React.useRef<App.Components.FormAdvance.FormAdvanceRef>(null);
  const formRefEdit =
    React.useRef<App.Components.FormAdvance.FormAdvanceRef>(null);
  const resolveModalRef = React.useRef<App.Components.Modal.ModalRef>(null);
  const { mutate: addRestrictedWord } = useCustomMutation({
    mutationFn: (payload: App.Types.Category.CategoryCreate) =>
      categoryService.addCategory(payload),
    onSuccess: () => {
      formRef.current?.done();
      refetch();
    },
    onError: () => {
      formRef.current?.fail();
    },
    messageConfigs: {
      successMessage: "Thêm từ khóa thành công",
      errorMessage: "Thêm từ khóa thất bại"
    }
  });

  const { mutate: updateRestrictedWord } = useCustomMutation({
    mutationFn: (payload: App.Types.Category.CategoryUpdate) =>
      categoryService.updateCategory(payload),
    onSuccess: () => {
      formRefEdit.current?.done();
      refetch();
    },
    onError: () => {
      formRefEdit.current?.fail();
    },
    messageConfigs: {
      successMessage: "Cập nhật từ khóa thành công",
      errorMessage: "Cập nhật từ khóa thất bại"
    }
  });

  const { mutate: deleteReview } = useCustomMutation({
    mutationFn: (id: string) => reviewService.deleteReview(id),
    onSuccess: () => {
      refetch();
    },
    messageConfigs: {
      successMessage: "Xóa đánh giá thành công",
      errorMessage: "Xóa đánh giá thất bại"
    }
  });

  const { mutate: resolveReport } = useCustomMutation({
    mutationFn: (id: string) =>
      reportService.resolveReport(id, { resolvedActions: [] }),
    onSuccess: () => {
      refetch();
      resolveModalRef.current?.hide();
    },
    messageConfigs: {
      successMessage: "Xử lý báo cáo thành công",
      errorMessage: "Xử lý báo cáo thất bại"
    }
  });

  const handleFinish: App.Components.FormAdvance.OnFinishEvent<App.Types.Category.CategoryCreate> =
    React.useCallback(
      (info) => {
        const { values, api } = info;
        api.loading();
        const payload = {
          ...values,
          thumbnail: values.thumbnail
            ? (values.thumbnail as unknown as UploadFile[]).map(
                (item) => item.response.id
              )[0]
            : undefined
        };

        console.log(values.thumbnail);

        addRestrictedWord(payload);
      },
      [addRestrictedWord]
    );

  const handleFinishEdit: App.Components.FormAdvance.OnFinishEvent<App.Types.Category.CategoryUpdate> =
    React.useCallback(
      (info) => {
        const { values, api } = info;
        api.loading();

        const payload = {
          ...values,
          thumbnail: values.thumbnail
            ? (values.thumbnail as unknown as UploadFile[]).map(
                (item) => item.response.id
              )[(values.thumbnail as unknown as UploadFile[]).length - 1]
            : undefined
        };

        updateRestrictedWord(payload);
      },
      [updateRestrictedWord]
    );  



  const handleResolve = React.useCallback(
    (record: App.Types.Report.ReportResponse) => {
      setSelectedReport(record);
      resolveModalRef.current?.show();
    },
    []
  );

  const handleDeleteContent = React.useCallback(async () => {
    if (!selectedReport) return;

    try {
      setDeleteContentLoading(true);

      if (selectedReport.reportableModel === "review") {
        await reviewService.deleteReview(selectedReport.reportableId);
      }
      // TODO: Add comment deletion service when available

      refetch();
      resolveModalRef.current?.hide();
    } catch (error) {
      console.error("Error deleting content:", error);
    } finally {
      setDeleteContentLoading(false);
    }
  }, [selectedReport, refetch]);

  const handleHideContent = React.useCallback(async () => {
    if (!selectedReport) return;

    try {
      setHideContentLoading(true);
      // TODO: Implement hide content functionality
      console.log("Hiding content:", selectedReport.reportableId);

      refetch();
      resolveModalRef.current?.hide();
    } catch (error) {
      console.error("Error hiding content:", error);
    } finally {
      setHideContentLoading(false);
    }
  }, [selectedReport, refetch]);

  const handleBanUser = React.useCallback(async () => {
    if (!selectedReport) return;

    try {
      setBanUserLoading(true);
      // TODO: Get user ID from the reported content and ban the user
      // This would require fetching the content first to get the user ID
      console.log("Banning user for report:", selectedReport.id);

      refetch();
      resolveModalRef.current?.hide();
    } catch (error) {
      console.error("Error banning user:", error);
    } finally {
      setBanUserLoading(false);
    }
  }, [selectedReport, refetch]);

  const handleWarnUser = React.useCallback(async () => {
    if (!selectedReport) return;

    try {
      setWarnUserLoading(true);
      // TODO: Implement user warning functionality
      console.log("Warning user for report:", selectedReport.id);

      refetch();
      resolveModalRef.current?.hide();
    } catch (error) {
      console.error("Error warning user:", error);
    } finally {
      setWarnUserLoading(false);
    }
  }, [selectedReport, refetch]);

  const handleResolveReport = React.useCallback(async () => {
    if (!selectedReport) return;

    resolveReport(selectedReport.id, { resolvedActions: [] });
  }, [selectedReport, refetch]);

  const renderAction = React.useCallback(
    (record: App.Types.Report.ReportResponse) => {
      return (
        <>
        {
          record.status === REPORT_STATUS.PENDING ? (
            <Button
              danger
              icon={<CheckOutlined />}
              type="link"
              onClick={() => handleResolve(record)}
            >
              Xử lý
            </Button>
          ) : (
            <Button
            icon={<EyeOutlined />}
            type="link"
            onClick={() => handleResolve(record)}
          >
            Chi tiết
          </Button>
          )
        }
        </>
      );
    },
    [handleResolve]
  );

  return (
    <div className="flex flex-col h-full">
      <AdminContentHeader
        title="Quản lý báo cáo"
        description="Quản lý báo cáo"
        // buttons={
        //   <Button
        //     type="primary"
        //     onClick={() => {
        //       formRef.current?.show();
        //     }}
        //   >
        //     <PlusOutlined />
        //     Thêm báo cáo
        //   </Button>
        // }
      />
      <Table<App.Types.Report.ReportResponse>
        dataSource={reports?.results || []}
        columns={columns}
        renderAction={renderAction}
        pagination={{
          pageSize: 10,
          current: filters.page,
          total: reports?.totalResults,
          onChange: (page) => {
            setFilters({ ...filters, page });
          }
        }}
      />
      <FormAdvance
        modalProps={{
          title: "Thêm danh mục"
        }}
        elements={categoryFormElement}
        elementTypes={elementTypes}
        ref={formRef}
        onFinish={handleFinish}
      />
      <FormAdvance
        modalProps={{
          title: "Sửa danh mục"
        }}
        elements={categoryFormElementEdit}
        elementTypes={elementTypes}
        ref={formRefEdit}
        onFinish={handleFinishEdit}
      />
      <Modal
        ref={resolveModalRef}
        title="Xử lý báo cáo"
        width={800}
        footer={null}
      >
        <div className="space-y-6">
          {/* Report Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Thông tin báo cáo</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-gray-600">Loại nội dung:</span>
                <span className="ml-2 font-medium">
                  {selectedReport?.reportableModel === "review"
                    ? "Đánh giá"
                    : "Bình luận"}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Lý do báo cáo:</span>
                <span className="ml-2 font-medium">
                  {selectedReport?.reason}
                </span>
              </div>
            </div>
            {/* Content Details */}
            <div className="mt-4">
              <span className="text-gray-600">Nội dung:</span>
              <div className="mt-2 p-3 bg-white rounded border">
                {selectedReport?.reportableModel === REPORT_TYPES.REVIEW ? (
                  <div>
                    <div className="font-medium">
                      {selectedReport?.reportable?.title}
                    </div>
                    <p className="text-gray-600 mt-1">
                      {selectedReport?.reportable?.content}
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-600">
                    {selectedReport?.reportable?.content}
                  </p>
                )}
              </div>
            </div>
            {/* User Information */}
            <div className="mt-4">
              <span className="text-gray-600">Người đăng:</span>
              <div className="mt-2 p-3 bg-white rounded border">
                <div className="flex items-center gap-3">
                  <Avatar src={selectedReport?.reportable?.user?.avatar} size={40}>
                    {selectedReport?.reportable?.user?.name?.[0]}
                  </Avatar>
                  <div>
                    <div className="font-medium">
                      {selectedReport?.reportable?.user?.name}
                    </div>
                    <div className="text-gray-500 text-sm">
                      {selectedReport?.reportable?.user?.email}
                    </div>
                    <div className="text-gray-500 text-sm">
                      {selectedReport?.reportable?.user?.numberOfReports} báo cáo
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Hành động xử lý</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Content Actions */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-700">Xử lý nội dung</h4>

                <Button
                  danger
                  icon={<DeleteOutlined />}
                  block
                  onClick={() => handleDeleteContent()}
                  loading={deleteContentLoading}
                >
                  Xóa nội dung
                </Button>

                <Button
                  icon={<EyeOutlined />}
                  block
                  onClick={() => handleHideContent()}
                  loading={hideContentLoading}
                >
                  Ẩn nội dung
                </Button>
              </div>

              {/* User Actions */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-700">Xử lý tài khoản</h4>

                <Button
                  danger
                  icon={<DeleteOutlined />}
                  block
                  onClick={() => handleBanUser()}
                  loading={banUserLoading}
                >
                  Cấm tài khoản
                </Button>

                <Button
                  icon={<EditOutlined />}
                  block
                  onClick={() => handleWarnUser()}
                  loading={warnUserLoading}
                >
                  Cảnh cáo người dùng
                </Button>
              </div>
            </div>

            {/* Resolution Actions */}
            <div className="pt-4 border-t">
              <div className="flex gap-3">
                <Button
                  type="primary"
                  icon={<CheckOutlined />}
                  onClick={handleResolveReport}
                  loading={resolveLoading}
                >
                  Đánh dấu đã xử lý
                </Button>

                <Button onClick={() => resolveModalRef.current?.hide()}>
                  Hủy
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ReportsPage;
