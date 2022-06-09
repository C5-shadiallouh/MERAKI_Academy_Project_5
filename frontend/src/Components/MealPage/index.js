import React, { useEffect, useState } from "react";
import { setMeals } from "../../redux/reducers/meals";
import { setComments,addNewComment } from "../../redux/reducers/comment";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";

const MealPage = () => {
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const { meals, token } = useSelector((state) => {
    return {
      token: state.auth.token,
      meals: state.meals.meals,
    };
  });
  console.log(token);

  const addComment = async (id) => {
    await axios
      .post(
        `http://localhost:5000/comment/${id}`,
        {
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        dispatch(addNewComment(result.data.result));
        axios
      .get(
        `http://localhost:5000/comment`).then((res2)=>{
          console.log(res2);
        dispatch(setComments(res2.data.res2));
        })

      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/meals/id/${id}`)
      .then((result) => {
        dispatch(setMeals(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      {meals.length
        ? meals.map((element) => {
            return (
              <div>
                <img src={element.image} />
                <h1>{element.meal_name}</h1>

                <div>{/* for rating */}</div>

                <div>
                  <textarea
                    placeholder="comment..."
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                  />
                  <button onClick={() => addComment(element.id)}>
                    Add comment
                  </button>
                </div>
              </div>
            );
          })
        : ""}
      {console.log(meals)}
    </div>
  );
};

export default MealPage;
