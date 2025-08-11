"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { placeService } from "@/services";
import { Button, Image, Typography } from "antd";
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
import { PLACE_APPROVAL_STATUS } from "@/constants";
import Modal from "@/components/modals";
import { omit } from "lodash";


const RestrictedWordsPage = () => {
  const { isAdmin } = useAuth();

  const descriptionModalRef = React.useRef<App.Components.Modal.ModalRef>(null);
  const photosModalRef = React.useRef<App.Components.Modal.ModalRef>(null);

  const [description, setDescription] = React.useState<string>("");
  const [photos, setPhotos] = React.useState<App.Types.Place.Photo[]>([]);

  const [filters, setFilters] = React.useState({
    page: 1,
    limit: 10,
    sortBy: "approvalStatus"
  });

  const { data: places, refetch } = useQuery({
    queryKey: ["places", filters.page, filters.limit],
    queryFn: () => placeService.getAdminPlaces(filters).then((res) => res.data),
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

  const { mutate: deletePlace } = useCustomMutation({
    mutationFn: (id: string) => placeService.deleteAdminPlace(id),
    onSuccess: () => {
      refetch();
    },
    messageConfigs: {
      successMessage: "Xóa địa điểm thành công",
      errorMessage: "Xóa địa điểm thất bại"
    }
  });

  const { mutate: approvePlace } = useCustomMutation({
    mutationFn: (id: string) =>
      placeService.changePlaceApprovalStatus(id, {
        status: PLACE_APPROVAL_STATUS.APPROVED
      }),
    onSuccess: () => {
      refetch();
    },
    messageConfigs: {
        successMessage: "Duyệt địa điểm thành công",
        errorMessage: "Duyệt địa điểm thất bại"
    }
  });

  const { mutate: rejectPlace } = useCustomMutation({
    mutationFn: (payload: App.Types.Place.PlaceChangeApprovalStatusUpdate) =>
      placeService.changePlaceApprovalStatus(payload.id, {
        status: PLACE_APPROVAL_STATUS.REJECTED,
        reason: payload.reason
      }),
    onSuccess: () => {
      refetch();
    },
    messageConfigs: {
      successMessage: "Từ chối địa điểm thành công",
      errorMessage: "Từ chối địa điểm thất bại"
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
        deletePlace(value.id);
      });
    },
    [showDeleteConfirm, deletePlace]
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
        approvePlace(record.id);
      });
    },
    [showApproveConfirm, approvePlace]
  );

  const handleReject = React.useCallback(
    (record: App.Types.Place.PlaceResponse) => {
      showRejectConfirm(record.name, (reason) => {
        rejectPlace({
          id: record.id,
          reason
        });
      });
    },
    [showRejectConfirm, rejectPlace]
  );

  const renderAction = React.useCallback(
    (record: App.Types.Place.PlaceResponse) => {
      console.log(record);
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

  const handleShowDescription = React.useCallback((description: string) => {
    setDescription(description);
    descriptionModalRef.current?.show();
  }, []);

  const handleShowPhotos = React.useCallback(
    (photos: App.Types.Place.Photo[]) => {
      setPhotos(photos);
      photosModalRef.current?.show();
    },
    []
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
        columns={columns(handleShowDescription, handleShowPhotos)}
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
      <Modal ref={descriptionModalRef} title="Nội dung">
        <Typography.Text>{description}</Typography.Text>
      </Modal>
      <Modal ref={photosModalRef} title="Ảnh">
        <div className="flex flex-wrap ">
          <Image.PreviewGroup
            preview={{
              onChange: (current, prev) =>
                console.log(`current index: ${current}, prev index: ${prev}`)
            }}
          >
            {photos.map((photo, index) => (
              <Image
                className="rounded-lg mx-1"
                width={100}
                height={100}
                style={{ objectFit: "cover" }}
                src={photo.url}
                key={index}
                alt={`ảnh ${index}`}
              />
            ))}
          </Image.PreviewGroup>
        </div>
      </Modal>
    </div>
  );
};

export default RestrictedWordsPage;
