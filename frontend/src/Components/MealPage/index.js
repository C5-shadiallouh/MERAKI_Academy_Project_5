import React, { useEffect, useState } from "react";
import { setMeals } from "../../redux/reducers/meals";
import {addNewComment} from "../../redux/reducers/comment"
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";

const MealPage = () => {
  const [comment, setComment] = useState("")
  const { id } = useParams();
  const dispatch = useDispatch();
  const { meals,comments } = useSelector((state) => {
    return {
      meals: state.meals.meals,
      comments:state.comments.comment
    };
  });

  const addComment = async(id) => {
    const res =await axios.post(`http://localhost:5000/comment/${id}`,{
      comment,
    },{
      headers: {
        Authorization: `Bearer ${token}`
        },
    })
    .then((result)=>{
dispatch(addNewComment(comment))
    })
    .catch((error)=>{
      console.log(error);
    })
  }

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
      {meals.length ?
        meals.map((element) => {
        return(<div>
        <img src={element.image}/>
        <h1>{element.meal_name}</h1>
        <div >
              <textarea
                placeholder="comment..."
                onChange={(e) => {
                  setComment(e.target.value); 
                }}
              />
              <button
                onClick= {addComment}
              >
                Add comment
              </button>
              </div>
        </div>);
        }):""
        }
        {console.log(meals)}
    </div>
  );
};






export default MealPage

