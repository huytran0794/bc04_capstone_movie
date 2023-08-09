/* import packages */
import React from "react";
import clsx from "clsx";

/* import antd packages */
import { Button } from "antd";

export default function CustomButton({
  btnType = "btnPill",
  className,
  children,
  ...props
}) {
  const btnList = {
    btnPill: clsx(
      "rounded-full",
      "py-4 px-6",
      "flex items-center justify-center",
      "text-xl text-[#c4c4c4] capitalize font-semibold"
    ),
    btnPurple: clsx(
      "flex items-center justify-center",
      "border-transparent bg-[#7f66de] rounded-md",
      "py-4 px-6",
      "text-xl text-white capitalize font-semibold",
      "hover:border-[#7f66de] hover:text-[#7f66de] hover:bg-white"
    ),
    btnPink: clsx(
      "flex items-center justify-center",
      "rounded-full shadow-md",
      "py-2 px-5",
      "text-lg text-white capitalize font-semibold",
      "bg-[#C8235D] border-[3px] border-solid border-[#C8235D]",
      "hover:bg-white hover:text-[#C8235D]",
      "transition-all duration-[900ms]"
    ),
    btnGrey: "",
    btnGreyBordered: clsx(
      "flex items-center justify-center",
      "border-[2px] border-[#9CA7CB] bg-[#28324A] rounded-full",
      "py-3 px-10",
      "shadow-md",
      "text-lg text-[#9CA7CB] capitalize font-semibold",
      "hover:text-[#28324A] hover:bg-[#9CA7CB] hover:border-[#28324A]",
      "transition-all duration-[900ms]"
    ),
  };

  return (
    <Button
      className={clsx({ [btnList[btnType]]: btnType }, className)}
      {...props}
    >
      {children}
    </Button>
  );
}
