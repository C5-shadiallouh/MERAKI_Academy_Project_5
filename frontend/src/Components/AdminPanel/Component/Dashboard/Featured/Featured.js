import "./style.css";
import {
  setUser,
} from "../../../../../redux/reducers/users/usersReducer"
import { RiProductHuntFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import {  setMeals } from "../../../../../redux/reducers/meals/index";
import {MdLocalPharmacy} from "react-icons/md"
import {BsFillCartCheckFill} from "react-icons/bs"
import {FaUsers,FaMoneyBillAlt} from "react-icons/fa"


export default function FeaturedInfo() {
  const dispatch = useDispatch();

  const { meals,users } = useSelector((state) => {
    return {
      meals: state.meals.meals,
      users:state.users.users
    };
  });
  useEffect(() => {
    axios
      .get("http://localhost:5000/meals/")
      .then((result) => {
        dispatch(setMeals(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(()=>{
    axios.get("http://localhost:5000/users/").then((result)=>{
      dispatch(setUser(result.data.result))
    }).catch((err)=>{
      console.log(err);
    })
  },[])
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">عدد الوجبات الحالية</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{meals.length}وجبة</span>
          <br/>
          <br/>
          <span className="featuredMoneyRate">
            +{meals.length} <MdLocalPharmacy  className="featuredIcon negative"/>
          </span>
         
        </div>
        <MdLocalPharmacy style={{height:"20%",width:"20%"}}/>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">عدد السلات النشطة</span>
        <div className="featuredMoneyContainer">
        <br/>
          <br/>
          <span className="featuredMoney">2سلة</span>
          <br/>
          <br/>
          <span className="featuredMoneyRate">
            +2  <BsFillCartCheckFill className="featuredIcon negative"/>
          </span>
        </div>
        <BsFillCartCheckFill style={{height:"20%",width:"20%"}}/>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">المبيعات الاجمالية</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">0دينار اردني</span>
          <span className="featuredMoneyRate">
            +2.4 <FaMoneyBillAlt className="featuredIcon"/>
          </span>
        </div>
        <FaMoneyBillAlt style={{height:"20%",width:"20%"}}/>
      </div>

      <div className="featuredItem">
        <span className="featuredTitle">عدد الاشخاص في الموقع</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{users.length}شخص</span>
          <span className="featuredMoneyRate">
            +{users.length} <FaUsers className="featuredIcon"/>
          </span>
        </div>
        <span className="featuredSub"><FaUsers style={{height:"20%",width:"20%"}}/></span>
      </div>
    </div>
  );
}