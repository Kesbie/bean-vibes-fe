"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { placeService } from "@/services";
import { Button } from "antd";
import { columns } from "./columns";
import { AdminContentHeader } from "@/components/admin-content-header";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined
} from "@ant-design/icons";
import FormAdvance from "@/components/form-advance";
import {
  restrictedWordFormElement,
  restrictedWordFormElementEdit
} from "@/components/form-elements/restrictedWord";
// import { useAuth } from "@/components/providers/AuthProvider";
import { elementTypes } from "@/components";
import Table from "@/components/table";
import { useCustomMutation } from "@/hooks/useQuery";
import { useConfirmModal } from "@/hooks/useConfirm";
import { useAuth } from "@/components/providers/AuthProvider";

const RestrictedWordsPage = () => {
  const { isAdmin } = useAuth();

  const [filters, setFilters] = React.useState({
    page: 1,
    limit: 10
  });

  const { data: places, refetch } = useQuery({
    queryKey: ["places", filters.page, filters.limit],
    queryFn: () => placeService.getPlacesAdmin(filters).then((res) => res.data),
    enabled: isAdmin
  });

  const {
    showDeleteConfirm,
    showConfirm,
    showRejectConfirm,
    showApproveConfirm
  } = useConfirmModal();

  const formRef = React.useRef<App.Components.FormAdvance.FormAdvanceRef>(null);
  const formRefEdit =
    React.useRef<App.Components.FormAdvance.FormAdvanceRef>(null);

  const { mutate: addRestrictedWord } = useCustomMutation({
    mutationFn: (payload: App.Types.Place.PlaceCreate) =>
      placeService.addPlace(payload),
    onSuccess: () => {
      formRef.current?.done();
      refetch();
    },
    onError: () => {
      formRef.current?.fail();
    },
    messageConfigs: {
      successMessage: "Thêm địa điểm thành công",
      errorMessage: "Thêm địa điểm thất bại"
    }
  });

  const { mutate: updatePlace } = useCustomMutation({
    mutationFn: (payload: App.Types.Place.PlaceResponse) =>
      placeService.updatePlace(payload),
    onSuccess: () => {
      formRefEdit.current?.done();
      refetch();
    },
    onError: () => {
      formRefEdit.current?.fail();
    },
    messageConfigs: {
      successMessage: "Cập nhật địa điểm thành công",
      errorMessage: "Cập nhật địa điểm thất bại"
    }
  });

  const { mutate: deleteRestrictedWord } = useCustomMutation({
    mutationFn: (id: string) => placeService.deletePlace(id),
    onSuccess: () => {
      refetch();
    },
    messageConfigs: {
      successMessage: "Xóa địa điểm thành công",
      errorMessage: "Xóa địa điểm thất bại"
    }
  });

  const handleFinish: App.Components.FormAdvance.OnFinishEvent<App.Types.RestrictedWord.RestrictedWordCreate> =
    React.useCallback(
      (info) => {
        const { values, api } = info;
        api.loading();
        addRestrictedWord(values);
      },
      [addRestrictedWord]
    );

  const handleFinishEdit: App.Components.FormAdvance.OnFinishEvent<App.Types.RestrictedWord.RestrictedWordUpdate> =
    React.useCallback(
      (info) => {
        const { values, api } = info;
        api.loading();
        console.log(values);

        updatePlace(values);
      },
      [updatePlace]
    );

  const handleDelete = React.useCallback(
    (value: App.Types.Place.PlaceResponse) => {
      showDeleteConfirm(value.name, () => {
        deleteRestrictedWord(value.id);
      });
    },
    [showDeleteConfirm, deleteRestrictedWord]
  );

  const handleEdit = React.useCallback(
    (values: App.Types.Place.PlaceResponse) => {
      formRefEdit.current?.edit(values);
    },
    []
  );

  const handleApprove = React.useCallback(
    (record: App.Types.Place.PlaceResponse) => {
      showApproveConfirm(record.name, () => {
        // approvePlace(record.id);
      });
    },
    [showApproveConfirm]
  );

  const handleReject = React.useCallback(
    (record: App.Types.Place.PlaceResponse) => {
      // showRejectConfirm(record.name, () => {
      //   rejectPlace(record.id);
      // });
    },
    [showRejectConfirm]
  );

  const renderAction = React.useCallback(
    (record: App.Types.Place.PlaceResponse) => {
      return (
        <>
          <Button
            danger
            icon={<DeleteOutlined />}
            type="link"
            onClick={() => handleDelete(record)}
          />
          <Button
            icon={<EditOutlined />}
            type="link"
            onClick={() => handleEdit(record)}
          />
          {record.approvalStatus === "pending" && (
            <>
              <Button
                icon={<CheckCircleOutlined />}
                type="link"
                onClick={() => handleApprove(record)}
              />
              <Button
                icon={<CloseCircleOutlined />}
                type="link"
                onClick={() => handleReject(record)}
              />
            </>
          )}
        </>
      );
    },
    [handleEdit, handleDelete]
  );

  console.log(places);

  return (
    <div className="flex flex-col h-full">
      <AdminContentHeader
        title="Địa điểm"
        description="Quản lý các quán cafe tại Hà Nội"
        buttons={
          <Button
            type="primary"
            onClick={() => {
              formRef.current?.show();
            }}
          >
            <PlusOutlined />
            Thêm địa điểm
          </Button>
        }
      />
      <Table<App.Types.Place.PlaceResponse>
        dataSource={places?.results || []}
        columns={columns}
        renderAction={renderAction}
        pagination={{
          pageSize: 10,
          current: filters.page,
          total: places?.totalResults,
          onChange: (page) => {
            setFilters({ ...filters, page });
          }
        }}
      />
      <FormAdvance
        modalProps={{
          title: "Thêm địa điểm"
        }}
        elements={restrictedWordFormElement}
        elementTypes={elementTypes}
        ref={formRef}
        onFinish={handleFinish}
      />
      <FormAdvance
        modalProps={{
          title: "Sửa địa điểm"
        }}
        elements={restrictedWordFormElementEdit}
        elementTypes={elementTypes}
        ref={formRefEdit}
        onFinish={handleFinishEdit}
      />
    </div>
  );
};

export default RestrictedWordsPage;
