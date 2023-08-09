/* import packages */
import React from "react";

/* import antd packages */
import { Table } from "antd";

import { convertTimeMovieFormat } from "../../../../utils/convertTime";

export default function TabBookingHistory({ bookingHistory }) {
  const convertedData = bookingHistory.map((booking, idx) => {
    // convert dsGhe
    let newdsGhe = [];
    booking.danhSachGhe.forEach((element) => {
      newdsGhe.push(element.tenGhe);
    });
    return {
      ngayDat: booking.ngayDat,
      tenPhim: booking.tenPhim,
      thoiLuongPhim: booking.thoiLuongPhim,
      giaVe: booking.giaVe,
      tenHeThongRap: booking.danhSachGhe[0].tenHeThongRap,
      dsGheNgoi: newdsGhe,
    };
  });
  const columns = [
    {
      title: "Booked Date",
      dataIndex: "ngayDat",
      width: 200,
      render: (ngayDat) => convertTimeMovieFormat(ngayDat),
    },
    {
      title: "Film",
      dataIndex: "tenPhim",
      width: 300,
    },
    {
      title: "Duration",
      dataIndex: "thoiLuongPhim",
    },
    {
      title: "Price",
      dataIndex: "giaVe",
    },
    {
      title: "Cinema branch",
      dataIndex: "tenHeThongRap",
    },
    {
      title: "Booked Seats",
      dataIndex: "dsGheNgoi",
      render: (dsGheNgoi) => `Seat ${dsGheNgoi.join(", ")}`,
      width: 150,
    },
  ];
  const data = convertedData;
  return (
    <div className="tabContent py-4">
      <Table
        rowKey={(record) => record.maVe}
        dataSource={data}
        columns={columns}
        size="middle"
        bordered
        pagination={{ size: "default" }}
        className="bookingHistoryTable"
      />
    </div>
  );
}
