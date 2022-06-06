import axios from `axios`
import {useState,useEffect} from `react`
import { setMeals } from "../../redux/reducers/meals"
import {useSelector,useDispatch} from `react-redux`

const AllMenue=(req,res)=>{
    const [meals,setMeals]=useState(``)
    const [message,setMessage]=useState(``)
    const dispatch=useDispatch()
  
    
    return (
        <div>

        </div>
    )
}

export default AllMenue