import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setUser,
  deleteUserById,
} from "../../../redux/reducers/users/usersReducer";

const UsersManagement = () => {
  const dispatch = useDispatch();
  const { users,token,isAdmin } = useSelector((state) => {
    return {
      users: state.users.users,
      token:state.auth.token,
      isAdmin:state.auth.isAdmin
      
    };
  });
  const [Role,setRole]=useState("")
  const getAllUsers = () => {
    axios
      .get("http://localhost:5000/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },})
      .then((result) => {
        dispatch(setUser(result.data.result));

      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:5000/users/delete/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },})
      .then((result) => {
        dispatch(deleteUserById(id));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const changeRole =()=>{
      
  }
  useEffect(() => {
    getAllUsers();
  }, [deleteUser]);

  return (
    <div>
      {users
        ? users.map((element, index) => {
            return (
              <div key={element.id}>
                <p>
                  {element.firstName} {element.lastName}
                </p>
                <button onClick={()=>{
                    if(isAdmin)
                    deleteUser(element.id)}}>delete user</button>
              </div>
            );
          })
        : ""}
    </div>
  );
};

export default UsersManagement;
