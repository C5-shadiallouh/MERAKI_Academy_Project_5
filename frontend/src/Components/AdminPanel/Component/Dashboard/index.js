//import useState hook to create menu collapse state

import React, { useState } from "react";
import {  useNavigate  } from "react-router-dom";
import NewUsers from "./NewUsers/NewUsers"
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarContent,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import "./style.css";
import { FaChartBar, FaUsers, FaProductHunt } from "react-icons/fa";
import {
  FiHome,
  FiLogOut,
  FiUserPlus
} from "react-icons/fi";
import {MdLocalPharmacy} from "react-icons/md"
import Circle from "../../Charts/Circle/Circle"
import FeaturedInfo from "./Featured/Featured";
import { logout } from "../../../../redux/reducers/auth";
import { useDispatch } from "react-redux";
const Dashboard = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
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
              <MenuItem icon={<FaChartBar onClick={()=>{navigate("/chart")}}/>}>تحليل الموقع</MenuItem>
              <MenuItem icon={<FaUsers onClick={()=>{navigate("/users")}}/> }>المستخدمين</MenuItem>
              <MenuItem  icon={<FaProductHunt onClick={()=>{navigate("/meals")}} />}>الوجبات</MenuItem>
              <MenuItem
                icon={
                  <FiUserPlus
                    onClick={() => {
                      navigate("/addUser");
                    }}
                  />
                }
              >
                اضف مستخدم
              </MenuItem>
              
              <MenuItem
                icon={
                  <MdLocalPharmacy
                    onClick={() => {
                      navigate("/addMeale");
                    }}
                  />
                }
              >
                اضف وجبة
              </MenuItem>
            
             
              <MenuItem icon={<FiLogOut  onClick={() => {
                  dispatch(logout());
                  navigate("/");
                }}/>}>تسجيل الخروج</MenuItem>
            </Menu>
          </SidebarContent>
            <Menu iconShape="square">
              
            </Menu>
        </ProSidebar>
          <FeaturedInfo/>
          <Circle/>

          <NewUsers/>
      </div>
    </>
  );
};

export default Dashboard;