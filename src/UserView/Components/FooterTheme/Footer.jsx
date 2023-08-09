import React, { useEffect, useState } from "react";
import { movieServ } from "../../../services/movieServ";

export default function Footer() {
  let [theatreChainsList, setTheatreChainsList] = useState(null);

  useEffect(() => {
    movieServ
      .getTheatreChainsList()
      .then((res) => {
        // console.log(res);
        setTheatreChainsList(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let renderTheatreChainLogos = () => {
    return theatreChainsList?.map((chain, index) => {
      return (
        <img
          className="w-16 h-16"
          src={chain.logo}
          alt={chain.biDanh}
          key={chain.biDanh.toString() + index}
        />
      );
    });
  };

  return (
    <footer className="py-5">
      <hr className="sm:mx-auto border-gray-700" />
      <div className="xl:max-w-screen-xl container mx-auto pt-8 px-2 sm:px-0 grid grid-cols-2 gap-8 md:grid-cols-3">
        <div>
          <h2 className="mb-4 text-lg font-semibold text-white uppercase">
            Điều khoản sử dụng
          </h2>
          <ul>
            <li className="mb-3">
              <a
                href="#"
                className="text-[16px] text-white/60 hover:text-white"
              >
                Điều Khoản Chung
              </a>
            </li>
            <li className="mb-3">
              <a
                href="#"
                className="text-[16px] text-white/60 hover:text-white"
              >
                Điều Khoản Giao Dịch
              </a>
            </li>
            <li className="mb-3">
              <a
                href="#"
                className="text-[16px] text-white/60 hover:text-white"
              >
                Chính Sách Thanh Toán
              </a>
            </li>
            <li className="mb-3">
              <a
                href="#"
                className="text-[16px] text-white/60 hover:text-white"
              >
                Chính Sách Bảo Mật
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mb-4 text-lg font-semibold text-white uppercase">
            Đối tác
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {renderTheatreChainLogos()}
          </div>
        </div>
        <div>
          <h2 className="mb-4 text-lg font-semibold text-white uppercase">
            Download
          </h2>
          <ul>
            <li className="mb-3">
              <a
                href="#"
                className="text-[16px] text-white/60 hover:text-white"
              >
                iOS
              </a>
            </li>
            <li className="mb-3">
              <a
                href="#"
                className="text-[16px] text-white/60 hover:text-white"
              >
                Android
              </a>
            </li>
            <li className="mb-3">
              <a
                href="#"
                className="text-[16px] text-white/60 hover:text-white"
              >
                Windows
              </a>
            </li>
            <li className="mb-3">
              <a
                href="#"
                className="text-[16px] text-white/60 hover:text-white"
              >
                MacOS
              </a>
            </li>
          </ul>
        </div>
      </div>
      <hr className="my-6 sm:mx-auto lg:my-8 border-gray-700" />
      <div className="px-2 sm:px-5 flex flex-col-reverse lg:flex-row lg:items-center lg:justify-between">
        <div className="lg:w-1/3 mt-4 lg:mt-0 text-[16px] text-gray-400 text-center">
          <p className="mb-0">
            © 2022 <span className="font-semibold text-white">The Miracle</span>
            . All Rights Reserved.
          </p>
        </div>
        <div className="lg:w-1/3 flex justify-center">
          <img className="h-24" src="/movieLogo.png" alt="web-logo" />
        </div>
        <div className="hidden lg:block w-1/3">
          <p></p>
        </div>
      </div>
    </footer>
  );
}

// [
//   {
//       "maHeThongRap": "BHDStar",
//       "tenHeThongRap": "BHD Star Cineplex",
//       "biDanh": "bhd-star-cineplex",
//       "logo": "https://movienew.cybersoft.edu.vn/hinhanh/bhd-star-cineplex.png"
//   },
//   {
//       "maHeThongRap": "CGV",
//       "tenHeThongRap": "cgv",
//       "biDanh": "cgv",
//       "logo": "https://movienew.cybersoft.edu.vn/hinhanh/cgv.png"
//   },
//   {
//       "maHeThongRap": "CineStar",
//       "tenHeThongRap": "CineStar",
//       "biDanh": "cinestar",
//       "logo": "https://movienew.cybersoft.edu.vn/hinhanh/cinestar.png"
//   },
//   {
//       "maHeThongRap": "Galaxy",
//       "tenHeThongRap": "Galaxy Cinema",
//       "biDanh": "galaxy-cinema",
//       "logo": "https://movienew.cybersoft.edu.vn/hinhanh/galaxy-cinema.png"
//   },
//   {
//       "maHeThongRap": "LotteCinima",
//       "tenHeThongRap": "Lotte Cinema",
//       "biDanh": "lotte-cinema",
//       "logo": "https://movienew.cybersoft.edu.vn/hinhanh/lotte-cinema.png"
//   },
//   {
//       "maHeThongRap": "MegaGS",
//       "tenHeThongRap": "MegaGS",
//       "biDanh": "megags",
//       "logo": "https://movienew.cybersoft.edu.vn/hinhanh/megags.png"
//   }
// ]
