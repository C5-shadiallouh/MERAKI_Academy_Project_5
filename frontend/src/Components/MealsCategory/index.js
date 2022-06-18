import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMeals } from "../../redux/reducers/meals";
import { useParams } from "react-router-dom";
import { changePage } from "../../redux/reducers/page/pageReducer";
import { Link } from "react-router-dom";
import Alert from "../Alert/Alert";
import Error from "../Error/Error";
import { setMessage } from "../../redux/reducers/message/message";

const GetMealByCategory = () => {
  const [succeed, setSucceed] = useState(false);
  const [failed, setFailed] = useState(false);
  const [meal, setMeal] = useState([]);
  const { name } = useParams();
  const dispatch = useDispatch();
  const { meals, page, token, message, totalQuantity } = useSelector(
    (state) => {
      return {
        meals: state.meals.meals,
        page: state.page.page,
        token: state.auth.token,
        message: state.message.message,
        totalQuantity: state.carts.totalQuantity,
      };
    }
  );
  const addToCart = (meal_id, quantity, price) => {
    axios
      .post(
        "https://abedhamadarestaurant.herokuapp.com/cart/add",
        { meal_id: meal_id, quantity: quantity, total: quantity * price },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        setSucceed(!succeed);
        dispatch(setMessage("تم اضافة الوجبة الى سلة المشتريات"));
      })
      .catch((err) => {
        setFailed(!failed);
        dispatch(setMessage("الرجاء تسجيل الدخول "));
      });
  };

  useEffect(() => {
    axios
      .get(
        `https://abedhamadarestaurant.herokuapp.com/meals/pageInCategory?p=${page}&name=${name}`
      )

      .then((result) => {
        console.group(result);
        dispatch(setMeals(result.data.products));
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(
        `https://abedhamadarestaurant.herokuapp.com/meals/category?name=${name}`
      )

      .then((result) => {
        setMeal(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page, name, succeed, failed]);
  return (
    <div key={"cc"}>
      <div style={succeed ? { display: "block" } : { display: "none" }}>
        <Alert />
      </div>
      <div style={failed ? { display: "block" } : { display: "none" }}>
        <Error />
      </div>
      <h1 style={{ marginRight: "42%", marginTop: "1%" }}>{name}</h1>
      <table>
        {meals.length &&
          meals.map((meal, index) => {
            return (
              <tr>
                <td>
                  <Link
                    to={`/meals/${meal.id}`}
                    onClick={() => {
                      dispatch(changePage(1));
                    }}
                  >
                    <img
                      className="scale"
                      src={meal.image}
                      alt=""
                      key={meal.id}
                      width={"150px"}
                    />
                  </Link>
                </td>
                <td key={meal.meal_name}>{meal.meal_name}</td>
                <td key={meal.meal_price}>{meal.meal_price}</td>

                <td>
                  <button
                    className="addToCart"
                    onClick={() => {
                      addToCart(meal.id, 1, meal.meal_price);
                    }}
                  >
                    اضافة الى سلة المشتريات
                  </button>
                </td>
                {message}
              </tr>
            );
          })}
      </table>
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
                window.scrollTo(0, 10);
              }
            }}
          >
            &raquo;
          </Link>

          {meal.length
            ? meal.map((element, index) => {
                return (
                  <Link
                    to=""
                    onClick={() => {
                      dispatch(changePage(index + 1));
                      window.scrollTo(0, 10);
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
                window.scrollTo(0, 10);
              }
            }}
          >
            &laquo;
          </Link>
        </div>
      </div>
    </div>
  );
};
export default GetMealByCategory;
