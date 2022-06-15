import React, { useEffect, useState } from "react";
import { setMeals } from "../../redux/reducers/meals";
import { setComments, addNewComment } from "../../redux/reducers/comment";
import { addRating } from "../../redux/reducers/rating/rating";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
//npm install react-rating-stars-component --save
import { Rating } from "react-simple-star-rating";
import { setRatings, getRating } from "../../redux/reducers/rating/rating";
import "./style.css";

const MealPage = () => {
  const [clicked, setClicked] = useState(false);
  // const [quantity, setQuantity] = useState("")
  const [mealPrice, setMealPrice] = useState("");
  const [counter, setCounter] = useState(1);
  const [comment, setComment] = useState("");
  const [value, setValue] = useState(0);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState();
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    meals,
    token,
    comments,
    allComments,
    ratings,
    ratingAvg,
    total,
    quantity,
  } = useSelector((state) => {
    return {
      token: state.auth.token,
      meals: state.meals.meals,
      comments: state.comments.comments,
      allComments: state.comments.allComments,
      ratings: state.ratings.ratings,
      ratingAvg: state.ratings.ratingAvg,
      total: state.meals.total,
      quantity: state.meals.quantity,
    };
  });
  const [rating, setRating] = useState(ratings); // initial rating value
  const handleRating = (rate) => {
    setRating(rate); // other logic
  };

  const counterPluse = () => {
    counter++;
  };
  const counterMinus = () => {
    counter--;
  };

  const handleChange = (e) => {};

  const getAllComments = async (id) => {
    await axios
      .get(`http://localhost:5000/comment/${id}`)
      .then((result) => {
        dispatch(setComments(result.data.result));
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
        console.log(result);
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
          console.log(rating);
          console.log(result);
        })
        .catch((error) => {
          console.log("error");
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
  }, [clicked]);
  return (
    <div className="page">
      {meals.length
        ? meals.map((element) => {
            return (
              <div className="meal_comment">
                <div className="meal_page">
                  <img className="meal_img" src={element.image} />
                  <div className="name_rate_cart">
                    <div className="meal_name_rating">
                      <h1 className="meal_name">{element.meal_name}</h1>

                      <div className="rating">
                        <Rating onClick={handleRating} ratingValue={ratings} />
                        <p className="avg_rating">
                          {" "}
                          {ratingAvg ? ratingAvg / 20 : "not Rated"}
                        </p>
                      </div>
                    </div>

                    <div className="cart_div">
                      {/* <button className="add_minus_butt" onClick={counterMinus}>
                        -
                      </button> */}
                      <input
                        type={"number"}
                        min={1}
                        className="count_order"
                        placeholder="العدد المطلوب"
                        //   onChange={(e)=>{if(e.target.value.includes('-')){
                        //     Math.abs(e,target.value)
                        //   }else{handleChange}
                        // }}
                      />

                      {/* <button className="add_minus_butt" onClick={counterPluse}>
                        +
                      </button> */}
                      <button className="add_minus_butt" onClick={()=>{
                        
                      }}>
                        إضافة إلى سلة الطعام
                      </button>

                      {/* <label className="total"> {total? "مجموع طلبك =" quantity*mealPrice:"لا يوجد أي طعام في القائمة"}</label> */}
                    </div>
                  </div>
                </div>
                <div className="comment">
                  <textarea
                    className="count_input"
                    placeholder="إضافة تعليق..."
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                  />

                  <button
                    className="add_minus_butt"
                    onClick={() => {
                      addComment(element.id);
                      setClicked(!clicked);
                    }}
                  >
                    إضافة تعليق
                  </button>
                </div>
              </div>
            );
          })
        : ""}
      <div className="scroll_div">
        <div className="comments_array">
          {allComments.length
            ? allComments.map((element) => {
                return (
                  <div>
                    <p className="commenter_name">:{element.firstName}&nbsp;{element.lastName}
                    </p>&nbsp;<p className="comment_in_scroll">{element.comment}</p>
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    </div>
  );
};

export default MealPage;
