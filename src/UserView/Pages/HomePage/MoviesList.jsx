import React from "react";
import { Card } from "antd";
import { webColor } from "../../constants/colorConstant";
import moment from "moment";
import { hideLongString } from "../../../utils/utils";
import { NavLink } from "react-router-dom";

export default function MoviesList({ moviesList }) {
  let renderMovieItem = (movie) => (
    <>
      <Card
        style={{
          width: "100%",
          height: "530px",
          background: webColor.bgPrimary,
          color: "white",
        }}
        bodyStyle={{
          height: "230px",
          padding: "0.8rem",
        }}
        bordered={false}
        cover={
          <NavLink to={`/detail/${movie.maPhim}`}>
            <img
              alt={movie.biDanh}
              src={movie.hinhAnh}
              style={{ width: "100%", height: "300px", objectFit: "cover" }}
              className="hover:scale-105 transition duration-300"
            />
          </NavLink>
        }
      >
        <div className="h-full flex flex-col justify-between">
          <div className="text-white/70">
            <NavLink to={`/detail/${movie.maPhim}`}>
              <span className="truncate block font-semibold text-lg text-white">
                {movie.tenPhim}
              </span>
            </NavLink>
            <p className="text-justify mt-2">
              {hideLongString(movie.moTa, 70)}
            </p>
            <p className="font-semibold">
              Khởi chiếu:{" "}
              <span className="text-white">
                {moment(movie.ngayKhoiChieu).format("DD [Tháng] MM, YYYY")}
              </span>
            </p>
          </div>
          <div className="text-center">
            <NavLink to={`/booking/${movie.maPhim}`}>
              <button
                type="button"
                className="px-8 py-2.5 bg-red-600 hover:bg-red-700 rounded-3xl focus:ring-4 focus:outline-none focus:ring-red-900 font-medium text-xl text-white transition duration-300"
              >
                Đặt vé ngay
              </button>
            </NavLink>
          </div>
        </div>
      </Card>
    </>
  );
  return (
    <div className="my-10">
      <h3 className="font-semibold text-white text-2xl">DANH SÁCH PHIM</h3>
      <div className="grid grid-cols-1 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5">
        {moviesList.map((movie, index) => (
          <div key={movie.maPhim.toString() + index}>
            {renderMovieItem(movie)}
          </div>
        ))}
      </div>
    </div>
  );
}

// {
//     "maPhim": 1480,
//     "tenPhim": "The Longest Rided 2010",
//     "biDanh": "the-longest-rided-2010",
//     "trailer": "https://youtu.be/uEDb35R7na8",
//     "hinhAnh": "https://movienew.cybersoft.edu.vn/hinhanh/thewalkingdead.jpg",
//     "moTa": "After an automobile crash, the lives of a young couple intertwine with a much older man, as he reflects back on a past love.",
//     "maNhom": "GP02",
//     "ngayKhoiChieu": "2022-09-25T12:10:53.49",
//     "danhGia": 10,
//     "hot": true,
//     "dangChieu": true,
//     "sapChieu": false
// }
