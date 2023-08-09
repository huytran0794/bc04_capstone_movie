import { Tag } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { movieServ } from "../../../services/movieServ";

export default function DetailMovie() {
  let [movieDetail, setMovieDetail] = useState(null);

  let params = useParams();

  useEffect(() => {
    movieServ
      .getMovieDetail(params.maPhim)
      .then((res) => {
        // console.log(res);
        setMovieDetail(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let getYouTubeLink = (shortenLink) => {
    console.log(shortenLink);
    let youTubeIndex = shortenLink.indexOf("youtube.com/embed");
    if (youTubeIndex !== -1) {
      return shortenLink;
    }
    youTubeIndex = shortenLink.indexOf("youtu.be");
    return `https://www.youtube.com/embed/${shortenLink.slice(
      youTubeIndex + 9
    )}`;
  };

  return (
    <>
      <iframe
        width="100%"
        height="500px"
        src={movieDetail ? getYouTubeLink(movieDetail.trailer) : null}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div className="container xl:max-w-screen-xl mx-auto my-8 px-2 sm:px-0 flex">
        <div className="movieShortDetails mb-5 mr-4 sm:mr-0 w-1/4 flex-shrink-0">
          <div>
            <p className="mb-0 mr-2 font-bold text-2xl">
              <span className="mr-2">{movieDetail?.tenPhim}</span>
              {movieDetail?.hot ? (
                <Tag color="#f50" className="font-bold align-top">
                  HOT
                </Tag>
              ) : (
                <></>
              )}
            </p>
          </div>
          <p>
            Rating:{" "}
            <span className="font-semibold text-lg text-red-500">
              {movieDetail?.danhGia}
            </span>
            /10
          </p>
          <NavLink to={`/booking/${movieDetail?.maPhim}`}>
            <button
              type="button"
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-3 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              ĐẶT VÉ NGAY
            </button>
          </NavLink>
          <p className="mb-2 text-lg">Khởi chiếu:</p>
          <p className="mb-2 font-bold text-xl">
            {moment(movieDetail?.ngayKhoiChieu).format("MMM DD, YYYY")}
          </p>
        </div>
        <div>
          <p className="mb-2 text-xl leading-loose text-justify">
            {movieDetail?.moTa}
          </p>
        </div>
      </div>
    </>
  );
}

// {
//   "maPhim": 1480,
//   "tenPhim": "The Longest Rided 2010",
//   "biDanh": "the-longest-rided-2010",
//   "trailer": "https://youtu.be/uEDb35R7na8",
//   "hinhAnh": "https://movienew.cybersoft.edu.vn/hinhanh/thewalkingdead.jpg",
//   "moTa": "After an automobile crash, the lives of a young couple intertwine with a much older man, as he reflects back on a past love.",
//   "maNhom": "GP02",
//   "hot": true,
//   "dangChieu": true,
//   "sapChieu": false,
//   "ngayKhoiChieu": "2022-09-25T12:10:53.49",
//   "danhGia": 10
// }
