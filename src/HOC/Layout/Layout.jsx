import React from "react";
import Footer from "../../UserView/Components/FooterTheme/Footer";
import Header from "../../UserView/Components/HeaderTheme/Header";
import { webColor } from "../../UserView/constants/colorConstant";

export default function Layout({ Component }) {
  return (
    <div className="text-white" style={{ background: webColor.bgPrimary }}>
      <Header />
      <Component />
      <Footer />
    </div>
  );
}
