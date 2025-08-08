import Modal from "@/components/modals";
import React from "react";

const LoginModal = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = React.useCallback(() => {
    setOpen(true);
  }, []);

  return <Modal />;
};

export default LoginModal;