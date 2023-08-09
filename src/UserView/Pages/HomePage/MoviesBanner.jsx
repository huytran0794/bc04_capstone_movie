import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper modules
import { Navigation, Pagination } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { movieStyle } from "../../../styles/movieStyle";
import { movieServ } from "../../../services/movieServ";
import { NavLink } from "react-router-dom";

export default function MoviesBanner() {
  let [bannerList, setBannerList] = useState(null);

  useEffect(() => {
    movieServ
      .getMovieBanner()
      .then((res) => {
        console.log(res);
        setBannerList(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const renderBannerDetails = () => {
    if (!bannerList) return null;
    return bannerList.map((banner, index) => {
      return (
        <SwiperSlide key={banner.maPhim.toString() + index}>
          <div
            style={movieStyle.bannerWrapper}
            className="homePage__banner-wrapper"
          >
            <img
              src={banner.hinhAnh}
              alt={banner.maPhim}
              style={movieStyle.bannerImage}
            />
            <div
              style={movieStyle.bannerOverlay}
              className="homePage__banner-overlay"
            >
              <NavLink to={`/detail/${banner.maPhim}`}>
                <button
                  type="button"
                  className="mr-5 p-8 bg-gray-800/75 hover:bg-gray-700/75 border border-gray-600 rounded-lg focus:outline-none focus:ring-4 focus:ring-gray-700 font-medium text-white text-xl transition duration-300"
                >
                  Xem chi tiết
                </button>
              </NavLink>
              <NavLink to={`/booking/${banner.maPhim}`}>
                <button
                  type="button"
                  className="p-8 bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 rounded-lg focus:ring-red-900 font-medium text-white text-xl transition duration-300"
                >
                  Đặt vé
                </button>
              </NavLink>
            </div>
          </div>
        </SwiperSlide>
      );
    });
  };

  return (
    <Swiper
      className="homePage__banner"
      modules={[Navigation, Pagination]}
      spaceBetween={50}
      slidesPerView={1}
      loop={true}
      navigation
      pagination={{ clickable: true }}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {renderBannerDetails()}
    </Swiper>
  );
}

// {
//   "maBanner": 1,
//   "maPhim": 1282,
//   "hinhAnh": "https://movienew.cybersoft.edu.vn/hinhanh/ban-tay-diet-quy.png"
// }
