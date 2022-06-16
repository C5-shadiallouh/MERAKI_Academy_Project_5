//import useState hook to create menu collapse state

import React, { useState } from "react";
import TopBar from "./TopBar";
import { Link, useNavigate  } from "react-router-dom";
import NewUsers from "./NewUsers/NewUsers"
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
import FeaturedInfo from "./Featured/Featured";
import WidgetSm from "./NewUsers/NewUsers";
const Dashboard = () => {
  const navigate=useNavigate()
  const [menuCollapse, setMenuCollapse] = useState(false);

  const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <>
     
      <div id="sidebar">
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            
            
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
            <MenuItem active={true} icon={<FiHome />}>
                الصفحة الرئيسية
              </MenuItem>
              <MenuItem icon={<FaChartBar />}>تحليل الموقع</MenuItem>
              <MenuItem icon={<FaUsers onClick={()=>{navigate("/users")}}/> }>المستخدمين</MenuItem>
              <MenuItem  icon={<FaProductHunt onClick={()=>{navigate("/meals")}} />}>الوجبات</MenuItem>
              <MenuItem icon={<FiLogOut />}>تسجيل الخروج</MenuItem>
            </Menu>
          </SidebarContent>
            <Menu iconShape="square">
              
            </Menu>
        </ProSidebar>
        <div >
          <FeaturedInfo/>
          <ChartLine />
          <NewUsers/>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
