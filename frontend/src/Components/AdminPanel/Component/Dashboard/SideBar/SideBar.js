import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { FiUserPlus } from "react-icons/fi";
import {
  FiHome,
  FiLogOut,
} from "react-icons/fi";
import { logout } from "../../../../../redux/reducers/auth/index"
import { useDispatch } from "react-redux";
import {MdLocalPharmacy} from "react-icons/md"
const SideBar = () => {
  const navigate = useNavigate();
  const [menuCollapse, setMenuCollapse] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <div id="sidebar" style={{height:"100vh", zIndex:"1"}}>
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader></SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem active={true} icon={<FiHome   onClick={() => {
                      navigate("/adminpanel");
                    }}/>}>
                الصفحة الرئيسية
              </MenuItem>
              <MenuItem icon={<FaChartBar  onClick={() => {
                      navigate("/chart");
                    }}/>}>تحليل الموقع</MenuItem>
              <MenuItem
                icon={
                  <FaUsers
                    onClick={() => {
                      navigate("/users");
                    }}
                  />
                }
              >
                المستخدمين
              </MenuItem>
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
                  <FaProductHunt
                    onClick={() => {
                      navigate("/meals");
                    }}
                  />
                }
              >
                الوجبات
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
              <MenuItem
                icon={<FiLogOut />}
                onClick={() => {
                  dispatch(logout());
                  navigate("/");
                }}
              >
                تسجيل الخروج
              </MenuItem>
            </Menu>
          </SidebarContent>
          <Menu iconShape="square"></Menu>
        </ProSidebar>
      </div>
    </>
  );
};

export default SideBar;
