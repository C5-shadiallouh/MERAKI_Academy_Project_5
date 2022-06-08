import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMeals } from "../../redux/reducers/meals";
import { useParams } from "react-router-dom";

const GetMealByCategory = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const { meals } = useSelector((state) => {
    return {
      meals: state.meals.meals,
    };
  });
  useEffect(() => {
    axios
      .get(`http://localhost:5000/meals/pageInCategory?p=1&name=${name}`)
      .then((result) => {
        dispatch(setMeals(result.data.products));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [meals]);
  return (
    <div>
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
export default GetMealByCategory;
