import axios from "axios";
import { useState, useEffect } from "react";
import { setMeals, deleteMeal } from "../../../redux/reducers/meals/index";
import { useSelector, useDispatch } from "react-redux";
import { changePage } from "../../../redux/reducers/page/pageReducer";
import { Link } from "react-router-dom";
import { RiDeleteBin2Line } from "react-icons/ri";
import { AiOutlineEye } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
const MealManagement = () => {
  const [meal, setMeal] = useState([]);
  const [message, setMessage] = useState(``);
  const dispatch = useDispatch();
  const { meals, page } = useSelector((state) => {
    return {
      meals: state.meals.meals,
      page: state.page.page,
    };
  });

  useEffect(() => {
    axios
      .get(
        `https://abedhamadarestaurant.herokuapp.com/meals/paginated?p=${page}`
      )
      .then((result) => {
        dispatch(setMeals(result.data.products));
      })
      .catch((err) => {
        setMessage(err.sqlMessage);
      });
    axios
      .get("https://abedhamadarestaurant.herokuapp.com/meals")
      .then((result) => {
        setMeal(result.data.result);
      })
      .catch((err) => {
        setMessage(err.sqlMessage);
      });
  }, [page]);

  const handleRemoveFromCart = (id) => {
    axios
      .delete(`https://abedhamadarestaurant.herokuapp.com/meals/delete/${id}`)
      .then((result) => {
        dispatch(deleteMeal(id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <table className="tableAdmin">
        <td>#</td>
        <td>الصورة</td>
        <td>الاسم</td>
        <td>السعر</td>
        <td>تعديل</td>

        {meals &&
          meals.map((meal, index) => {
            return (
              <tr className="trAdmin">
                <td className="tdAdmin">{index + 1}</td>
                <img src={meal.image} alt="" key={meal.id} width={"150px"} />
                <td className="tdAdmin" key={meal.meal_name}>
                  {meal.meal_name}
                </td>
                <td className="tdAdmin" key={meal.meal_tdrice}>
                  {meal.meal_price}
                </td>

                <td className="tdAdmin">
                  <RiDeleteBin2Line
                    key={index}
                    onClick={() => {
                      handleRemoveFromCart(meal.id);
                    }}
                    style={{ cursor: "pointer" }}
                  />
                  <Link to={`/meals/${meal.id}`}>
                    <AiOutlineEye
                      key={index * 100}
                      style={{ cursor: "pointer" }}
                    />
                  </Link>
                  <Link to={`/editMeal/${meal.id}`}>
                    <BiEditAlt key={index * 100} />
                  </Link>
                </td>
              </tr>
            );
          })}
      </table>
      <div>
        <Link to={"/add"}>addMeale</Link>
      </div>

      <div style={{ display: "none" }}>
        {meal ? (meal.length = Math.ceil(meal.length / 20)) : ""}
      </div>
      <div className="center">
        <div className="pagination">
          <Link
            to="#"
            onClick={() => {
              if (page < meal.length) {
                dispatch(changePage(page + 1));
              }
            }}
          >
            &laquo;
          </Link>

          {meal.length
            ? meal.map((element, index) => {
                return (
                  <Link
                    to=""
                    onClick={() => {
                      dispatch(changePage(index + 1));
                    }}
                  >
                    {index + 1}
                  </Link>
                );
              })
            : ""}
          <Link
            to="#"
            onClick={() => {
              if (page > 1) {
                dispatch(changePage(page - 1));
              }
            }}
          >
            &raquo;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MealManagement;
