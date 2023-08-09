import { Menu } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { webColor } from "../../constants/colorConstant";

const items = [
  {
    label: (
      <>
        <NavLink className="hidden md:block hover:no-underline" to={"/"}>
          <img className="h-16" src="/movieLogo.png" alt="web-logo" />
        </NavLink>
        <NavLink to="/" className="block md:hidden hover:no-underline">
          <span className="nav-left__item align-middle text-lg md:text-xl">
            Home
          </span>
        </NavLink>
      </>
    ),
    key: "logo",
  },
  {
    label: (
      <NavLink to="/theatres">
        <span className="nav-left__item align-middle text-lg md:text-xl">
          Our Theatres
        </span>
      </NavLink>
    ),
    key: "theatresList",
  },
  {
    label: (
      <NavLink to="/underDeveloped" className="align-middle">
        <span className="nav-left__item text-lg md:text-xl">Food & Drinks</span>
      </NavLink>
    ),
    key: "foodDrink",
  },
];

const Navigation = () => {
  const [current, setCurrent] = useState("mail");

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <Menu
      id="header__nav-left"
      className="w-1/12 md:w-4/6 lg:w-1/2"
      style={{
        background: webColor.bgPrimary,
        border: "none",
        color: "#fff",
        fontSize: "18px",
      }}
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      overflowedIndicator={
        <UnorderedListOutlined
          style={{
            fontSize: "28px",
            verticalAlign: "middle",
          }}
        />
      }
      items={items}
      theme="dark"
    />
  );
};

export default Navigation;
