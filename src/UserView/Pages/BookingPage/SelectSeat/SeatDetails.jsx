import React from "react";
import { webColor } from "../../../constants/colorConstant";

export default function SeatDetails({
  seatInfo,
  handleSelectSeat,
  selectedSeatList,
}) {
  let selectedSeatIndex = selectedSeatList.findIndex(
    (item) => item.maGhe === seatInfo.maGhe
  );
  let seatStatus = () => {
    if (seatInfo.daDat === true) {
      return webColor.seat.booked;
    }
    if (selectedSeatIndex !== -1) {
      return webColor.seat.selected;
    }
    if (seatInfo.loaiGhe === "Thuong") {
      return webColor.seat.regular;
    }
    return webColor.seat.vip;
  };
  return (
    <div
      className="p-0 md:p-1 flex justify-center items-center"
      style={seatStatus()}
      onClick={() => {
        handleSelectSeat(seatInfo);
      }}
    >
      <p className="m-0 text-xs md:text-sm">{seatInfo.tenGhe}</p>
    </div>
  );
}
