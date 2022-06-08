import axios from "axios";
import { useState, useEffect } from "react";
import { setMeals } from "../../redux/reducers/meals/index";
import { useSelector, useDispatch } from "react-redux";
import { changePage } from "../../redux/reducers/page/pageReducer";
import { Link } from "react-router-dom";

const AllMenue = (req, res) => {
  const [meal, setMeal] = useState([]);
  const [message, setMessage] = useState(``);
  const dispatch = useDispatch();
  const { meals,page } = useSelector((state) => {
    return {
      meals: state.meals.meals,
      page:state.page.page
    };
  });

 

  console.log(page);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/meals/paginated?p=${page}`)
      .then((result) => {
        console.group(result);
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

  return (
    <div key={"cc"}>
      {meals.length &&
        meals.map((meal, index) => {
          return (
            <>
              <p key={meal.meal_name}>{meal.meal_name}</p>
              <p key={meal.meal_price}>{meal.meal_price}</p>
              <Link to={`/meals/${meal.id}`}>
                <img src={meal.image} alt="" key={meal.id} />
              </Link>
              <button>Add to Cart</button>
              {message}
            </>
          );
        })}

      <div style={{ display: "none" }}>
        {(meal.length = Math.ceil(meal.length / 20))}
      </div>
      <div class="center">
        <div class="pagination">
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

export default AllMenue;
