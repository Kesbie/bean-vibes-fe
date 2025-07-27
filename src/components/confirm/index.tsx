import { Modal } from "antd";

const Confirm = ({ title, content, onOk, onCancel }: { title: string, content: string, onOk: () => void, onCancel: () => void }) => {
  return <Modal title={title} open={open} onOk={onOk} onCancel={onCancel}>
    {content}
  </Modal>;
};

export default Confirm;