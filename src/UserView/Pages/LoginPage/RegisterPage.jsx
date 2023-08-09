import {
  LockOutlined,
  UserOutlined,
  MobileOutlined,
  NumberOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, notification } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { localServ } from "../../../services/localServ";
import { userServ } from "../../../services/userServ";
import { webColor } from "../../constants/colorConstant";
import Lottie from "lottie-react";
import lottie_flyingRocket from "../../../assets/lottie_flyingRocket.json";
import NotifyModal from "../../../HOC/NotifyModal";
import { useDispatch } from "react-redux";
import { setIsLoading } from "../../redux/slices/generalSlice";

const RegisterPage = () => {
  let [isNotifyModalOpen, setIsNotifyModalOpen] = useState(false);
  let [errMessage, setErrMessage] = useState(null);
  let navigate = useNavigate();
  let dispatch = useDispatch();

  // Notification
  const openNotification = (type) => {
    notification[type]({
      message: (
        <span className="font-semibold text-lg">Đăng ký thành công</span>
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
      .postRegister(values)
      .then((res) => {
        // console.log(res);
        openNotification("success");
        setTimeout(() => {
          window.location.href = "/";
          dispatch(setIsLoading(false));
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        setErrMessage(err.response.data.content);
        setIsNotifyModalOpen(true);
        dispatch(setIsLoading(false));
      });
  };

  // HANDLE Notify Modal
  let handleOKClick = () => {
    setIsNotifyModalOpen(false);
    setErrMessage(null);
  };
  let handleCancelClick = () => {
    setIsNotifyModalOpen(false);
    setErrMessage(null);
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
        <div className="container mx-auto h-screen flex justify-center items-center">
          {localUser ? (
            renderAlreadyLoginPage()
          ) : (
            <>
              <div className="relative w-full md:w-1/2 h-full px-10 flex justify-center items-center">
                <p
                  className="absolute top-10 left-0 right-0 font-bold text-center text-xl sm:text-2xl md:text-3xl"
                  style={{ color: webColor.bgPrimary }}
                >
                  Don't be afraid of the Dark
                </p>
                <div className="w-full">
                  <h1 className="mb-6 text-3xl text-white">Đăng ký</h1>
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
                          message: "Vui lòng nhập Tài khoản!",
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
                        {
                          min: 6,
                          message: "Vui lòng nhập mật khẩu dài hơn 5 ký tự",
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
                    <Form.Item
                      name="reMatKhau"
                      dependencies={["matKhau"]}
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập Xác nhận mật khẩu",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue("matKhau") === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error(
                                "Xác nhận mật khẩu và mât khẩu băt buộc phải giống nhau"
                              )
                            );
                          },
                        }),
                      ]}
                    >
                      <Input
                        prefix={
                          <LockOutlined className="site-form-item-icon" />
                        }
                        type="password"
                        placeholder="Vui lòng nhập xác nhận mật khẩu..."
                        size="large"
                      />
                    </Form.Item>
                    <Form.Item
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập email",
                        },
                        {
                          type: "email",
                          message:
                            "Vui lòng nhập email đúng định dạng Johndoe@email.com",
                        },
                      ]}
                    >
                      <Input
                        prefix={
                          <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="Johndoe@email.com"
                        size="large"
                      />
                    </Form.Item>
                    <Form.Item
                      name="soDt"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập Số điện thoại",
                        },
                        {
                          pattern: /^(?:\d*)$/,
                          message: "Số điện thoại không được phép có ký tự lạ",
                        },
                      ]}
                    >
                      <Input
                        prefix={<MobileOutlined />}
                        placeholder="Số điện thoại"
                        size="large"
                      />
                    </Form.Item>
                    <Form.Item
                      name="maNhom"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập Mã nhóm",
                        },
                      ]}
                    >
                      <Input
                        prefix={<NumberOutlined />}
                        placeholder="Mã nhóm"
                        size="large"
                      />
                    </Form.Item>
                    <Form.Item
                      name="hoTen"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập Họ và tên",
                        },
                        {
                          pattern: /^[A-Za-z\s]*$/i,
                          message: "Họ và tên chỉ được phép nhập các chữ cái",
                        },
                      ]}
                    >
                      <Input
                        prefix={<IdcardOutlined />}
                        placeholder="Họ và tên"
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
                        ĐĂNG KÝ
                      </Button>
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
        {errMessage ? errMessage : "Đăng ký thất bại. Vui lòng thử lại sau"}
      </NotifyModal>
    </>
  );
};

export default RegisterPage;
