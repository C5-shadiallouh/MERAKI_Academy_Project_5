import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch,useSelector } from "react-redux";
import { setMeals } from "../../redux/reducers/meals";
import { useParams } from "react-router-dom";

const GetMealByCategory = ()=>{
    const {name} =useParams()
    const dispatch =  useDispatch()
    const {meals}=useSelector((state)=>{
        return{
            meals:state.meals.meals
        }
       
    })
    useEffect(()=>{
        axios.get(`http://localhost:5000/meals/pageInCategory?p=1&name=${name}`).then((result)=>{
            dispatch(setMeals(result.data.products))
        })
        .catch((err)=>{
            console.log(err);
        })
    },[meals])
    return(
        <div>
            {meals.length?
            meals.map((element,index)=>{
                return(
                    <div>
                        <p>{element.meal_name}</p>
                        <img src={element.image}/>
                    </div>
                )
            })
            :""}
        </div>
    )
}
export default GetMealByCategory