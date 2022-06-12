import React, { useEffect, useState } from "react";
import { setMeals } from "../../redux/reducers/meals";
import { setComments, addNewComment } from "../../redux/reducers/comment";
import { addRating } from "../../redux/reducers/rating/rating";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { setRatings, getRating } from "../../redux/reducers/rating/rating";
const MealPage = () => {
const [clicked, setClicked] = useState(false);

const MealPage = () => {
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();

  const { meals, token, comments, allComments, ratings, ratingAvg } =
    useSelector((state) => {
      return {
        token: state.auth.token,
        meals: state.meals.meals,
        comments: state.comments.comments,
        allComments: state.comments.allComments,
        ratings: state.ratings.ratings,
        ratingAvg: state.ratings.ratingAvg,
      };
    });
  const [rating, setRating] = useState(ratings); // initial rating value
  const handleRating = (rate) => {
    setRating(rate); // other logic
  };

  const { meals, token,comments,allComments } = useSelector((state) => {
    return {
      token: state.auth.token,
      meals: state.meals.meals,
      comments:state.comments.comments,
      allComments:state.comments.allComments
    };
  });

  const getAllComments = async (id) => {
    await axios
      .get(`http://localhost:5000/comment/${id}`)
      .then((result) => {
        dispatch(setComments(result.data.result));
        console.log(result);
        dispatch(setComments( result.data.result));
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
        dispatch(
          addNewComment({
            comment: result.data.result,
            id: result.data.result.insertId,
            commenter: result.data.commenter,
          })
        );
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

    getAllComments(id);
    if (rating > 0) {
      axios
        .post(
          `http://localhost:5000/meals/rating/${id}`,
          { rate: rating },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((result) => {

        })
        .catch((error) => {
          console.log(error);
        });
    }
    axios
      .get(`http://localhost:5000/meals/getrating/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        if (result.data.length) {
          dispatch(setRatings(result.data[0].rate));
        }
      });
    axios.get(`http://localhost:5000/meals/rating/${id}`).then((result) => {
      console.log(result.data.result[0]);
      if (result.data.result.length) {
        dispatch(getRating(result.data.result[0].AverageRate));
      }
    });
     getAllComments(id)

  }, [clicked, rating, ratings,allComments]);    
      
  return (
    <div>
      {meals.length
        ? meals.map((element) => {
            return (
              <div>
                <img src={element.image} />
                <h1>{element.meal_name}</h1>


                <div>
                  <Rating
                    onClick={handleRating}
                    ratingValue={ratings} /* Available Props */
                  />
                  {ratingAvg ? ratingAvg / 20 : "not Rated"}
                </div>
                <div>{/* for rating */}</div>

                <div>
                  <textarea
                    placeholder="إضافة تعليق..."
                    onChange={(e) => {
                      setComment(e.target.value)
                    }}
                  />
                  <button
                    onClick={() => {
                      addComment(element.id);
                      setClicked(!clicked);
                    }}
                  >
                    إضافة
                  <button onClick={() => {
                   
                    addComment(element.id)}}>
                  إضافة
                  </button>
                </div>
              </div>
            );
          })
        : ""}
      {allComments.length
        ? allComments.map((element) => {
            return <p>{element.comment}</p>;
          })
        : ""}
    </div>
  );
};

export default MealPage;
