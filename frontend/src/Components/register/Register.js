import { useState } from "react"
import axios from "axios";
import { useSelector } from "react-redux";

const Register=()=>{
const [firstName,setFirstName]=useState(``)
const [lastName,setLastName]=useState(``)
const[email,setEmail]=useState(``)
const [password,setPassword]=useState(``)
const [city,setCity]=useState(``)
const [message,setMessage]=useState(``)
const [status,setStatus]=useState(``)

const {isLoggedIn}=useSelector((state)=>{
    return {
        isLoggedIn:state.auth.isLoggedIn
    }
})
//this fuction to add new user
const addNewUser=()=>{
try{
   const res= axios.post(`http://localhost:5000/register`,{
    firstName,
    lastName,
    city,
    email,
    password,
    role_id:2

})
if (res) {
    setStatus(true);
    setMessage("The user has been created successfully");
  } else throw Error;
} catch (error) {
  console.log(error);
  setStatus(false);
  if (error.response && error.response.data) {
    return setMessage(error.response.data.message);
  }
  setMessage("حدث خطأ خلال التسجيل ... الرجاء إعادة المحاولة");
}
};


return (
    <>
      <div className="login">
        {!isLoggedIn ? (
          <>
          <h2 className="active"> تسجيل مستخدم جديد : </h2>
            <form onSubmit={addNewUser}>
              <br />
              <input
                type="text"
                className="text"
                placeholder="الإسم الأول ..."
                onChange={(e) =>{
            if(e.target.value==" "){return setMessage("الرجاء إدخال الإسم الأول")}
               else{   
                  setFirstName(e.target.value)}}}
              />
              <br />
              <input
                type="text"
                className="text"
                placeholder="الإسم الأخير ..."
                onChange={(e) =>{
                  if(e.target.value==" "){return setMessage("الرجاء إدخال الإسم الأخير")}
                     else{   setLastName(e.target.value)}}}
              />
              <br />
              <input
                type="text"
                className="text"
                placeholder="المدينة ..."
                onChange={(e) => {
                  if(e.target.value==" "){return setMessage("الرجاء إدخال إسم المدينة")}
                     else{  setCity(e.target.value)}}}
              />
              <br />
             
              <input
                type="email"
                className="text"
                placeholder="الإيميل ..."
                onChange={(e) => {
                  if(e.target.value==" "){return setMessage("الرجاء إدخال الإيميل")}
                     else{  setEmail(e.target.value)}}}
              />
              <br />
              <input
                type="password"
                className="text"
                placeholder="كلمة السر ..."
                onChange={(e) =>{
                  if(e.target.value==" "){return setMessage("الرجاء إدخال كلمة السر")}
                     else{   setPassword(e.target.value)}}}
              />
              <br />

              <button className="login_button">تسجيل</button>
              <br />
            </form>
            {status
              ? message && <div className="SuccessMessage">{message}</div>
              : message && <div className="ErrorMessage">{message}</div>}
          </>
        ) : (
          <p>من فضلك ... قم بتسجيل الخروج أولا ..</p>
        )}
      </div>
    </>
  );
};

export default Register;