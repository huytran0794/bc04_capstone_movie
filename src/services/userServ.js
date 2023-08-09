import { https } from "./configURL";

export const userServ = {
  postLogin: (dataLogin) => {
    let uri = `/api/QuanLyNguoiDung/DangNhap`;
    return https.post(uri, dataLogin);
  },
  postRegister: (dataRegister) => {
    let uri = `/api/QuanLyNguoiDung/DangKy`;
    return https.post(uri, dataRegister);
  },

  getUserProfile: () => {
    let uri = `/api/QuanLyNguoiDung/ThongTinTaiKhoan`;
    return https.post(uri);
  },

  updateUserProfile: (dataUserProfile) => {
    let uri = `/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`;
    return https.put(uri, dataUserProfile);
  },
};
