import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  setCart,
  setQuantity
} from "../../redux/reducers/cart/cart";
import './style.css'

const Cart = () => {
  const dispatch = useDispatch();
  const { carts, totalAmount, totalQuantity, isLoggedIn, token } = useSelector(
    (state) => {
      return {
        carts: state.carts.carts,
        totalAmount: state.carts.totalAmount,
        totalQuantity: state.carts.totalQuantity,
        isLoggedIn: state.auth.isLoggedIn,
        token: state.auth.token,
      };
    }
  );
  const updateQuantity=(id,quantity,total)=>{
  axios.put(`http://localhost:5000/cart/update/${id}`,{quantity:quantity,total:total},{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((result)=>{dispatch(setQuantity(quantity))})
  .catch((err)=>{console.log(err);})
  }
 
  

  
  

  useEffect(() => {
    axios
      .get(`http://localhost:5000/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        if (result.data.result) dispatch(setCart(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  },[totalAmount]);
  return (
    
    <div>
      <h3>سلة التسوق</h3>
      {carts.length && isLoggedIn ? (
        
        <div>
          <table>
  <tr>
    <th>صورة الصنف</th>
    <th>الصنف</th>
    <th>الكمية</th>
    <th>السعر الافرادي للصنف</th>
    <th> المجموع</th>
  </tr>
  {carts.map((element)=>{
    return(
      
      <tr>
       <td><img src={element.image} width="100px"/></td>
       <td>{element.meal_name}</td>
       <td><input type={"number"} min={1}  defaultValue={1} onChange={(e)=>{

        updateQuantity(element.id,e.target.value,(e.target.value*element.meal_price))
        console.log(totalQuantity);
        }
       }/>
       </td>
       <td>{element.meal_price}</td> 
       
       <td>{element.meal_price*totalQuantity}</td> 
      </tr>
    )
  })}
</table>
          </div>
      ) : (
        <div>
          <p>السلة فارغة </p>
          <Link to={"/"}>
            <p>ابدأ التسوق من هنا</p>
          </Link>
        </div>
      )}
    </div>
  );
};
export default Cart;
