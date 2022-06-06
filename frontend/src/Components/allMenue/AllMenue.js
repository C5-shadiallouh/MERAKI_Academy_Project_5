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
  
    
    return (
        <div>

        </div>
    )
}

export default AllMenue