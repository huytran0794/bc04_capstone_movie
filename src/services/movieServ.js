import { https, maNhom } from "./configURL";

export const movieServ = {
  getTheatreChainsList: () => {
    let uri = "/api/QuanLyRap/LayThongTinHeThongRap";
    return https.get(uri);
  },
  getMovieList: () => {
    let uri = `/api/QuanLyPhim/LayDanhSachPhim?maNhom=${maNhom}`;
    return https.get(uri);
  },
  getMovieBanner: () => {
    let uri = `/api/QuanLyPhim/LayDanhSachBanner`;
    return https.get(uri);
  },
  getMovieDetail: (maPhim) => {
    let uri = `/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`;
    return https.get(uri);
  },
  getMoviesByTheatres: () => {
    let uri = `/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${maNhom}`;
    return https.get(uri);
  },
  getMovieShowtimes: (maPhim) => {
    let uri = `/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`;
    return https.get(uri);
  },
  getScheduleDetails: (maLichChieu) => {
    let uri = `/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`;
    return https.get(uri);
  },
  postBookingTicket: (ticketsInfo) => {
    let uri = `/api/QuanLyDatVe/DatVe`;
    return https.post(uri, ticketsInfo);
  },
};
