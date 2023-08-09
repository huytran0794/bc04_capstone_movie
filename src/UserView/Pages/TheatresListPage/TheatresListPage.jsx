import { Tabs } from "antd";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { movieServ } from "../../../services/movieServ";
import { setIsLoading } from "../../redux/slices/generalSlice";
import MovieTabItem from "./MovieTabItem";

export default function TheatresListPage() {
  let [theatreChains, setTheatreChains] = useState(null);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsLoading(true));
    movieServ
      .getMoviesByTheatres()
      .then((res) => {
        console.log(res);
        setTheatreChains(res.data.content);
        dispatch(setIsLoading(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setIsLoading(false));
      });
  }, []);
  let renderTheatreChainsList = () =>
    theatreChains?.map((chain, index) => ({
      label: (
        <img
          className="w-16 h-16 mb-2"
          src={chain.logo}
          alt={chain.maHeThongRap}
        />
      ),
      key: chain.maHeThongRap.toString() + index,
      children: (
        <Tabs
          className="theatre__lists"
          defaultActiveKey="1"
          tabPosition="left"
          style={{
            maxHeight: "70vh",
          }}
          items={renderTheatresList(chain.lstCumRap)}
        />
      ),
    }));
  let renderTheatresList = (lstCumRap) =>
    lstCumRap?.map((cumRap, index) => ({
      label: (
        <div className="theatre__details text-left text-white/50 hover:text-white transition duration-300">
          <p className="mb-0 font-semibold text-[16px]">{cumRap.tenCumRap}</p>
          <p className="mb-0">{cumRap.diaChi}</p>
        </div>
      ),
      key: cumRap.maCumRap.toString() + index,
      children: (
        <div
          style={{ maxHeight: "70vh", overflowY: "scroll" }}
          className="space-y-4"
        >
          {cumRap.danhSachPhim.map((movie, index) => (
            <div key={movie.maPhim.toString() + index}>
              <MovieTabItem movie={movie} />
            </div>
          ))}
        </div>
      ),
    }));
  return (
    <div className="ourTheatres container xl:max-w-screen-xl mx-auto px-2 sm:px-0">
      <h2 className="mb-5 pb-3 border-b-2 text-3xl text-white">
        Hệ thống rạp chiếu của chúng tôi
      </h2>
      <Tabs
        className="theatre__chains"
        defaultActiveKey="1"
        tabPosition="top"
        style={{
          maxHeight: "90vh",
        }}
        items={renderTheatreChainsList()}
      />
    </div>
  );
}
