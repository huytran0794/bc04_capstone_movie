import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, notification } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { localServ } from "../../../services/localServ";
import { userServ } from "../../../services/userServ";
import { webColor } from "../../constants/colorConstant";
import { setUserInfo } from "../../redux/slices/userSlice";
import Lottie from "lottie-react";
import lottie_flyingRocket from "../../../assets/lottie_flyingRocket.json";
import NotifyModal from "../../../HOC/NotifyModal";
import { setIsLoading } from "../../redux/slices/generalSlice";

const LoginPage = () => {
  let [isNotifyModalOpen, setIsNotifyModalOpen] = useState(false);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  // Notification
  const openNotification = (type) => {
    notification[type]({
      message: (
        <span className="font-semibold text-lg">Đăng nhập thành công</span>
      ),
      description: "Chuyển hướng về trang chủ",
      placement: "top",
    });
  };

  let localUser = localServ.user.get();

  const onFinish = (values) => {
    // console.log("Received values of form: ", values);
    dispatch(setIsLoading(true));
    userServ
      .postLogin(values)
      .then((res) => {
        // console.log(res);
        dispatch(setUserInfo(res.data.content));
        localServ.user.set(res.data.content);
        openNotification("success");
        setTimeout(() => {
          window.location.href = "/";
          dispatch(setIsLoading(false));
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        setIsNotifyModalOpen(true);
        dispatch(setIsLoading(false));
      });
  };

  // HANDLE Notify Modal
  let handleOKClick = () => {
    setIsNotifyModalOpen(false);
  };
  let handleCancelClick = () => {
    setIsNotifyModalOpen(false);
  };

  // RENDER trang Login Page khi đã đăng nhập rồi
  const renderAlreadyLoginPage = () => (
    <div className="text-center">
      <p className="mb-5 text-3xl">
        Xin chào{" "}
        <span className="font-bold text-red-500">{localUser.hoTen}</span>
      </p>
      <p className="text-2xl">Bạn đã đăng nhập thành công</p>
      <button
        type="button"
        className="px-5 py-2.5 bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 rounded-lg focus:ring-red-900 font-medium text-white text-xl transition duration-300"
        onClick={() => {
          navigate("/");
        }}
      >
        Trở về Trang chủ
      </button>
    </div>
  );

  return (
    <>
      <div className="text-white" style={{ background: webColor.bgPrimary }}>
        <div className="container mx-auto w-screen h-screen flex justify-center items-center">
          {localUser ? (
            renderAlreadyLoginPage()
          ) : (
            <>
              <div className="relative w-full md:w-1/2 h-full px-10 flex justify-center items-center">
                <p
                  className="absolute top-10 left-0 right-0 text-center text-white text-xl sm:text-2xl md:text-3xl"
                  style={{ color: webColor.bgPrimary }}
                >
                  Don't be afraid of the Dark
                </p>
                <div className="w-full">
                  <h1 className="mb-6 text-3xl text-white">Đăng nhập</h1>
                  <Form
                    name="normal_login"
                    className="login-form w-full"
                    onFinish={onFinish}
                  >
                    <Form.Item
                      name="taiKhoan"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập tài khoản!",
                        },
                      ]}
                    >
                      <Input
                        prefix={
                          <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="Tài khoản"
                        size="large"
                      />
                    </Form.Item>
                    <Form.Item
                      name="matKhau"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập Mật khẩu",
                        },
                      ]}
                    >
                      <Input
                        prefix={
                          <LockOutlined className="site-form-item-icon" />
                        }
                        type="password"
                        placeholder="Mật khẩu"
                        size="large"
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        type="danger"
                        htmlType="submit"
                        className="login-form-button mt-3"
                        style={{
                          fontSize: "18px",
                          fontWeight: 700,
                          height: "initial",
                        }}
                      >
                        Đăng nhập
                      </Button>
                      Or{" "}
                      <NavLink to="/register">
                        <a
                          href=""
                          className="text-[16px] text-red-500 hover:text-red-400"
                        >
                          Đăng ký
                        </a>
                      </NavLink>
                    </Form.Item>
                  </Form>
                </div>
              </div>
              <div className="w-1/2 h-full hidden md:flex justify-center items-center overflow-hidden">
                <Lottie animationData={lottie_flyingRocket} loop={true} />
              </div>
            </>
          )}
        </div>
      </div>
      <NotifyModal
        isNotifyModalOpen={isNotifyModalOpen}
        handleOKClick={handleOKClick}
        handleCancelClick={handleCancelClick}
      >
        Tài khoản hoặc mật khẩu không đúng. Vui lòng kiểm tra lại.
      </NotifyModal>
    </>
  );
};

export default LoginPage;
