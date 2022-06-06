import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch,useSelector } from "react-redux";
import { setPaginatedByCategory } from "../../redux/reducers/meals";
import { useParams } from "react-router-dom";

const GetMealByCategory = ()=>{
    const {name} =useParams()
    return(
        <div>cat name :{name}</div>
    )
}
export default GetMealByCategory