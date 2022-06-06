import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loggedin, logout } from "../../redux/reducers/auth";
import { setMealsByCategory } from "../../redux/reducers/meals";
import "./style.css";
import axios from "axios";
const Navbar = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, isLoggedIn, isAdmin,meals } = useSelector((state) => {
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
      isAdmin: state.auth.isAdmin,
      meals:state.meals.meals
    };
    
  });
  const menu =async()=>{
    try{
      const res = await axios.get("http://localhost:5000/meals/pageInCategory?p=1&name=فتة")
      if (res){
        dispatch(setMealsByCategory(res.data.products))
      }
      else throw Error
    }
    catch(error){
      if (error.response && error.response.data) {
        
      }
    }
    
    }
  return (
    <div className="navbar">
      <nav>
       <Link to={"/"}> <img
          src="https://scontent-frt3-1.xx.fbcdn.net/v/t1.6435-9/95093528_925008204596091_3051705487943794688_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeHauKD1lKQ1B_JKeY4f5g_SZiv_hMWAs6ZmK_-ExYCzpv595L_1JAZxtur3jyOmd6CLiQtzOo2DKzu355CRzvfx&_nc_ohc=AUoj-2sVlp4AX8EsSxu&_nc_ht=scontent-frt3-1.xx&oh=00_AT8EmOIbtDsEYK9l55H0K7Z_XTssHwMKZ3OWcS71J7kbvA&oe=62C3D0FA"
          width={"170px"}
        /></Link>
        <div className="dropdown">
        <Link className="dropbtn" to={"/menu"}>القائمة</Link>
          
          <div className="dropdown-content">
            <Link to={"/menu/fatteh"} onClick={menu}>Link 1</Link>
            <Link to={"#"}>Link 2</Link>
            <Link to={"#"}>Link 3</Link>
          </div>
        </div>
       
        {!isLoggedIn ? (
          <>
            <Link to={"/regeister"}>تسجيل مستخدم جديد</Link>
            <Link to={"/login"}>تسجيل الدخول</Link>
          </>
        ) : (
          ""
        )}
        {isAdmin ? (
          <>
            <Link to={"/adminpanel"}>لوحة الادارة</Link>
          </>
        ) : (
          ""
        )}
        {isLoggedIn ? (
          <>
            <Link
              to={"/"}
              onClick={() => {
                dispatch(logout());
              }}
            >
              تسجيل الخروج
            </Link>
          </>
        ) : (
          ""
        )}

        <Link to={"/aboutus"}>من نحن</Link>
      </nav>
    </div>
  );
};

export default Navbar;
