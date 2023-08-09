import { Tag } from "antd";
import moment from "moment";
import React from "react";
import { NavLink } from "react-router-dom";

export default function MovieTabItem({ movie }) {
  let renderSchedule = (lstLichChieuTheoPhim) => (
    <div className="mb-2">
      {lstLichChieuTheoPhim.slice(0, 5).map((lichChieu, index) => (
        <NavLink
          to={`/selectseat/${lichChieu.maLichChieu}`}
          key={lichChieu.maLichChieu.toString() + index}
        >
          <button className="px-5 py-2.5 m-1.5 border rounded-lg border-white/50 hover:border-white font-medium text-sm text-center text-white/50 hover:text-white transition duration-300">
            {moment(lichChieu.ngayChieuGioChieu).format("DD/MM/YYYY hh:mm a")}
            {/* 2019-01-01T10:10:00 */}
          </button>
        </NavLink>
      ))}
    </div>
  );
  return (
    <div className="flex space-x-4">
      <img
        className="w-1/5 object-cover"
        src={movie.hinhAnh}
        alt={movie.maPhim}
      />
      <div className="text-white">
        <p className="mb-2 font-bold text-xl">
          {movie.tenPhim}{" "}
          {movie.hot ? (
            <Tag color="#f50" className="font-bold align-top">
              HOT
            </Tag>
          ) : (
            <></>
          )}
        </p>
        <p className="mb-1 text-lg">Lịch chiếu:</p>
        {renderSchedule(movie.lstLichChieuTheoPhim)}
        <NavLink to={`/booking/${movie.maPhim}`}>
          <button className="ml-2 p-1 bg-white/70 hover:bg-white rounded-sm uppercase font-semibold text-black transition duration-300">
            Xem thêm
          </button>
        </NavLink>
      </div>
    </div>
  );
}

// {
//   "lstLichChieuTheoPhim": [
//       {
//           "maLichChieu": 40543,
//           "maRap": "910",
//           "tenRap": "Rạp 10",
//           "ngayChieuGioChieu": "2020-10-10T16:30:00",
//           "giaVe": 200000
//       }
//   ],
//   "maPhim": 4125,
//   "tenPhim": "Ròm 384",
//   "hinhAnh": "https://movienew.cybersoft.edu.vn/hinhanh/rom_gp02.jpg",
//   "hot": true,
//   "dangChieu": false,
//   "sapChieu": true
// }
