/* import packages */
import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { updateUserInfo } from "../../../redux/slices/userSlice";
import { userServ } from "../../../../services/userServ";
import { localServ } from "../../../../services/localServ";

/* import local components */
import NotifyModal from "../../../../HOC/NotifyModal";
import ProfileForm from "./ProfileForm";

export default function TabProfile({ userProfile }) {
  let [isNotifyModalOpen, setNotifyModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleUpdateUserProfile = (data) => {
    userServ
      .updateUserProfile(data)
      .then((res) => {
        let { taiKhoan, hoTen, email, soDT, maLoaiNguoiDung } =
          res.data.content;
        let currentLoggedInUser = localServ.user.get();
        currentLoggedInUser.taiKhoan = taiKhoan;
        currentLoggedInUser.hoTen = hoTen;
        currentLoggedInUser.email = email;
        currentLoggedInUser.soDT = soDT;
        currentLoggedInUser.maLoaiNguoiDung = maLoaiNguoiDung;

        // update local storage
        localServ.user.set(currentLoggedInUser);
        dispatch(updateUserInfo(data));
        setNotifyModalOpen(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onFinish = (values) => {
    let {
      username: taiKhoan,
      password: matKhau,
      fullname: hoTen,
      useremail: email,
      phone: soDt,
      userType: maLoaiNguoiDung,
    } = values;

    let userDataToSubmit = {
      taiKhoan,
      matKhau,
      hoTen,
      email,
      soDt,
      maLoaiNguoiDung,
      maNhom: userProfile.maNhom,
    };
    handleUpdateUserProfile(userDataToSubmit);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div className="tabProfile py-4">
        <ProfileForm
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          userProfile={userProfile}
        />
      </div>
      <NotifyModal
        isNotifyModalOpen={isNotifyModalOpen}
        handleCancelClick={() => {
          setNotifyModalOpen(false);
        }}
        handleOKClick={() => {
          setNotifyModalOpen(false);
        }}
      >
        Bạn đã cập nhật dữ liệu thành công
      </NotifyModal>
    </>
  );
}
