"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { categoryService } from "@/services";
import { Button, UploadFile } from "antd";
import { columns } from "./columns";
import { AdminContentHeader } from "@/components/admin-content-header";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
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

const RestrictedWordsPage = () => {
  // const { user } = useAuth();

  const [filters, setFilters] = React.useState<{
    page: number;
    limit: number;
  }>({
    page: 1,
    limit: 10
  });

  const { data: categories, refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      categoryService.getCategories({}).then((res) => res.data)
  });

  const { showDeleteConfirm } = useConfirmModal();

  const formRef = React.useRef<App.Components.FormAdvance.FormAdvanceRef>(null);
  const formRefEdit =
    React.useRef<App.Components.FormAdvance.FormAdvanceRef>(null);

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

  const { mutate: deleteRestrictedWord } = useCustomMutation({
    mutationFn: (id: string) => categoryService.deleteCategory(id),
    onSuccess: () => {
      refetch();
    },
    messageConfigs: {
      successMessage: "Xóa từ khóa thành công",
      errorMessage: "Xóa từ khóa thất bại"
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

  const handleDelete = React.useCallback(
    (value: App.Types.Category.CategoryResponse) => {
      showDeleteConfirm(value.name, () => {
        deleteRestrictedWord(value.id);
      });
    },
    [showDeleteConfirm, deleteRestrictedWord]
  );

  const handleEdit = React.useCallback(
    (values: App.Types.Category.CategoryResponse) => {
      const data = {
        ...values,
        thumbnail: [values]
      };

      formRefEdit.current?.edit(data);
    },
    []
  );

  const renderAction = React.useCallback(
    (record: App.Types.Category.CategoryResponse) => {
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
        title="Quản lý danh mục"
        description="Quản lý danh mục"
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
      <Table<App.Types.Category.CategoryResponse>
        dataSource={categories?.results || []}
        columns={columns}
        renderAction={renderAction}
        pagination={{
          pageSize: 10,
          current: filters.page,
          total: categories?.totalResults,
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
    </div>
  );
};

export default RestrictedWordsPage;
