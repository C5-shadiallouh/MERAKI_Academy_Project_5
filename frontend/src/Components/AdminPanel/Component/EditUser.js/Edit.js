import {
    CalendarToday,
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
    Publish,
  } from "@material-ui/icons";
  import { Link } from "react-router-dom";
  import "./style.css";
  
  import axios from "axios";
  import {  useState, useEffect } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { useParams } from "react-router-dom";
  import meals, { setMeals, updateMeal } from "../../../../redux/reducers/meals/index";
  
  const Edit = () => {
    const { id } = useParams();
  const meals=useSelector((state)=>{
    return {
      meals:state.meals.meals
    }
  })
    const dispatch = useDispatch();
    const [meal_name, setName] = useState();
    const [meal_price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState(false);
useEffect(()=>{
  axios.get(`http://localhost:5000/meals`).then((result)=>{
    dispatch(setMeals(result.data.result))
  })
})






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
      <div className="user">
        <div className="userTitleContainer">
          <h1 className="userTitle">تعديل معلومات الزائر</h1>
          <Link to="/newUser">
            <button className="userAddButton">العودة</button>
          </Link>
        </div>
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              <img
                src={""}
                alt=""
                className="userShowImg"
              />
              <div className="userShowTopTitle">
                <span className="userShowUsername">Anna Becker</span>
                <span className="userShowUserTitle">Software Engineer</span>
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">Account Details</span>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">annabeck99</span>
              </div>
              <div className="userShowInfo">
                <CalendarToday className="userShowIcon" />
                <span className="userShowInfoTitle">10.12.1999</span>
              </div>
              <span className="userShowTitle">Contact Details</span>
              <div className="userShowInfo">
                <PhoneAndroid className="userShowIcon" />
                <span className="userShowInfoTitle">+1 123 456 67</span>
              </div>
              <div className="userShowInfo">
                <MailOutline className="userShowIcon" />
                <span className="userShowInfoTitle">annabeck99@gmail.com</span>
              </div>
              <div className="userShowInfo">
                <LocationSearching className="userShowIcon" />
                <span className="userShowInfoTitle">New York | USA</span>
              </div>
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
    );
  }
  export default Edit