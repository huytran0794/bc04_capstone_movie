import { message } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import NotifyModal from "../../../HOC/NotifyModal";
import { localServ } from "../../../services/localServ";
import { removeUserInfo } from "../../redux/slices/userSlice";

export default function UserNav() {
  let [isNotifyModalOpen, setNotifyModalOpen] = useState(false);

  let dispatch = useDispatch();
  let user = useSelector((state) => state.userSlice.user);

  let handleLogOut = () => {
    localServ.user.remove();
    dispatch(removeUserInfo());
    setNotifyModalOpen(false);
    message.success("Đăng xuất thành công", 2);
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  };

  let renderContent = () => {
    if (user) {
      return (
        <div className="flex flex-col justify-center text-center">
          <span className="text-white text-[16px] md:text-lg">
            Xin chào{" "}
            <NavLink to="/profile" className="group inline-block ml-2">
              <span className="font-bold text-lg md:text-xl text-red-500 group-hover:text-indigo-500 transition-all duration-700">
                {user.hoTen}
              </span>
            </NavLink>
          </span>
          <button
            type="button"
            className="px-4 py-1 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg hover:border-gray-600 focus:ring-4 focus:ring-gray-700 focus:outline-none font-medium text-sm text-white"
            onClick={() => {
              setNotifyModalOpen(true);
            }}
          >
            Đăng xuất
          </button>
        </div>
      );
    }
    return (
      <div>
        <NavLink to="/login">
          <button
            type="button"
            className="px-2 lg:px-5 py-2.5 mr-2 bg-red-600 hover:bg-red-700 rounded-lg focus:ring-4 focus:outline-none focus:ring-red-900 font-medium text-xs lg:text-sm text-white transition duration-300"
          >
            Đăng nhập
          </button>
        </NavLink>
        <NavLink to="/register">
          <button
            type="button"
            className="px-2 lg:px-5 py-2.5 bg-transparent border-2 border-red-600 hover:border-red-700 rounded-lg focus:ring-4 focus:outline-none focus:ring-red-900 font-medium text-xs lg:text-sm text-red-600 hover:text-red-700 transition duration-300"
          >
            Đăng ký
          </button>
        </NavLink>
      </div>
    );
  };
  return (
    <>
      {renderContent()}
      <NotifyModal
        isNotifyModalOpen={isNotifyModalOpen}
        handleCancelClick={() => {
          setNotifyModalOpen(false);
        }}
        handleOKClick={handleLogOut}
      >
        Bạn có muốn đăng xuất?
      </NotifyModal>
    </>
  );
}
