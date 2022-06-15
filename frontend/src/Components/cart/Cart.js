import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
  const [show, setShow] = useState("");
  const [el_id, setEl_id] = useState("");
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
    total();
  }, [totalQuantity]);
  return (
    <div>
      <h3>سلة التسوق</h3>
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
                          
                          if (e.target.value.includes("-")|| e.target.value==0) {
                            console.log("dsdsds");
                            setEl_id(element.id);
                          return setShow("لا يمكنك ادخال قيمة سالبة");
                          }
                          else{
                            setShow("")
                          }

                          dispatch(setQuantity(e.target.value));

                          updateQuantity(
                            element.id,
                            e.target.value,
                            e.target.value * element.meal_price
                          );
                        }}
                      />
                      {element.id == el_id ? <p> {show} </p> : ""}
                    </td>
                    <td>{element.meal_price}</td>

                    <td>
                      {(element.meal_price * element.quantity).toFixed(2)
                      }
                    </td>
                    
                  </tr>
                  
                );
              })}
            </tbody>
           
          </table>
          
          {totalAmount ? (
            <div>
              <h1>المبلغ الاجمالي: {totalAmount} دينار</h1>
              <button>الدفع</button>
            </div>
          ) : (
            ""
          )}
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
