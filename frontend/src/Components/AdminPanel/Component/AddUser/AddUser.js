import { FaUsers } from "react-icons/fa";
import "./style.css";
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ChartBar from "../../Charts/ChartBar/ChartBar";
import {
  addUser,
  setUser,
} from "../../../../redux/reducers/users/usersReducer";
const NewUser = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => {
    return {
      users: state.users.users,
    };
  });
  console.log(users.length);
  const [firstName, setFirstName] = useState(``);
  const [lastName, setLastName] = useState(``);
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);
  const [city, setCity] = useState(``);
  const [message, setMessage] = useState(``);
  const [status, setStatus] = useState(``);
  const addNewUser = () => {
    try {
      const res = axios.post(`http://localhost:5000/register`, {
        firstName,
        lastName,
        city,
        email,
        password,
        role_id: 2,
      });
      if (res) {
        setStatus(true);
        setMessage("The user has been created successfully");
        dispatch(
          addUser({
            firstName,
            lastName,
            city,
            email,
            password,
            role_id: 2,
          })
        );
      } else throw Error;
    } catch (error) {
      setStatus(false);
      if (error.response && error.response.data) {
        return setMessage(error.response.data.message);
      }
      setMessage("حدث خطأ خلال التسجيل ... الرجاء إعادة المحاولة");
    }
  };

  useEffect(()=>{
    axios.get("http://localhost:5000/meals/").then((result)=>{
      dispatch(setUser(result.data.result))
    }).catch((err)=>{
      console.log(err);
    })
  },[])
  console.log(users.length);
  return (
    <div>
      <div className="newUser">
        <div>
          <h1 className="newUserTitle">اضافة مستخدم جديد</h1>
        </div>
        <form className="newUserForm">
          <div className="newUserItem">
            <label className="lal">الاسم الاول</label>
            <input type="text" placeholder="الاسم الاول" className="in" 
            onChange={(e)=>{setFirstName(e.target.value)}}/>
          </div>
          <div className="newUserItem">
            <label className="lal">الاسم الاخير</label>
            <input type="text" placeholder="الاسم الاخير" className="in"
            onChange={(e)=>{setLastName(e.target.value)}} />
          </div>
          <div className="newUserItem">
            <label className="lal">الايميل</label>
            <input type="email" placeholder="john@gmail.com" className="in"
            onChange={(e)=>{setEmail(e.target.value)}} />
          </div>
          <div className="newUserItem">
            <label className="lal">كلمة المرور</label>
            <input type="password" placeholder="كلمة المرور" className="in" onChange={(e)=>{setPassword(e.target.value)}}/>
          </div>

          <div className="newUserItem">
            <label className="lal">العنوان</label>
            <input type="text" placeholder="اربد" className="in" 
            onChange={(e)=>{setCity(e.target.value)}} />
          </div>

          <button className="newUserButton">اضافة</button>
        </form>
      </div>

      <div className="featureduser">
        <div className="featuredItemuser">
          <span className="featuredTitleuser"> العدد الاجمالي للمسجلين</span>
          <div className="featuredMoneyContaineruser">
            <span className="featuredMoneyuser">
              <FaUsers />
            </span>
          </div>
          <span className="featuredSubuser">{users.length}</span>
        </div>
      </div>
      < div className="cchart">
        <ChartBar/>
      </div>
    </div>
  );
};

export default NewUser;
