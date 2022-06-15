import React from "react";
import "./style.css"
import { MdError } from 'react-icons/md';
import { useSelector } from "react-redux";
const Error =()=>{
  const {message}=useSelector((state)=>{
    return{
      message:state.message.message
    }
  })
    return(
        <div id="popup1" className="overlay">
          
  <div className="popup">
    <div className="error">
 <MdError size="30%"/>
 </div>
    <a className="close" href="">&times;</a>
    <div className="content">
      <p>{message}</p>
    </div>
  </div>
</div>
    )
}
export default Error