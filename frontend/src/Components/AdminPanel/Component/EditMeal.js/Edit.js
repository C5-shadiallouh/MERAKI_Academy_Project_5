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
      </div>
    </div>
  );
};
export default Edit;
