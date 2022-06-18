import React, { useEffect, useState } from "react";
import { setMeals } from "../../redux/reducers/meals";
import { setComments, addNewComment } from "../../redux/reducers/comment";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
//npm install react-rating-stars-component --save
import { Rating } from "react-simple-star-rating";
import { setRatings, getRating } from "../../redux/reducers/rating/rating";
import "./style.css";
import { SettingsPowerRounded } from "@material-ui/icons";

const MealPage = () => {
  const [clicked, setClicked] = useState(false);
  const [meal, setMeal] = useState([]);
  const [message, setMessage] = useState(``);
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const [ableCommnet, setAbleCommnet] = useState(false);

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
  const [err, SetErr] = useState("");
  const [rating, setRating] = useState(ratings); // initial rating value
  const [avg, setAvg] = useState(0);
  const handleRating = (rate) => {
    setRating(rate); // other logic
    if (rate > 0) {
      axios
        .post(
          `https://abedhamadarestaurant.herokuapp.com/meals/rating/${id}`,
          { rate: rate },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((result) => {
          console.log(rate);
          console.log(result);
        })
        .catch((error) => {
          console.log("error");
        });
    }
  };
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
        console.log(result);
        setMessage("تمت الإضافة إلى سلة الطعام بنجاح");
      })
      .catch((err) => {
        console.log(err);
        setMessage("حصل خطأ أثناء الإضافة ... الرجاء إعادة المحاولة");
      });
  };

  const getAllComments = async (id) => {
    await axios
      .get(`https://abedhamadarestaurant.herokuapp.com/comment/${id}`)
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
        `https://abedhamadarestaurant.herokuapp.com/comment/${id}`,
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
        setAbleCommnet(true);
      });
  };

  useEffect(() => {
    axios
      .get(`https://abedhamadarestaurant.herokuapp.com/meals/id/${id}`)
      .then((result) => {
        dispatch(setMeals(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });

    getAllComments(id);

    axios
      .get(`https://abedhamadarestaurant.herokuapp.com/meals/rating/${id}`)
      .then((result) => {
        console.log(result.data.result[0].AverageRate);
        if (result.data.result[0].AverageRate != null) {
          dispatch(getRating(result.data.result[0].AverageRate));
        }
      });
    axios
      .get(
        `https://abedhamadarestaurant.herokuapp.com/meals/rating/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        console.log(result.data[0].rate);
        if (result.data.length) {
          dispatch(setRatings(Number(result.data[0].rate)));
        }
        console.log("RATTTING", ratings);
      })
      .catch((err) => SetErr("Login to add rating"));
  }, [clicked, rating, ratingAvg, ratings]);
  return (
    <div className="page">
      {meals.length
        ? meals.map((element) => {
            return (
              <div className="meal_comment">
                {/* <div className="meal_page"> */}
                <div className="img">
                  <img className="meal_img" src={element.image} />
                </div>
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
                    <p style={{ color: "red", textAlign: "center" }}>{err}</p>

                    <div className="cart_div">
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
                      <button
                        disabled={{ ableCommnet }}
                        className="add_minus_butt"
                        onClick={() => {
                          dispatch(addToCart(meal.id, 1, meal.meal_price));
                        }}
                      >
                        إضافة إلى سلة الطعام
                      </button>
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
                      disabled={{ ableCommnet }}
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
              </div>
            );
          })
        : ""}
      <div className="scroll_div">
        <div className="comments_array">
          {allComments.length
            ? allComments.map((element) => {
                return (
                  <div className="comment_commenter">
                    <p className="commenter_name">
                      {element.firstName}&nbsp;{element.lastName}:
                    </p>
                    &nbsp;<p className="comment_in_scroll">{element.comment}</p>
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
