import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
//login with google
//npm install react-google-login
import { GoogleLogin } from "react-google-login";
import { loggedin } from "../../redux/reducers/auth";
import "./style.css"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageEmail, setMessageEmail] = useState("");

  const [status, setStatus] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { token, isLoggedIn, isAdmin } = useSelector((state) => {
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
      isAdmin: state.auth.isAdmin,
    };
  });

  const loginWithGoogle = async (response) => {

    const result = axios.get(`http://localhost:5000/users/${response.profileObj.email}`)
    .then(async(result)=>{ 
      if(result.data.result.length)
      {
        try {
     
          const res = await axios.post("http://localhost:5000/login", {
            email:response.profileObj.email,
            password:response.profileObj.googleId,
          });
          if (res) {
            setMessage("");
    
            dispatch(
              loggedin({ token: res.data.token, isAdmin: res.data.isAdmin })
            );
            navigate("/");
          } else throw Error;
        }
        catch (error) {
          if (error.response && error.response.data) {
           
          }
          setMessage("Error happened while Login, please try again");
        }
      }
      else{
        try {
          // console.log(response.profileObj.givenName);
          const res = await axios.post(`http://localhost:5000/register`, {
            firstName: response.profileObj.givenName,
            lastName: response.profileObj.familyName,
            city: "jordan",
            email: response.profileObj.email,
            password: response.profileObj.googleId,
            role_id: 2,
          });
          if (res) {
            try {
              const res = await axios.post("http://localhost:5000/login", {
                email:response.profileObj.email,
                password:response.profileObj.googleId,
              });
              if (res) {
                setMessage("");
        
                dispatch(
                  loggedin({ token: res.data.token, isAdmin: res.data.isAdmin })
                );
                navigate("/");
              } else throw Error;
            } catch (error) {
              if (error.response && error.response.data) {
                return setMessage(error.response.data.message);
              }
              setMessage("Error happened while Login, please try again");
            }
          } else throw Error;
        }
        catch (error) {
          if (error.response && error.response.data) {
            return setMessage(error.response.data.message);
          }
          setMessage("Error happened while Login, please try again");
        }
      }
      })
    .catch((err)=>{
      console.log(err);
    })
    
  };
  const login = async (e) => {
    // e.preventDefault();
    console.log("Login:");
    try {
      const res = await axios.post("http://localhost:5000/login", {
        email :email,
        password :password
      });
      if (res) {
        setMessage("");

        dispatch(
          loggedin({ token: res.data.token, isAdmin: res.data.isAdmin })
        );
        navigate("/");
      } else throw Error;
    } catch (error) {
      if (error.response && error.response.data) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Login, please try again");
    }
  };

  return (
    <>
      <div className="login">
        <h2 className="active"> تسجيل الدخول : </h2>
        <form>
          

          <span className="inputs">الإيميل :</span>
        <input
        className="text"
          type="email"
          placeholder="الإيميل ..."
          onChange={(e) => {
            if(e.target.value == " " || e.target.value =="" || !e.target.value.includes("@") || !e.target.value.includes(".com") ){return setMessageEmail(" @ / .com  يجب أن يحتوي الإيميل على ")}
            else if(e.target.value != " " && e.target.value !="" && e.target.value.includes("@") && e.target.value.includes(".com")){setMessageEmail("")}
           else{ setEmail(e.target.value)}}}
        />
        <p>{messageEmail}</p>
        
        <br />
        <span className="inputs">كلمة السر :</span>
        <input
        className="text                                                                 "
          type="password"
          placeholder="كلمة السر ..."
          onChange={(e) =>{ 
            
            if(e.target.value.length<4 || e.target.value==" "||e.target.value==""){ return setMessage(" الرجاء إدخال كلمة سر صحيحة لا تقل عن 4 أحرف ")}
            else if (e.target.value.length>4 && e.target.value!=" "&&e.target.value!=""){setMessage("")}
            else{
            setPassword(e.target.value)}}}
        />
        <p>{message}</p>
<br />
        
        <br />

        

        <button className="login_button" onClick={(e)=>{
          e.preventDefault()

          login()}}>تسجيل الدخول</button>

        <br />
        <br />
        <span className="googleLogin"><GoogleLogin
          clientId="171142303177-dlklu0me533t11g37ll28pjmd603vh8c.apps.googleusercontent.com"
          
          buttonText="الدخول بواسطة جوجل"
          onSuccess={loginWithGoogle}
          onFailure={loginWithGoogle}
          cookiePolicy={"single_host_origin"}
        /></span>
         
         </form>
      </div>

     
    </>
  );
};

export default Login;
