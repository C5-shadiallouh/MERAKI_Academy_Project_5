import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loggedin, logout } from "../../redux/reducers/auth";
import { setCategories } from "../../redux/reducers/category";
import { changePage } from "../../redux/reducers/page/pageReducer";
import Filter from "../Search";
import "./style.css";
import axios from "axios";
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, isLoggedIn, isAdmin, meals, categories, page } = useSelector(
    (state) => {
      return {
        token: state.auth.token,
        isLoggedIn: state.auth.isLoggedIn,
        isAdmin: state.auth.isAdmin,
        categories: state.category.categories,
        page: state.page.page,
      };
    }
  );
  const getCategories = () => {
    axios
      .get("http://localhost:5000/meals/allcategories")
      .then((result) => {
        dispatch(setCategories(result.data.categories));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="navbar">
      <div className="logo">
        <img
          src="https://scontent-frt3-1.xx.fbcdn.net/v/t1.6435-9/95093528_925008204596091_3051705487943794688_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeHauKD1lKQ1B_JKeY4f5g_SZiv_hMWAs6ZmK_-ExYCzpv595L_1JAZxtur3jyOmd6CLiQtzOo2DKzu355CRzvfx&_nc_ohc=AUoj-2sVlp4AX8EsSxu&_nc_ht=scontent-frt3-1.xx&oh=00_AT8EmOIbtDsEYK9l55H0K7Z_XTssHwMKZ3OWcS71J7kbvA&oe=62C3D0FA"
          width={"170px"} height={"150px"} onClick={()=>{navigate("/")}}
        />
      </div>

      <nav>
        <div className="menu">
          <div className="dropdown">
            <p className="dropbtn" to={""} onMouseOver={getCategories}>
              القائمة
            </p>
            <div className="dropdown-content">
              <Link
                to={"/menu"}
                onClick={() => {
                  dispatch(changePage(1));
                }}
              >
                جميع الاصناف
              </Link>
              {categories.length
                ? categories.map((element, index) => {
                    return (
                      <Link key={element.id} to={`/${element.category_name}`}>
                        {element.category_name}
                      </Link>
                    );
                  })
                : ""}
            </div>
          </div>

          {!isLoggedIn ? (
            <div className="links">
              <Link
                to={"/register"}
                onClick={() => {
                  dispatch(changePage(1));
                }}
              >
                تسجيل مستخدم جديد
              </Link>
              <Link
                to={"/login"}
                onClick={() => {
                  dispatch(changePage(1));
                }}
              >
                تسجيل الدخول
              </Link>
            </div>
          ) : (
            ""
          )}
          {isAdmin ? (
            <div className="links">
              <Link
                to={"/adminpanel"}
                onClick={() => {
                  dispatch(changePage(1));
                }}
              >
                لوحة الادارة
              </Link>
            </div>
          ) : (
            ""
          )}
          {isLoggedIn ? (
            <div className="links">
              <Link
                to={"/"}
                onClick={() => {
                  dispatch(logout());
                  dispatch(changePage(1));
                }}
              >
                تسجيل الخروج
              </Link>
            </div>
          ) : (
            ""
          )}
        <div className="links">
          <Link
            to={"/aboutus"}
            onClick={() => {
              dispatch(changePage(1));
            }}
          >
            من نحن
          </Link>
          </div>
          <Filter />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
