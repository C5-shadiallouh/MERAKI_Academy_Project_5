import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios"

import { loggedin } from "../../redux/reducers/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { token, isLoggedIn,isAdmin } = useSelector((state) => {
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
      isAdmin:state.auth.isAdmin
    };
  });

  const login = async (e) => {
    e.preventDefault();
    console.log("Login:");
    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      if (res) {
        setMessage("");
        
        dispatch(loggedin({token:res.data.token,isAdmin:res.data.isAdmin}));
        navigate("/")
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
      </div>

      {status
        ? message && <div className="SuccessMessage">{message}</div>
        : message && <div className="ErrorMessage">{message}</div>}
    </>
  );
};

export default Login;
