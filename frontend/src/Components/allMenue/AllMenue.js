import axios from "axios";
import { useState, useEffect } from "react";
import { setMeals } from "../../redux/reducers/meals/index";
import { useSelector, useDispatch } from "react-redux";
import { changePage } from "../../redux/reducers/page/pageReducer";
import { Link } from "react-router-dom";
import "./style.css";
import Alert from "../Alert/Alert";
import Error from "../Error/Error";
import { setMessage } from "../../redux/reducers/message/message";

const AllMenue = (req, res) => {
  const [meal, setMeal] = useState([]);
  const [succeed, setSucceed] = useState(false);
  const [failed, setFailed] = useState(false);
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

  const addToCart = (meal_id, quantity, price,one) => {
    axios
      .post(
        "http://localhost:5000/cart/add",
        {
          one: one,
          meal_id: meal_id,
          quantity: one==true? 1:quantity,
          total: quantity * price, 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        setSucceed(!succeed);
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch(setMessage("تم اضافة الوجبة الى سلة المشتريات"));
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/meals/paginated?p=${page}`)
      .then((result) => {
        console.group(result);
        dispatch(setMeals(result.data.products));
      })
      .catch((err) => {});
    axios
      .get("http://localhost:5000/meals")
      .then((result) => {
        setMeal(result.data.result);
      })
      .catch((err) => {});
  }, [page, succeed]);

  return (
    <div>
      <div style={succeed ? { display: "block" } : { display: "none" }}>
        <Alert />
      </div>
      <div style={failed ? { display: "block" } : { display: "none" }}>
        <Error />
      </div>

      <h1 style={{ marginRight: "42%", marginTop: "1%" }}>جميع الأصناف</h1>

      <table>
        <tbody>
          {meals.length &&
            meals.map((meal, index) => {
              return (
                <tr key={meal.id}>
                  <td key={`tabledata${meal.id}`}>
                    <Link
                      to={`/meals/${meal.id}`}
                      onClick={() => {
                        dispatch(changePage(1));
                      }}
                    >
                      <img
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
                      onClick={() => {
                        console.log(meal.id);
                        addToCart(meal.id,1, meal.meal_price,true);
                      }}
                    >
                      اضافة الى سلة المشتريات
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
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
              }
            }}
          >
            &raquo;
          </Link>

          {meal.length
            ? meal.map((element, index) => {
                return (
                  <Link
                    key={index}
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
            &laquo;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllMenue;
