//import useState hook to create menu collapse state

import React, { useState } from "react";
import TopBar from "../TopBar";
import LatestOrder from "../LatestOrder/LatestOrder"
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import "./style.css";
import { FaChartBar, FaUsers, FaProductHunt } from "react-icons/fa";
import {
  FiHome,
  FiLogOut,
  FiArrowLeftCircle,
  FiArrowRightCircle,
} from "react-icons/fi";
import { BiCog } from "react-icons/bi";
import ChartLine from "../../Charts/Line/Line";
import FeaturedInfo from "../Featured/Featured";
import WidgetSm from "../LatestOrder/LatestOrder";
const SideBar = () => {
  const [menuCollapse, setMenuCollapse] = useState(false);

  const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <>
      <TopBar />
      <div id="sidebar">
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className="logotext">
              <p>{menuCollapse ? "Logo" : "Big Logo"}</p>
            </div>
            <div className="closemenu" onClick={menuIconClick}>
              {menuCollapse ? <FiArrowLeftCircle /> : <FiArrowRightCircle />}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem active={true} icon={<FiHome />}>
                الصفحة الرئيسية
              </MenuItem>
              <MenuItem icon={<FaChartBar />}>تحليل الموقع</MenuItem>
              <MenuItem icon={<FaUsers />}>المستخدمين</MenuItem>
              <MenuItem icon={<FaProductHunt />}>الوجبات</MenuItem>
              <MenuItem icon={<BiCog />}>اعدادات</MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem icon={<FiLogOut />}>تسجيل الخروج</MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
        <div >
          <FeaturedInfo/>
          <ChartLine />
          <LatestOrder/>
        </div>
      </div>
    </>
  );
};

export default SideBar;
