import { Tabs, Tag } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { movieServ } from "../../../services/movieServ";
import { setIsLoading } from "../../redux/slices/generalSlice";

export default function BookingPage() {
  let [bookingInfo, setBookingInfo] = useState(null);
  let params = useParams();
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsLoading(true));
    movieServ
      .getMovieShowtimes(params.maPhim)
      .then((res) => {
        // console.log(res);
        setBookingInfo(res.data.content);
        dispatch(setIsLoading(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setIsLoading(false));
      });
  }, []);

  const onChange = (key) => {
    console.log(key);
  };
  let handleChonPhimKhac = () => {
    window.location.href = "/";
  };

  const renderTheatreChains = () => {
    if (bookingInfo?.heThongRapChieu.length === 0) {
      return (
        <div>
          <p className="mb-1 text-xl">Phim hiện tại đã hết xuất chiếu.</p>
          <button
            type="button"
            className="px-4 py-1.5 bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 rounded-md focus:ring-red-900 font-medium text-white text-lg transition duration-300"
            onClick={handleChonPhimKhac}
          >
            Chọn phim khác
          </button>
        </div>
      );
    }
    return (
      <Tabs
        className="showtimeChains"
        defaultActiveKey="1"
        onChange={onChange}
        items={bookingInfo?.heThongRapChieu.map((heThongRap, index) => {
          return {
            label: (
              <img
                className="w-16 h-16 mb-2"
                src={heThongRap.logo}
                alt={heThongRap.maHeThongRap}
              />
            ),
            key: heThongRap.maHeThongRap.toString() + index,
            children: renderTheatreList(heThongRap.cumRapChieu),
          };
        })}
      />
    );
  };

  const renderTheatreList = (cumRapChieu) => (
    <Tabs
      className="showtimeTheatres"
      defaultActiveKey="1"
      onChange={onChange}
      items={cumRapChieu?.map((rapChieu, index) => {
        return {
          label: <span className="text-white">{rapChieu.tenCumRap}</span>,
          key: rapChieu.maCumRap.toString() + index,
          children: renderShowtimeDatesList(rapChieu.lichChieuPhim),
        };
      })}
    />
  );

  const getShowtimeDatesList = (showtimeList) => {
    // if (!showtimeList) return;
    return showtimeList.reduce((showtimeDatesList, showtime) => {
      let indexOfDate = showtimeDatesList.findIndex((schedule) => {
        return (
          moment(schedule).format("DDMMYYYY") ===
          moment(showtime.ngayChieuGioChieu).format("DDMMYYYY")
        );
      });
      if (indexOfDate === -1) {
        let newShowtimeDates = [
          ...showtimeDatesList,
          showtime.ngayChieuGioChieu,
        ];
        return newShowtimeDates;
      }
      return showtimeDatesList;
    }, []);
  };

  const renderShowtimeDatesList = (showtimeList) => {
    let showtimeDatesList = getShowtimeDatesList(showtimeList);
    return (
      <Tabs
        className="showtimeDates"
        defaultActiveKey="1"
        onChange={onChange}
        items={showtimeDatesList?.map((date, index) => {
          let showtimeByDate = showtimeList.filter((showtimeDetail) => {
            return (
              moment(showtimeDetail.ngayChieuGioChieu).format("DDMMYYYY") ===
              moment(date).format("DDMMYYYY")
            );
          });
          let showDay = moment(date).format("DD");
          let showMonth = moment(date).format("MM");
          let showYear = moment(date).format("YYYY");
          return {
            label: (
              <div className="showdate p-2 mb-3 flex text-white">
                <p className="mr-2 mb-0 text-4xl">{showDay}</p>
                <div>
                  <p className="mb-0 text-right">{showMonth}</p>
                  <p className="mb-0 text-right">{showYear}</p>
                </div>
              </div>
            ),
            key: date.toString() + index,
            children: renderShowtimeList(showtimeByDate),
          };
        })}
      />
    );
  };

  const renderShowtimeList = (showtimeList) => {
    console.log(showtimeList);

    return (
      <div>
        {showtimeList.map((showtime, index) => (
          <NavLink
            to={`/selectseat/${showtime.maLichChieu}`}
            key={showtime.maLichChieu.toString() + index}
          >
            <button className="px-5 py-2.5 m-2 border rounded-lg border-white/50 hover:border-white font-medium text-[16px] sm:text-lg text-center text-white/50 hover:text-white">
              {moment(showtime.ngayChieuGioChieu).format("hh:mm A")}
              {/* 2019-01-01T10:10:00 */}
            </button>
          </NavLink>
        ))}
      </div>
    );
  };

  return (
    <div className="container xl:max-w-screen-xl mx-auto pb-10 px-2 sm:px-0">
      <h2 className="pb-3 mb-6 border-b-2 text-3xl text-white">Đặt vé</h2>
      {!bookingInfo ? null : (
        <div className="movieDetails flex mb-5">
          <div className="movieDetails__cover w-64 h-80 mr-6 flex-shrink-0">
            <img
              src={bookingInfo.hinhAnh}
              alt={bookingInfo.biDanh}
              className="object-cover h-full w-full"
            />
          </div>
          <div className="movieDetails__detail">
            <div className="flex items-center">
              <p className="mb-0 mr-2 font-bold text-2xl uppercase">
                {bookingInfo.tenPhim}
              </p>
              {bookingInfo.hot ? (
                <Tag color="#f50" className="font-bold">
                  HOT
                </Tag>
              ) : (
                <></>
              )}
            </div>
            <p className="pb-7 border-b border-b-white/70">
              Rating:{" "}
              <span className="font-semibold text-lg text-red-500">
                {bookingInfo.danhGia}
              </span>
              /10
            </p>
            <p className="mb-2 text-lg leading-loose text-justify">
              {bookingInfo.moTa}
            </p>
          </div>
        </div>
      )}
      <div className="showtime">{renderTheatreChains()}</div>
    </div>
  );
}

// {
//   "maPhim": 8803,
//   "tenPhim": "Fantastic Beasts 2",
//   "biDanh": "fantastic-beasts-2",
//   "trailer": "https://youtu.be/8bYBOVWLNIs",
//   "hinhAnh": "https://movienew.cybersoft.edu.vn/hinhanh/fantastic-beasts-2_gp02.jpg",
//   "moTa": "Một vài tháng khi Newt Scamander (Eddie Redmayne) giúp vén màn bí mật và bắt giữ phù thủy bóng tối Gellert Grindelwald (Johnny Depp). Tuy nhiên, Grinderwald đã làm một cuộc tẩu thoát ngoạn mục và thu nạp được lực lượng những người đi theo mình. Người duy nhất trong hoàn cảnh bấy giờ có thể ngăn chặn Grindelwald chính là Albus Dumbledore (Jude Law). Cuộc hành trình chống lại thế lực bóng tối này còn có sự góp mặt của Tina (Katherine Waterson), Queenie (Alison Sudol) và Jacob (Dan Fogler). Đây sẽ là phép thử để mọi người chứng minh lòng trung thành khi đối mặt với thế lực bóng đêm. ",
//   "maNhom": "GP02",
//   "hot": false,
//   "dangChieu": true,
//   "sapChieu": false,
//   "ngayKhoiChieu": "2022-09-24T22:49:11.927",
//   "danhGia": 8
// }
