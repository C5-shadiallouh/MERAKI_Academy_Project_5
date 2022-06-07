import React, { useEffect } from "react";
import { setMeals } from "../../redux/reducers/meals";
import { useDispatch,useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";

const MealPage=()=>{
    const {id}=useParams()
    const dispatch = useDispatch()
    const {meals}=useSelector((state)=>{
        return{
            meals :state.meals.meals
        }
    })
    useEffect(()=>{
        axios.get(`http://localhost:5000/meals/id/${id}`).then((result)=>{
            dispatch(setMeals(result.data.result))
        })
        .catch((err)=>{console.log(err);})
    },[])
    return(
        <div>
            
        </div>
    )

}




export default MealPage