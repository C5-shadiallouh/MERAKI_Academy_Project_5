import { useState } from "react"
import axios from `axios`
import {useSelector} from `react-redux`

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
    axios.post(`http://localhost:5000/register`,{
    firstName,
    lastName,
    city,
    email,
    password,
    role_id:2

})
if (result.data.success) {
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
};


return (
    <>
      <div className="Form">
        {!isLoggedIn ? (
          <>
            <form onSubmit={addNewUser}>
              <br />
              <input
                type="text"
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <br />
              <input
                type="text"
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
              />
              <br />
              <input
                type="text"
                placeholder="city"
                onChange={(e) => setCity(e.target.value)}
              />
              <br />
             
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />

              <button>Register</button>
              <br />
            </form>
            {status
              ? message && <div className="SuccessMessage">{message}</div>
              : message && <div className="ErrorMessage">{message}</div>}
          </>
        ) : (
          <p>Logout First</p>
        )}
      </div>
    </>
  );
};

export default Register;