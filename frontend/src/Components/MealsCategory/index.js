import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMeals } from "../../redux/reducers/meals";
import { useParams } from "react-router-dom";
import { changePage } from "../../redux/reducers/page/pageReducer";
import { Link } from "react-router-dom";

const GetMealByCategory = () => {
  const [meal, setMeal] = useState([]);

  const { name } = useParams();
  const dispatch = useDispatch();
  const { meals, page } = useSelector((state) => {
    return {
      meals: state.meals.meals,
      page: state.page.page,
    };
  });
  console.log("Iam hereeeeeeeeeeeeeeeeeeeeeeeeeee", page);


  useEffect(() => {
    axios
      .get(`http://localhost:5000/meals/pageInCategory?p=${page}&name=${name}`)

      .then((result) => {
        console.group(result);
        dispatch(setMeals(result.data.products));
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`http://localhost:5000/meals/category?name=${name}`)

      .then((result) => {
        setMeal(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [name]);
  return (
    <div>
      {meal.length ? console.log(meal.length) : ""}
      {meals.length
        ? meals.map((element, index) => {
            return (
              <div>
                <p>{element.meal_name}</p>
                <img src={element.image} />
              </div>
            );
          })
        : ""}

      <div style={{ display: "none" }}>
        {console.log("prev", meal.length)}
        {(meal.length = Math.ceil(meal.length / 20))}
        {console.log("meal length", meal.length)}
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
export default GetMealByCategory;
