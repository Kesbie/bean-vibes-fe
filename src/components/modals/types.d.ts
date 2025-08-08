declare namespace App.Components.Modal {
  type AntdModal = import("antd").ModalProps;

  type ModalProps = AntdModal

  type ModalRef = {
    show?: () => void;
    hide?: () => void;
  }
}