import ChartBar from "../../Charts/ChartBar/ChartBar";
import { Publish } from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./style.css";
import {RiProductHuntFill} from "react-icons/ri"

import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateMeal } from "../../../../redux/reducers/meals/index";
import SideBar from "../Dashboard/SideBar/SideBar";

const Edit = () => {
  const { id } = useParams();
  const meals = useSelector((state) => {
    return {
      meals: state.meals.meals,
    };
  });
  const dispatch = useDispatch();
  const [meal_name, setName] = useState();
  const [meal_price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  const handleEditMeal = () => {
    try {
      const res = axios.put(`http://localhost:5000/meals/update/${id}`, {
        meal_name,
        meal_price,
        image,
      });
      if (res) {
        setStatus(true);
        setMessage("تم تعديل الوجبة   ");
        dispatch(
          updateMeal({
            meal_name,
            meal_price,
            image,
          })
        );
      } else throw Error;
    } catch (error) {
      setStatus(false);
      if (error.response && error.response.data) {
        return setMessage(error.response.data.message);
      }
      setMessage("حدث خطأ ..الرجاء المحاولة مرة اخرى");
    }
  };
  return (
    <div>
      <SideBar />

      <div className="newUser">
        <div>
          <h1 className="newUserTitle"> التسلسلي تعديل بيانات الوجبة ذات الرقم {id} </h1>
        </div>
        <form className="newUserForm" onSubmit={handleEditMeal}>
          <div className="newUserItem">
            <label className="lal">اسم الوجبة</label>
            <input
              type="text"
              placeholder="اسم الوجبة"
              className="in"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="newUserItem">
            <label className="lal">سعر الوجبة</label>
            <input
              type="text"
              placeholder="سعر الوجبة"
              className="in"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>

          <div className="newUserItem  NNN">
            <label className="lal">اضف صورة</label>

            <label htmlFor="file">
              <Publish
                className="userUpdateIcon"
                onChange={(e) => {
                  setImage(e.target.value);
                }}
              />
            </label>
            <input type="file" id="file" style={{ display: "none" }} />
          </div>

          <button className="newUserButton">اضافة</button>
        </form>
      </div>

      <div className="featureduser">
        <div className="featuredItemuser">
          <span className="featuredTitleuser"> عدد الوجبات الاجمالي</span>
          <div className="featuredMoneyContaineruser">
            <span className="featuredMoneyuser">
              <RiProductHuntFill />
            </span>
          </div>
          <span className="featuredSubuser">{meals.length} وجبة</span>
        </div>
      </div>
      <div className="cchart">
        <ChartBar />
      </div>
    </div>
  );
};
export default Edit;

/*
     <div>
    
      <div className="user">
        <div className="userTitleContainer">
          تعديل معلومات الوجبة
          <Link to="/adminpanel">
            <button className="userAddButton">العودة</button>
          </Link>
        </div>
        <div className="userContainer">
        <div className="featureduser">
        <div className="featuredItemuser">
          <span className="featuredTitleuser"> العدد الاجمالي للمسجلين</span>
          <div className="featuredMoneyContaineruser">
            <span className="featuredMoneyuser">
              <FaUsers />
            </span>
          </div>
          <span className="featuredSubuser"></span>
          </div>
          </div>
              <div className="userUpdate">
                <span className="userUpdateTitle">Edit</span>
                <form className="userUpdateForm" onSubmit={handleEditMeal}>
                  <div className="userUpdateLeft">
                    <div className="userUpdateItem">
                      <label>اسم الوجبة</label>
                      <input
                        type="text"
                        placeholder="تحديث اسم الوجبة"
                        className="userUpdateInput"
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </div>
                   
                    
                 
                    <div className="userUpdateItem">
                      <label>السعر</label>
                      <input
                        type="text"
                        placeholder="السعر"
                        className="userUpdateInput"
                        onChange={(e) => {
                          setPrice(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="userUpdateRight">
                    <div className="userUpdateUpload">
                      <img
                        className="userUpdateImg"
                        src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                        alt=""
                      />
                      <label htmlFor="file">
                        <Publish className="userUpdateIcon" 
                        onChange={(e) => {
                          setImage(e.target.value);
                        }}/>
                      </label>
                      <input type="file" id="file" style={{ display: "none" }} />
                    </div>
                    <button className="userUpdateButton">تعديل</button>
                  </div>
                </form>
                {status
            ? message && <div className="SuccessMessage">{message}</div>
            : message && <div className="ErrorMessage">{message}</div>}
              </div>
            </div>
          </div>
          </div>
    */
