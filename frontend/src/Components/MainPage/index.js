import React, { useState } from "react";
import { useSelector } from "react-redux";
import SideBar from "../AdminPanel/Component/Dashboard/SideBar/SideBar";
import "./style.css"

const MainPage=()=>{
const {isAdmin}=useSelector((state)=>{
    return {
        isAdmin:state.auth.isAdmin
    }
})
    return(
    <div className="mainpage">
{isAdmin ? (<SideBar/>):("")}
   
    </div>
)
}

export default MainPage