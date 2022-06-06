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
            dispatch(setMeals(result.data.result))
        }).catch((err)=>{
            setMessage(err.response.data.message)
        })
    }, []);
    
    return (
        <div>

        </div>
    )
}

export default AllMenue