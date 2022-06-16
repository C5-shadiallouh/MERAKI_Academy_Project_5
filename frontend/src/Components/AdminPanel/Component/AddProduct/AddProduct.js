import "./style.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { addNewMeal, setMeals } from "../../../../redux/reducers/meals/index";
import ChartBar from "../../Charts/ChartBar/ChartBar";
import { RiProductHuntFill } from "react-icons/ri";
import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import SideBar from "../Dashboard/SideBar/SideBar";


const NewProduct=()=> {

  const {meals} = useSelector((state) => {
    return {
      meals: state.meals.meals,
    };
  });
  const dispatch = useDispatch();
  const [meal_name, setName] = useState("");
  const [meal_price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  
  useEffect(()=>{
    axios.get("http://localhost:5000/meals/").then((result)=>{
      dispatch(setMeals(result.data.result))
    }).catch((err)=>{
      console.log(err);
    })
  },[])
  const handleAddMeale = () => {
    try {
      const res = axios.post(`http://localhost:5000/meals/addmeal`, {
        meal_name,
        meal_price,
        image,
        category,
      });
      if (res) {
        setStatus(true);
        setMessage("تم اضافة وجبة جديدة الى القائمة");
        dispatch(
          addNewMeal({
            meal_name,
            meal_price,
            image,
            category,
          })
        );
      } else throw Error;
    } catch (error) {
      setStatus(false);
      if (error.response && error.response.data) {
        return setMessage(error.response.data.message);
      }
      setMessage("حدث خطأ والرجاء المحاولة مرة اخرى");
    }
  };
  return (
<div>
  <SideBar/>
      <div className="newUser">
        <div>
          <h1 className="newUserTitle">اضافة وجبة جديد</h1>
        </div>
        <form className="newUserForm" onSubmit={handleAddMeale}>
          <div className="newUserItem">
            <label className="lal">اسم الوجبة</label>
            <input type="text" placeholder="اسم الوجبة" className="in" 
            onChange={(e)=>{setName(e.target.value)}}/>
          </div>
          <div className="newUserItem">
            <label className="lal">سعر الوجبة</label>
            <input type="text" placeholder="سعر الوجبة" className="in"
            onChange={(e)=>{setPrice(e.target.value)}} />
          </div>
          <div className="newUserItem">
            <label className="lal">الصنف</label>
            <input type="text" placeholder="الصنف" className="in"
            onChange={(e)=>{setCategory(e.target.value)}} />
          </div>
          <div className="newUserItem  NNN">
          <label className="lal">اضف صورة</label>

          <label htmlFor="file">
                    <Publish className="userUpdateIcon" 
                    onChange={(e) => {
                      setImage(e.target.value);
                      
                    }}/>
                  </label>
                  <input type="file" id="file" style={{ display: "none" }} />
                  </div>

          <button className="newUserButton mmm" >اضافة</button>
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
      
    </div>
  );
};

export default NewProduct;
