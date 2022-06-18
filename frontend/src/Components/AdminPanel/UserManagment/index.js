import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setUser,
  deleteUserById,
} from "../../../redux/reducers/users/usersReducer";

const UsersManagement = () => {
  const dispatch = useDispatch();
  const { users, token, isAdmin } = useSelector((state) => {
    return {
      users: state.users.users,
      token: state.auth.token,
      isAdmin: state.auth.isAdmin,
    };
  });
  const [role_id, setRole_id] = useState("");
  const [isClicked, setIsCLicked] = useState(false);
  const [meal_id, setMeal_id] = useState("");

  const getAllUsers = () => {
    axios
      .get("https://abedhamadarests.herokuapp.com/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        dispatch(setUser(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteUser = (id) => {
    axios
      .delete(`https://abedhamadarests.herokuapp.com/users/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        dispatch(deleteUserById(id));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const changeRole = (id) => {
    axios.put(
      `https://abedhamadarests.herokuapp.com/users/updaterole/${id}`,
      { role_id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };
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
                <button
                  onClick={() => {
                    if (isAdmin) deleteUser(element.id);
                  }}
                >
                  حذف المستخدم
                </button>
                {isClicked && meal_id == element.id ? (
                  <div>
                     {" "}
                    <input
                      type="radio"
                      id="Admin"
                      name="role"
                      value="Admin"
                      onClick={() => {
                        setRole_id(1);
                      }}
                    />
                      <label>مشرف</label>
                    <br></br> {" "}
                    <input
                      type="radio"
                      id="User"
                      name="role"
                      value="User"
                      onClick={() => {
                        setRole_id(2);
                      }}
                    />
                      <label>مستخدم</label>
                    <button
                      onClick={() => {
                        setIsCLicked(!isClicked);
                        changeRole(element.id);
                      }}
                    >
                      حفظ
                    </button>
                  </div>
                ) : (
                  ""
                )}
                <button
                  onClick={() => {
                    setIsCLicked(!isClicked);
                    setMeal_id(element.id);
                  }}
                >
                  تغيير الدور
                </button>
                   
              </div>
            );
          })
        : ""}
    </div>
  );
};

export default UsersManagement;
