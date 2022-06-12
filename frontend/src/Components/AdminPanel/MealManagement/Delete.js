import axios from "axios";
import { useState, useEffect } from "react";
import { setMeals, deleteMeal } from "../../../redux/reducers/meals/index";
import { useSelector, useDispatch } from "react-redux";
import { changePage } from "../../../redux/reducers/page/pageReducer";
import { Link } from "react-router-dom";

const MealeManagement = (req, res) => {
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
      .get(`http://localhost:5000/meals/paginated?p=${page}`)
      .then((result) => {
        dispatch(setMeals(result.data.products));
      })
      .catch((err) => {
        setMessage(err.sqlMessage);
      });
    axios
      .get("http://localhost:5000/meals")
      .then((result) => {
        setMeal(result.data.result);
      })
      .catch((err) => {
        setMessage(err.sqlMessage);
      });
  }, [page]);

  const handleRemoveFromCart = (id) => {
    axios
      .delete(`http://localhost:5000/meals/delete/${id}`)
      .then((result) => {
        dispatch(deleteMeal(id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleViewMeal = (id) => {
    axios
      .get(`http://localhost:5000/meals/id/${id}`)
      .then((result) => {
        dispatch(setMeals(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div>
        <span>الصورة</span>
        <span>الاسم</span>
        <span>السعر</span>
        <span>تعديل</span>
      </div>
      {meals &&
        meals.map((meal, index) => {
          return (
            <>
              <img src={meal.image} />
              <p key={meal.meal_name}>{meal.meal_name}</p>
              <p key={meal.meal_price}>{meal.meal_price}</p>

              <button
                key={index}
                onClick={() => {
                  handleRemoveFromCart(meal.id);
                }}
              >
                احذف
              </button>
              <Link to={`/edit/${meal.id}`}>
                <button key={index * 100}>تعديل</button>
              </Link>

              <Link to={"#"}>
                <button
                  key={index * 100}
                  onClick={() => {
                    handleViewMeal(meal.id);
                  }}
                >
                  عرض
                </button>
              </Link>
            </>
          );
        })}

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

export default MealeManagement;
