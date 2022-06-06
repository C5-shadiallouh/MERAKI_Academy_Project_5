import axios from "axios"
import {useState,useEffect} from "react"
import { setMeals } from "../../redux/reducers/meals/index"
import {useSelector,useDispatch} from "react-redux"

const AllMenue=(req,res)=>{
/*     const [meal,setMeal]=useState(``)
 */    const [message,setMessage]=useState(``)
    const dispatch=useDispatch()
     const{meals}=useSelector((state)=>{
        return {
            meals:state.meals.meals

        }
    })
   
    useEffect(() => {
       
        axios.get("http://localhost:5000/meals/paginated?p=1").then((result)=>{
            dispatch(setMeals(result.data.products))
        }).catch((err)=>{
             setMessage(err.sqlMessage)
        })
    }, []);

    
    return (
        <div key={"cc"}>
            {meals.length&&meals.map((meal,index)=>{
               return (
                    <>
                    <p key={meal.meal_name}>{meal.meal_name}</p>
                    <p key={meal.meal_price}>{meal.meal_price}</p>
                    <img src={meal.image}  alt=""  key={meal.id}/>
                    <button>Add to Cart</button>
                    {message}

                    </>
                )
            })}

        </div>
    )
}

export default AllMenue