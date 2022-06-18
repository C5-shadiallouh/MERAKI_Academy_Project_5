import "./style.css";
import { AiOutlineEye } from "react-icons/ai";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setUser } from "../../../../../redux/reducers/users/usersReducer";
import { FaUserAlt } from "react-icons/fa";

const NewUsers = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => {
    return {
      token: state.auth.token,
      user: state.users.users,
    };
  });
  const [users, setUsers] = useState([]);
  const getAllUsers = () => {
    axios
      .get("https://abedhamadarestaurant.herokuapp.com/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        dispatch(setUser(result.data.result));
      });
  };
  useEffect(() => {
    getAllUsers();
  }, [users]);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">المستخدمين الجدد</span>

      <ul className="widgetSmList">
        {user.length
          ? user.map((element) => {
              return (
                <li className="widgetSmListItem">
                  <FaUserAlt />
                  <div className="widgetSmUser">
                    <span className="widgetSmUsername">
                      {element.firstName} {element.lastName}
                    </span>
                    <span className="widgetSmUserTitle">
                      {element.role_id == 1 ? "مدير" : "مستخدم"}
                    </span>
                  </div>
                </li>
              );
            })
          : ""}
      </ul>
    </div>
  );
};
export default NewUsers;
