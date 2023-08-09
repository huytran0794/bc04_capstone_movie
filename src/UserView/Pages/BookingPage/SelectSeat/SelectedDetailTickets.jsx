import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "../../../../utils/utils";
import { setSelectedMovieInfo } from "../../../redux/slices/movieSlice";
import { bookingUtils } from "../bookingUtils";

export default function SelectedDetailTickets({
  scheduleInfo,
  selectedSeatList,
  setIsNotifyModalOpen,
}) {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let getTotalPrice = () =>
    selectedSeatList.reduce((total, item) => total + item.giaVe, 0);

  let handleBookingConfirm = () => {
    if (selectedSeatList.length === 0) {
      setIsNotifyModalOpen(true);
      return;
    }
    dispatch(setSelectedMovieInfo(scheduleInfo));
    navigate(`/booking-confirm/${scheduleInfo.maLichChieu}`);
  };

  return (
    <div>
      <div className="flex flex-wrap sm:flex-nowrap justify-between border-t border-white/50 p-5">
        <img
          src={scheduleInfo?.hinhAnh}
          alt={scheduleInfo?.tenPhim}
          className="hidden sm:inline w-1/2 sm:w-28 md:w-32 object-cover"
        />
        <p className="w-full sm:w-1/6 mb-4 sm:mb-0 px-0 sm:px-3 uppercase font-semibold text-xl sm:text-lg lg:text-xl text-center sm:text-left">
          {scheduleInfo?.tenPhim}
        </p>
        <div className="w-2/3 sm:w-auto text-[16px] lg:text-lg">
          <table>
            <tbody>
              <tr>
                <td className="pb-2 align-top">Rạp</td>
                <td className="pl-3 sm:pl-1 md:pl-4 pb-2 font-semibold">
                  {scheduleInfo?.tenCumRap}
                </td>
              </tr>
              <tr>
                <td className="pb-2">Suất chiếu</td>
                <td className="pl-3 sm:pl-1 md:pl-4 pb-2 font-semibold">
                  {scheduleInfo?.gioChieu}, {scheduleInfo?.ngayChieu}
                </td>
              </tr>
              <tr>
                <td className="pb-2">Phòng chiếu</td>
                <td className="pl-3 sm:pl-1 md:pl-4 pb-2 font-semibold align-top">
                  {scheduleInfo?.tenRap}
                </td>
              </tr>
              <tr>
                <td className="pb-2">Ghế</td>
                <td className="pl-3 sm:pl-1 md:pl-4 pb-2 font-semibold">
                  {bookingUtils.renderSelectedSeat(selectedSeatList)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="w-1/3 sm:w-1/6 flex justify-end sm:justify-center font-semibold text-right text-lg sm:text-[16px] lg:text-lg">
          <div>
            <p className="mb-2">Tổng cộng:</p>
            <p className="mb-0">{numberWithCommas(getTotalPrice())} đ</p>
          </div>
        </div>
      </div>
      <button
        type="button"
        className="w-full px-5 py-2.5 bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-900 font-medium text-xl text-white transition duration-300"
        onClick={handleBookingConfirm}
      >
        XÁC NHẬN
      </button>
    </div>
  );
}
