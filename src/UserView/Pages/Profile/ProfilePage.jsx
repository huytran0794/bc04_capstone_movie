/* import packages */
import { Tabs } from "antd";
import React, { useEffect, useState } from "react";

import TabProfile from "./TabProfile/TabProfile";
import TabBookingHistory from "./TabBookingHistory/TabBookingHistory";
import SectionWrapper from "../../Components/Global/SectionWrapper/SectionWrapper";
import { userServ } from "../../../services/userServ";
import { useDispatch } from "react-redux";
import { setIsLoading } from "../../redux/slices/generalSlice";

export default function ProfilePage() {
  const [userProfile, setUserProfile] = useState(null);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(setIsLoading(true));
    userServ
      .getUserProfile()
      .then((res) => {
        dispatch(setIsLoading(false));
        setUserProfile(res.data.content);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const renderTabs = () => {
    if (userProfile) {
      const items = [
        {
          label: "User profile",
          key: "tab-profile",
          children: <TabProfile userProfile={userProfile} />,
        },
        {
          label: "User booking history",
          key: "tab-history",
          children: (
            <TabBookingHistory bookingHistory={userProfile.thongTinDatVe} />
          ),
        },
      ];
      return <Tabs defaultActiveKey="1" items={items} />;
    }
  };

  return (
    <div className="profile">
      <SectionWrapper
        title="User profile"
        titleCustomClass="z-[3] before:z-[0]"
        content={renderTabs()}
        contentCustomClass="px-7"
      />
    </div>
  );
}
