import React from "react";
import { setUser } from "../../redux/reducers/users/usersReducer";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
const AdminPanel = () => {
  return <div>
<Link to={"/usersmanagment"}>user management</Link>



  </div>;
};
export default AdminPanel