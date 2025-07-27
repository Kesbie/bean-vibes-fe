import React, { useState } from "react";
import { Form, Modal } from "antd";
import { DynamicRenderer } from "./dynamic-render";
import { cn } from "@/lib/utils";
import { nanoid } from "nanoid";
import { getObjectValuesDiff, removeUndefinedValues } from "./utils";

const FormAdvance = <T extends object & { _id?: string }>(
  props: App.Components.FormAdvance.FormAdvanceProps<T>,
  ref: React.Ref<App.Components.FormAdvance.FormAdvanceRef>
) => {
  const {
    className,
    elements,
    elementTypes,
    form = Form!.useForm<T>()[0],
    hasModal = true,
    layout = "vertical",
    modalProps,
    name = nanoid(),
    onFinish,
    cols = 2,
    ...restProps
  } = props;

  const {
    cancelText = "Hủy",
    className: modalClassName = "min-w-[800px]",
    okText = "Xác nhận",
    destroyOnHidden = true,
    open,
    ...restModalProps
  } = modalProps || {};

  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmLoading, setIsConfirmLoading] = useState(false);
  const initialEditValues = React.useRef<T>();

  const show = React.useCallback(() => {
    setIsOpen(true);
  }, []);

  const hide = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  const edit = React.useCallback(
    (values: T) => {
      console.log(values);
      setIsOpen(true);
      initialEditValues.current = values;
      form.setFieldsValue(values);
    },
    [form]
  );

  const handleOke = React.useCallback(() => {
    form.submit();
  }, [form]);

  const reset = React.useCallback(() => {
    form.resetFields();
  }, [form]);

  const loading = React.useCallback(() => {
    setIsConfirmLoading(true);
  }, []);

  const done = React.useCallback(() => {
    setIsConfirmLoading(false);
    hide();
    reset();
  }, [reset, hide]);

  const fail = React.useCallback(() => {
    setIsConfirmLoading(false);
  }, []);

  const getApi = React.useCallback(() => {
    return {
      show,
      hide,
      edit,
      loading,
      done,
      reset,
      fail
    };
  }, [show, hide, edit, reset, loading, done, fail]);

  React.useImperativeHandle(ref, getApi, [getApi]);

  const handleFinish = React.useCallback(
    (values: T) => {
      const isEdit = !!initialEditValues.current;

      if (!isEdit) {
        onFinish?.({
          values: removeUndefinedValues(values) as T,
          form,
          api: getApi()
        });
        return;
      }

      const diff = getObjectValuesDiff(initialEditValues.current!, values);

      if (Object.keys(diff).length === 0) {
        done();
        return;
      }

      onFinish?.({
        values: removeUndefinedValues(diff) as T,
        form,
        api: getApi()
      });
    },
    [onFinish, form, done, getApi]
  );

  const formContent = (
    <Form<T>
      className={cn(`grid gap-4`, className)}
      layout={layout}
      form={form}
      onFinish={handleFinish}
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      id={name}
      {...restProps}
    >
      <DynamicRenderer
        elements={elements}
        elementTypes={elementTypes}
        form={form}
      />
    </Form>
  );

  const modalContent = (
    <Modal
      open={open || isOpen}
      confirmLoading={isConfirmLoading}
      onCancel={hide}
      onOk={handleOke}
      okText={okText}
      centered
      cancelText={cancelText}
      className={modalClassName}
      destroyOnHidden={destroyOnHidden}
      {...restModalProps}
    >
      {formContent}
    </Modal>
  );

  return hasModal ? modalContent : formContent;
};

export default React.memo(React.forwardRef(FormAdvance)) as <
  TData extends object
>(
  props: React.PropsWithoutRef<
    App.Components.FormAdvance.FormAdvanceProps<TData>
  > &
    React.RefAttributes<App.Components.FormAdvance.FormAdvanceRef>
) => ReturnType<typeof FormAdvance>;
