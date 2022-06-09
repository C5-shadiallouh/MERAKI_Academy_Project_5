import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setCart,RemoveFromCart, decreaseCart, addtoCart, removeAllItem } from "../../redux/reducers/cart/cart";

const Cart = () => {
  const dispatch=useDispatch()
    const { carts,totalAmount } = useSelector((state) => {
    return {
      carts: state.carts.carts,
      totalAmount: state.carts.totalAmount,
    };
  });

  const handleRemoveFromCart=(cart)=>{

    axios.delete(`htt:localhost:5000/cart/delete/${cart.id}`).then(()=>{
      dispatch(RemoveFromCart(cart))
    }).catch((err)=>{
      console.log(err)
    })
  }


  const handleDecrese=(cart)=>{
    axios.put(`http://localhost:5000/cart/update/${cart.id}`,{
      quantity:cart.quantity
    }).then(()=>{
      dispatch(decreaseCart(cart))
    }).catch((err)=>{
      console.log(err)
    })
  }


const handleIncrease=(cart)=>{
  axios.put(`http://localhost:5000/cart/update/${cart.id}`,{
      quantity:cart.quantity
    }).then(()=>{
      dispatch(addtoCart(cart))
    }).catch((err)=>{
      console.log(err)
    })
  }


const handleCleareCart=()=>{
  axios.delete(`http://localhost:5000/removeAll`).then(()=>{
    dispatch(removeAllItem())
  }).catch((err)=>{
    console.log(err)
  })
}

  useEffect=(()=>{
      axios.get(`http://localhost:5000/cart`)
      .then((result)=>{
          dispatch(setCart(result.data.result))
      })
  })
  return (
    <div>

      <h3>سلة التسوق</h3>
      {!carts.length ? (
        <div>
          <p>السلة فارغة </p>
          <Link to={"/"}>
            <p>ابدأ التسوق من هنا</p>
          </Link>
        </div>
      ) : (
        <div>
          <div>
            <h3>الصنف</h3>
            <h3>السعر</h3>
            <h3>الكمية</h3>
            <h3>السعر الاجمالي</h3>
            <div>
              {carts.length &&
                carts.map((cart) => {
                  return (
                    <div key={cart.id}>
                      <div>
                        <img src={cart.image} alt="" />
                        <div>
                          <h3>{cart.meal_name}</h3>
                          <button onClick={()=>handleRemoveFromCart(cart.id)}>ازالة</button>
                        </div>
                      </div>
                      <h3>{cart.price}د.أ</h3>
                      <div>
                        <button onClick={()=>{handleDecrese(cart)}}>-</button>
                        <div>{cart.quantity}</div>
                        <button onClick={()=>{handleIncrease(cart)}}>+</button>
                      </div>
                      <div>{cart.price * cart.quantity}</div>
                    </div>
                  );
                })}
            </div>
            <div>
              <button onClick={()=>{handleCleareCart()}}>افرغ السلة</button>
              <div>
                <span>المجموع</span>
                <span>{totalAmount}</span>
                <p>السعر شامل الضريبة والشحن </p>
                <button>اطلب الان </button>
                <Link to={"/"}>
                  <p>استمر بالتسوق </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Cart;
