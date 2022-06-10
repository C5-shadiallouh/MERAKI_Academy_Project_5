import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  setCart,
  RemoveFromCart,
  decreaseCart,
  addtoCart,
  removeAllItem,
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
const [quantity,setQuantity]=useState(1)
  const handleRemoveFromCart = (cart) => {
    axios
      .delete(`htt:localhost:5000/cart/delete/${cart.id}`)
      .then(() => {
        dispatch(RemoveFromCart(cart));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDecrese = (cart) => {
    axios
      .put(`http://localhost:5000/cart/update/${cart.id}`, {
        quantity: cart.quantity,
      })
      .then(() => {
        dispatch(decreaseCart(cart));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleIncrease = (cart) => {
    axios
      .put(`http://localhost:5000/cart/update/${cart.id}`, {
        quantity: cart.quantity,
      })
      .then(() => {
        dispatch(addtoCart(cart));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCleareCart = () => {
    axios
      .delete(`http://localhost:5000/removeAll`)
      .then(() => {
        dispatch(removeAllItem());
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const total=(price)=>{
    
  dispatch(totalAmount(quantity*price))
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
          {console.log(carts)}
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
        {console.log(element)}
       <td><img src={element.image} width="100px"/></td>
       <td>{element.meal_name}</td>
       <td><input type={"number"} min={1}  defaultValue={1} onChange={(e)=>{
         setQuantity(e.target.value)}
       }/>
       <button onClick={()=>{handleIncrease(element)
       
       total(element.meal_price) 
       console.log(totalAmount)}
      }>update</button></td>
       <td>{element.meal_price}</td> 
       
       <td>{totalAmount}</td> 
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
