import React from "react";
import "./style.css";
import { FiSettings } from "react-icons/fi"
import {RiDashboardFill} from "react-icons/ri"
import {ImMail2} from "react-icons/im"



const TopBar = () => {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <ImMail2 />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <RiDashboardFill />
            
          </div>
          <div className="topbarIconContainer">
            <FiSettings />
          </div>
          <img
            src="https://scontent-frt3-1.xx.fbcdn.net/v/t1.6435-9/95093528_925008204596091_3051705487943794688_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeHauKD1lKQ1B_JKeY4f5g_SZiv_hMWAs6ZmK_-ExYCzpv595L_1JAZxtur3jyOmd6CLiQtzOo2DKzu355CRzvfx&_nc_ohc=AUoj-2sVlp4AX8EsSxu&_nc_ht=scontent-frt3-1.xx&oh=00_AT8EmOIbtDsEYK9l55H0K7Z_XTssHwMKZ3OWcS71J7kbvA&oe=62C3D0FA"
            alt=""
            className="topAvatar"
            style={{width:"30" ,height:"30"}}
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
