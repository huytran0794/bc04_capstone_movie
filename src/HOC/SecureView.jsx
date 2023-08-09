import React from "react";
import { localServ } from "../services/localServ";
import NotifyModal from "./NotifyModal";

export default function SecureView({ children }) {
  let localUser = localServ.user.get();

  let handleOKClick = () => {
    window.location.href = "/login";
  };

  let handleCancelClick = () => {
    window.location.href = "/";
  };

  if (localUser) {
    return children;
  }
  return (
    <NotifyModal
      isNotifyModalOpen={true}
      handleOKClick={handleOKClick}
      handleCancelClick={handleCancelClick}
    >
      Vui lòng đăng nhập để thực hiện tính năng này
    </NotifyModal>
  );
}
