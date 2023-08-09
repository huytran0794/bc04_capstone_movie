import React from "react";
import { useNavigate } from "react-router-dom";

export default function UnderDevelopedPage() {
  let navigate = useNavigate();
  return (
    <div className="px-5 h-[50vh] flex flex-col justify-center items-center text-center">
      <p className="text-2xl mb-4">
        Trang hiện đang được phát triển, mong bạn quay trở lại sau.
      </p>
      <button
        type="button"
        className="px-5 py-2.5 bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 rounded-lg focus:ring-red-900 font-medium text-white text-xl transition duration-300"
        onClick={() => {
          navigate("/");
        }}
      >
        Trở về Trang chủ
      </button>
    </div>
  );
}
