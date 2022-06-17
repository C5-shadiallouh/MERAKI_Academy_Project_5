import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCart, setQuantity, setTotal } from "../../redux/reducers/cart/cart";
import "./style.css";

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
  const navigate =useNavigate()
  const [show, setShow] = useState("");
  const [el_id, setEl_id] = useState("");
  const [state, setState] = useState(false);
  const total = () => {
    axios
      .get(`http://localhost:5000/cart/total`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        dispatch(setTotal(result.data.result[0].total));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateQuantity = (id, quantity, total) => {
    axios
      .put(
        `http://localhost:5000/cart/update/${id}`,
        { quantity: quantity, total: total },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        dispatch(setQuantity(quantity));
        
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const removeFromCart = (id, quantity, total) => {
    axios
      .delete(
        `http://localhost:5000/cart/delete/${id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        dispatch(setTotal(total));
        
      })
      .catch((err) => {
        dispatch(setCart([]));
      });
  };
  const getCart = () => {
    axios
      .get(`http://localhost:5000/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        if(result.data.success)
        dispatch(setCart(result.data.result));
        else if (result.data.message == "there is not any meal"){
          dispatch(setCart([]));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCart();
    total();
  }, [state, totalQuantity, totalAmount]);
  return (
    <div>
      <h3 className="cartTilte">سلة التسوق</h3>
      {carts.length && isLoggedIn ? (
        <div>
          <table>
            <tbody>
              <tr>
                <th>صورة الصنف</th>
                <th>الصنف</th>
                <th>الكمية</th>
                <th>السعر الافرادي للصنف</th>
                <th> المجموع</th>
              </tr>
              {carts.map((element) => {
                return (
                  <tr key={element.id}>
                    <td>
                      <img src={element.image} width="100px" />
                    </td>
                    <td>{element.meal_name}</td>
                    <td>
                      <input
                        className="quantity_input"
                        type={"number"}
                        min={1}
                        defaultValue={element.quantity}
                        onChange={(e) => {
                          if (
                            e.target.value.includes("-") ||
                            e.target.value == "0"
                          ) {
                            setEl_id(element.id);
                            return setShow("لا يمكنك ادخال قيمة سالبة");
                          } else {
                            setShow("");
                          }

                          dispatch(setQuantity(e.target.value));

                          updateQuantity(
                            element.id,
                            e.target.value,
                            e.target.value * element.meal_price
                          );
                        }}
                      />
                      <button className="addToCart inCart"
                        onClick={() => {
                          removeFromCart(element.id);
                        }}
                      >
                        حذف من سلة المشتريات
                      </button>
                      {element.id == el_id ? <p> {show} </p> : ""}
                    </td>
                    <td>{element.meal_price}</td>

                    <td>
                      {(element.meal_price * element.quantity).toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {totalAmount ? (
            <div className="totalPay">
              <h1>المبلغ الاجمالي: {totalAmount} دينار</h1>
              <button className="addToCart pay" onClick={()=>{
                navigate("/pay")
              }}>الدفع</button>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="empty">
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
