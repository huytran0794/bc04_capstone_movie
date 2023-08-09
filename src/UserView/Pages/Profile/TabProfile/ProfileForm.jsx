/* import packages */
import { Form, Input, Select } from "antd";
import clsx from "clsx";
import React from "react";

/* import local components */
import Label from "../Label/Label";
import CustomButton from "../Button/CustomButton";

const labelItem = (labelText) => (
  <Label className="text-lg font-semibold text-white">{labelText}</Label>
);
export default function ProfileForm({
  onFinish,
  onFinishFailed,
  formLayout = "vertical",
  size = "large",
  className,
  userProfile,
}) {
  const formInitialValues = {
    username: userProfile.taiKhoan,
    password: userProfile.matKhau,
    fullname: userProfile.hoTen,
    useremail: userProfile.email,
    phone: userProfile.soDT,
    userType: userProfile.maLoaiNguoiDung,
  };
  const [form] = Form.useForm();
  const { Option } = Select;
  return (
    <Form
      name="profleForm"
      layout={formLayout}
      form={form}
      initialValues={formInitialValues}
      size={size}
      wrapperCol={{
        span: 10,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className={clsx("profile-form", "text-lg", className)}
    >
      <Form.Item
        label={labelItem("tài khoản")}
        name="username"
        className="mb-6 last:mb-0"
        hasFeedback
      >
        <Input
          disabled
          placeholder="Enter your username..."
          className="py-2 rounded-md outline-none border-2 border-solid border-transparent  hover:border-[#1A2030] focus:border-[#1A2030] transition-all duration-700"
        />
      </Form.Item>

      <Form.Item
        label={labelItem("mật khẩu")}
        name="password"
        rules={[
          { required: true },
          { min: 6, message: "Username must be minimum 6 characters." },
        ]}
        hasFeedback
        className="mb-6"
      >
        <Input.Password
          placeholder="Enter your password..."
          className="py-2 rounded-md outline-none border-2 border-solid border-transparent  hover:border-[#1A2030] focus:border-[#1A2030] transition-all duration-700"
        />
      </Form.Item>

      <Form.Item
        label={labelItem("Họ và Tên")}
        name="fullname"
        rules={[
          { required: true },
          {
            pattern: /^[A-Za-z\s]*$/i,
            message: "Name must not contain number",
          },
        ]}
        className="mb-6"
        hasFeedback
      >
        <Input
          placeholder="Enter your fullname..."
          className="py-2 rounded-md outline-none border-2 border-solid border-transparent hover:border-[#1A2030] focus:border-[#1A2030] transition-all duration-700"
        />
      </Form.Item>
      <Form.Item
        label={labelItem("email")}
        name="useremail"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
        className="mb-6"
        hasFeedback
      >
        <Input
          placeholder="Johndoe@email.com"
          className="py-2 rounded-md outline-none border-2 border-solid border-transparent hover:border-[#1A2030] focus:border-[#1A2030] transition-all duration-700"
        />
      </Form.Item>
      <Form.Item
        label={labelItem("Số điện thoại")}
        name="phone"
        rules={[
          { required: true },
          {
            pattern: /^(?:\d*)$/,
            message: "Phone number should contain just number",
          },
        ]}
        className="mb-6"
        hasFeedback
      >
        <Input
          placeholder="089123456"
          className="py-2 rounded-md outline-none border-2 border-solid border-transparent hover:border-[#1A2030] focus:border-[#1A2030] transition-all duration-700"
        />
      </Form.Item>

      <Form.Item
        name="userType"
        label={
          <Label className="text-lg font-semibold text-white">
            Loại tài khoản
          </Label>
        }
        className={userProfile.maLoaiNguoiDung === "KhachHang" && "hidden"}
      >
        <Select>
          <Option value="KhachHang">Khách hàng</Option>
          <Option value="QuanTri">Quản trị</Option>
        </Select>
      </Form.Item>

      <Form.Item className="w-full">
        <CustomButton
          btnType="btnPink"
          className="w-full py-6 px-12 font-bold text-xl h-14"
          htmlType="submit"
        >
          Update profile
        </CustomButton>
      </Form.Item>
    </Form>
  );
}
