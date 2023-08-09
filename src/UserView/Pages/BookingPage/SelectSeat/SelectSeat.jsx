import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NotifyModal from "../../../../HOC/NotifyModal";
import { movieServ } from "../../../../services/movieServ";
import { webColor } from "../../../constants/colorConstant";
import { setIsLoading } from "../../../redux/slices/generalSlice";
import {
  setSelectedMovieInfo,
  setSelectedSeatList,
} from "../../../redux/slices/movieSlice";
import SeatDetails from "./SeatDetails";
import SelectedDetailTickets from "./SelectedDetailTickets";

export default function SelectSeat() {
  let [isNotifyModalOpen, setIsNotifyModalOpen] = useState(false);
  let [seatsList, setSeatsList] = useState(null);
  let [scheduleInfo, setScheduleInfo] = useState(null);
  let params = useParams();
  let dispatch = useDispatch();
  let selectedSeatList = useSelector((state) => {
    return state.movieSlice.selectedSeatList;
  });

  // Lấy thông tin lịch chiếu theo mã lịch chiếu
  useEffect(() => {
    dispatch(setIsLoading(true));
    movieServ
      .getScheduleDetails(params.maLichChieu)
      .then((res) => {
        // console.log("res");
        setSeatsList(
          res.data.content.danhSachGhe.map(
            (seat) => (seat = { ...seat, selected: false })
          )
        );
        setScheduleInfo(res.data.content.thongTinPhim);
        dispatch(setSelectedSeatList([]));
        dispatch(setSelectedMovieInfo(null));
        dispatch(setIsLoading(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setIsLoading(false));
      });
  }, []);

  // HANDLE Notify Modal
  let handleOKClick = () => {
    setIsNotifyModalOpen(false);
  };
  let handleCancelClick = () => {
    setIsNotifyModalOpen(false);
  };

  // HANDLE chọn ghế
  let handleSelectSeat = (seatInfo) => {
    let newSelectedSeatList = [...selectedSeatList];
    if (seatInfo.daDat) return;
    let selectedSeatIndex = newSelectedSeatList.findIndex(
      (item) => item.maGhe === seatInfo.maGhe
    );
    if (selectedSeatIndex === -1) {
      newSelectedSeatList.push(seatInfo);
      dispatch(setSelectedSeatList(newSelectedSeatList));
      return;
    }
    newSelectedSeatList.splice(selectedSeatIndex, 1);
    dispatch(setSelectedSeatList(newSelectedSeatList));
  };

  // Render danh sách ghế ra màn hình
  let renderSeats = () => {
    // console.log("run 2");
    return (
      <>
        <div className="max-w-xl mx-auto p-5 sm:p-0 grid grid-cols-16 gap-2">
          {seatsList?.map((seatInfo, index) => (
            <SeatDetails
              key={seatInfo.maGhe.toString() + index}
              seatInfo={seatInfo}
              handleSelectSeat={handleSelectSeat}
              selectedSeatList={selectedSeatList}
            />
          ))}
        </div>
        <div className="max-w-lg mx-auto grid grid-cols-2">
          <div className="flex items-center mt-5">
            <div className="h-5 w-5 mr-3" style={webColor.seat.selected}></div>
            <p className="m-0">Đang chọn</p>
          </div>
          <div className="flex items-center mt-5">
            <div className="h-5 w-5 mr-3" style={webColor.seat.regular}></div>
            <p className="m-0">Thường</p>
          </div>
          <div className="flex items-center mt-5">
            <div className="h-5 w-5 mr-3" style={webColor.seat.booked}></div>
            <p className="m-0">Đã được đặt</p>
          </div>
          <div className="flex items-center mt-5">
            <div className="h-5 w-5 mr-3" style={webColor.seat.vip}></div>
            <p className="m-0">VIP (Prime)</p>
          </div>
        </div>
      </>
    );
  };
  // console.log("run");
  // console.log(selectedSeatList);
  if (!scheduleInfo) return null;
  return (
    <>
      <div className="container xl:max-w-screen-xl mx-auto px-2 sm:px-0">
        <h2 className="mb-6 pb-3 border-b-2 text-3xl text-white">Đặt vé</h2>
        <div className="container max-w-screen-lg mx-auto border border-white/50">
          <div className="theatreInfo p-5">
            <p className="mb-2 font-bold text-2xl uppercase">
              {scheduleInfo.tenPhim}
            </p>
            <p className="mb-1 font-semibold text-xl">
              {scheduleInfo.tenCumRap} | {scheduleInfo.tenRap}
            </p>
            <p className="text-white/80">{scheduleInfo.diaChi}</p>
            <p className="mb-0 text-lg text-white/80">
              Xuất chiếu:{" "}
              <span className="text-white font-semibold">
                {scheduleInfo.gioChieu} {scheduleInfo.ngayChieu}
              </span>
            </p>
          </div>
          <div className="mb-8">
            <p className="py-2 px-5 bg-gray-600 text-center text-lg font-semibold text-white">
              Chọn ghế
            </p>
            {/* <p className="py-2 text-center text-xl font-semibold text-gray-500">
            Màn hình
          </p> */}
            <div className="px-5">
              <img
                className="w-full mt-8 mb-12"
                src="https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cgv/bg-screen.png"
                alt=""
              />
            </div>
            {renderSeats()}
          </div>
          <SelectedDetailTickets
            setIsNotifyModalOpen={setIsNotifyModalOpen}
            scheduleInfo={scheduleInfo}
            selectedSeatList={selectedSeatList}
          />
        </div>
      </div>
      <NotifyModal
        isNotifyModalOpen={isNotifyModalOpen}
        handleOKClick={handleOKClick}
        handleCancelClick={handleCancelClick}
      >
        Vui lòng chọn ghế để tiếp tục đặt vé
      </NotifyModal>
    </>
  );
}

// {
//   "thongTinPhim": {
//     "maLichChieu": 25116,
//     "tenCumRap": "CGV - Parkson Đồng Khởi",
//     "tenRap": "Rạp 3",
//     "diaChi": "Tầng 5 Parkson Đồng Khởi, 35bis-45 Lê Thánh Tôn, Bến Nghé, Q.1",
//     "tenPhim": "The Longest Rided 2010",
//     "hinhAnh": "https://movienew.cybersoft.edu.vn/hinhanh/thewalkingdead.jpg",
//     "ngayChieu": "09/01/2019",
//     "gioChieu": "08:01"
//   },
//   "danhSachGhe": [
//     {
//       "maGhe": 76521,
//       "tenGhe": "01",
//       "maRap": 633,
//       "loaiGhe": "Thuong",
//       "stt": "01",
//       "giaVe": 75000,
//       "daDat": false,
//       "taiKhoanNguoiDat": null
//     }]}
