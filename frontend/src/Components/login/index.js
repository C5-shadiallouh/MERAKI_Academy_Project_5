import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
//login with google
import { GoogleLogin } from "react-google-login";
import { loggedin } from "../../redux/reducers/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
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

  const loginWithGoogle = (response) => {
    console.log(response.profileObj.givenName);
    try{
      axios.post(`http://localhost:5000/register`,{
      firstName : response.profileObj.givenName,
      lastName : response.profileObj.familyName,
      city:null,
      email : response.profileObj.email,
      password : response.profileObj.googleId,
      role_id:2
  
  })
  if (response.tokenId) {
      setStatus(true);
      setMessage("The user has been created successfully");
    } else throw Error;
  } catch (error) {
    setStatus(false);
    if (error.response && error.response.data) {
      return setMessage(error.response.data.message);
    }
    setMessage("Error happened while register, please try again");
  }
  }
  const login = async (e) => {
    // e.preventDefault();
    console.log("Login:");
    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
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
      <div className="loginDiv">
        <p className="Title">Login:</p>
        <input
          type="email"
          placeholder="Email ..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button onClick={login}>Login</button>
        <GoogleLogin
          clientId="171142303177-dlklu0me533t11g37ll28pjmd603vh8c.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={loginWithGoogle}
          onFailure={loginWithGoogle}
          cookiePolicy={"single_host_origin"}
        />
        
      </div>

      {status
        ? message && <div className="SuccessMessage">{message}</div>
        : message && <div className="ErrorMessage">{message}</div>}
    </>
  );
};

export default Login;
