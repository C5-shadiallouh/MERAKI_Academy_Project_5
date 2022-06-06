import axios from `axios`
import {useState,useEffect} from `react`
import { setMeals } from "../../redux/reducers/meals"
import {useSelector,useDispatch} from `react-redux`

const AllMenue=(req,res)=>{
    const [meal,setMeal]=useState(``)
    const [message,setMessage]=useState(``)
    const dispatch=useDispatch()
    const{meals}=useSelector((state)=>{
        return {
            meals:state.meals.meals

        }
    })
  
    useEffect(() => {
        axios.get("http://localhost:5000/meals/paginated").then((result)=>{
            dispatch(setMeals(result.data.products))
        }).catch((err)=>{
            setMessage(err.response.data.message)
        })
    }, []);
    
    return (
        <div>
            {meals&&meals.map((meal,index)=>{
                return (
                    <>
                    <li key={index}>{meal.meal_name}</li>
                    <li key={index}>{meal.meal_price}</li>
                    <image src={meal.image}/>
                    <button>Add to Cart</button>
                    {message}

                    </>
                )
            })}

        </div>
    )
}

export default AllMenue