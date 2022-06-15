import React from "react";
import "./style.css"
import { FaCheckCircle } from 'react-icons/fa';
import { useSelector } from "react-redux";


const Alert =()=>{
    const {message}=useSelector((state)=>{
        return{
            message:state.message.message
        }
    })
    return(
        <div id="popup1" className="overlay">
  <div className="popup">
    <div className="check">
 <FaCheckCircle size="30%"/>
 </div>
    <a className="close" href="">&times;</a>
    <div className="content">
      {message}
    </div>
  </div>
</div>
    )
}
export default Alert