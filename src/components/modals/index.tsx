import { Modal as AntdModal } from "antd";
import React from "react";

const Modal = React.forwardRef<
  App.Components.Modal.ModalRef,
  App.Components.Modal.ModalProps
>((props, ref) => {
  const { okText = "Xác nhận", cancelText = "Hủy", onOk, ...rest } = props;

  const [open, setOpen] = React.useState(false);

  const handleOpen = React.useCallback(() => {
    setOpen(true);
  }, []);

  const handleCancel = React.useCallback(() => {
    setOpen(false);
  }, []);

  React.useImperativeHandle(ref, () => ({
    show: handleOpen,
    hide: handleCancel
  }));

  const handleOke = React.useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <AntdModal
      open={open}
      onCancel={handleCancel}
      okText={okText}
      cancelText={cancelText}
      onOk={onOk || handleOke}
      {...rest}
    />
  );
});

Modal.displayName = "Modal";

export default Modal;
