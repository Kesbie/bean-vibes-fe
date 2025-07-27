"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { restrictedWordService } from "@/services";
import { Button } from "antd";
import { columns } from "./columns";
import { AdminContentHeader } from "@/components/admin-content-header";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
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

const RestrictedWordsPage = () => {
  // const { user } = useAuth();

  const [filters, setFilters] = React.useState<{
    page: number;
    limit: number;
  }>({
    page: 1,
    limit: 10
  });

  const { data: restrictedWords, refetch } = useQuery({
    queryKey: ["restricted-words"],
    queryFn: () =>
      restrictedWordService
        .getRestrictedWords({})
        .then((res) => res.data)
  });

  const { showDeleteConfirm } = useConfirmModal();

  const formRef = React.useRef<App.Components.FormAdvance.FormAdvanceRef>(null);
  const formRefEdit =
    React.useRef<App.Components.FormAdvance.FormAdvanceRef>(null);

  const { mutate: addRestrictedWord } = useCustomMutation({
    mutationFn: (payload: App.Types.RestrictedWord.RestrictedWordCreate) =>
      restrictedWordService.addRestrictedWord(payload),
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
    mutationFn: (payload: App.Types.RestrictedWord.RestrictedWordUpdate) =>
      restrictedWordService.updateRestrictedWord(payload),
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

  const { mutate: deleteRestrictedWord } = useCustomMutation({
    mutationFn: (id: string) => restrictedWordService.deleteRestrictedWord(id),
    onSuccess: () => {
      refetch();
    },
    messageConfigs: {
      successMessage: "Xóa từ khóa thành công",
      errorMessage: "Xóa từ khóa thất bại"
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

        updateRestrictedWord(values);
      },
      [updateRestrictedWord]
    );

  const handleDelete = React.useCallback(
    (value: App.Types.RestrictedWord.RestrictedWordResponse) => {
      showDeleteConfirm(value.word, () => {
        deleteRestrictedWord(value.id);
      });
    },
    [showDeleteConfirm, deleteRestrictedWord]
  );

  const handleEdit = React.useCallback(
    (values: App.Types.RestrictedWord.RestrictedWordUpdate) => {
      formRefEdit.current?.edit(values);
    },
    []
  );

  const renderAction = React.useCallback(
    (record: App.Types.RestrictedWord.RestrictedWordResponse) => {
      return (
        <>
          <Button
            danger
            icon={<DeleteOutlined />}
            type="link"
            onClick={() => handleDelete(record)}
          >
            Xóa
          </Button>
          <Button
            icon={<EditOutlined />}
            type="link"
            onClick={() => handleEdit(record)}
          >
            Sửa
          </Button>
        </>
      );
    },
    [handleEdit, handleDelete]
  );

  return (
    <div className="flex flex-col h-full">
      <AdminContentHeader
        title="Quản lý từ khoá nhạy cảm"
        description="Quản lý từ khoá nhạy cảm"
        buttons={
          <Button
            type="primary"
            onClick={() => {
              formRef.current?.show();
            }}
          >
            <PlusOutlined />
            Thêm danh mục
          </Button>
        }
      />
      <Table<App.Types.RestrictedWord.RestrictedWordResponse>
        dataSource={restrictedWords?.results || []}
        columns={columns}
        renderAction={renderAction}
        pagination={{
          pageSize: 10,
          current: filters.page,
          total: restrictedWords?.totalResults,
          onChange: (page) => {
            setFilters({ ...filters, page });
          }
        }}
      />
      <FormAdvance
        modalProps={{
          title: "Thêm từ khóa"
        }}
        elements={restrictedWordFormElement}
        elementTypes={elementTypes}
        ref={formRef}
        onFinish={handleFinish}
      />
      <FormAdvance
        modalProps={{
          title: "Sửa từ khóa"
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
