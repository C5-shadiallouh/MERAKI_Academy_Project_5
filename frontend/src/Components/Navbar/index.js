import React from "react";
import { Link,useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { loggedin,logout } from "../../redux/reducers/auth";
const Navbar = ()=>{
const dispatch = useDispatch()
const {isLoggedIn}=useSelector((state)=>{
    return{
      isLoggedIn : state.auth.isLoggedIn
    }
  })
return(
    <div className="navbar">
        <nav>
            <img src="https://scontent-frt3-1.xx.fbcdn.net/v/t1.6435-9/95093528_925008204596091_3051705487943794688_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeHauKD1lKQ1B_JKeY4f5g_SZiv_hMWAs6ZmK_-ExYCzpv595L_1JAZxtur3jyOmd6CLiQtzOo2DKzu355CRzvfx&_nc_ohc=AUoj-2sVlp4AX8EsSxu&_nc_ht=scontent-frt3-1.xx&oh=00_AT8EmOIbtDsEYK9l55H0K7Z_XTssHwMKZ3OWcS71J7kbvA&oe=62C3D0FA" width={"80px"}/>
            <Link to={"/menu"}>القائمة</Link>
            <Link to={"/regeister"}>تسجيل مستخدم جديد</Link>
            <Link to={"/login"}>تسجيل الدخول</Link>
            <Link to={"/aboutus"}>من نحن</Link>
        </nav>
    </div>
)

}


export default Navbar