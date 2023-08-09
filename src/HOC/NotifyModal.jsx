import React from "react";
import { createPortal } from "react-dom";
import { generalStyle } from "../styles/movieStyle";
import { heroIcon } from "../UserView/constants/heroIcon";

export default function NotifyModal({
  children,
  isNotifyModalOpen = false,
  handleCancelClick,
  handleOKClick,
}) {
  if (!isNotifyModalOpen) return null;

  return createPortal(
    <>
      <div style={generalStyle.modalOverlay}></div>
      {/* <div  className="w-2/5"> */}
      <div
        style={generalStyle.modal}
        className="overflow-y-auto overflow-x-hidden w-full md:w-[672px] px-5 md:px-0"
      >
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
          {/* <!-- Modal content --> */}
          <div className="relative bg-gray-900/95 rounded-lg shadow">
            {/* <!-- Modal header --> */}
            <div className="flex justify-between items-start p-4 rounded-t border-b border-gray-600">
              <button
                type="button"
                className="text-gray-400 bg-transparent dark:hover:bg-gray-600 dark:hover:text-white rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                onClick={handleCancelClick}
              >
                {heroIcon.xIcon}
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <div className="p-6 text-xl text-white">{children}</div>
            {/* <!-- Modal footer --> */}
            <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-600">
              <button
                type="button"
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 rounded-lg focus:ring-red-900 font-medium text-white text-lg transition duration-300"
                onClick={handleOKClick}
              >
                OK
              </button>
              <button
                type="button"
                className="px-5 py-2.5 bg-gray-700 hover:bg-gray-600 rounded-lg border border-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-600 font-medium text-xl text-gray-300 hover:text-white transition duration-300"
                onClick={handleCancelClick}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}
