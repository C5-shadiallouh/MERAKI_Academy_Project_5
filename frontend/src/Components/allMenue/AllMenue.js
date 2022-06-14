import axios from "axios";
import { useState, useEffect } from "react";
import { setMeals } from "../../redux/reducers/meals/index";
import { useSelector, useDispatch } from "react-redux";
import { changePage } from "../../redux/reducers/page/pageReducer";
import { Link } from "react-router-dom";
import "./style.css"
const AllMenue = (req, res) => {
  const [meal, setMeal] = useState([]);
  const [message, setMessage] = useState(``);
  const dispatch = useDispatch();
  const { meals,page,token } = useSelector((state) => {
    return {
      meals: state.meals.meals,
      page:state.page.page,
      token: state.auth.token,
    };
  });

const addToCart=(meal_id,quantity,price)=>{
  axios.post("http://localhost:5000/cart/add",{meal_id:meal_id,quantity:quantity,total:quantity*price},{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((result)=>{
  console.log(result);
  })
  .catch((err)=>{console.log(err);})
  
} 

  useEffect(() => {
    axios
      .get(`http://localhost:5000/meals/paginated?p=${page}`)
      .then((result) => {
        console.group(result);
        dispatch(setMeals(result.data.products));
      })
      .catch((err) => {
        setMessage(err.sqlMessage);
      });
    axios
      .get("http://localhost:5000/meals")
      .then((result) => {
        setMeal(result.data.result);
      })
      .catch((err) => {
        setMessage(err.sqlMessage);
      });
  }, [page]);

  return (
    <div key={"cc"}>
      <h1 style={{"marginRight":"42%","marginTop":"1%"}}>جميع الأصناف</h1>
      <table>
       
      {meals.length &&
        meals.map((meal, index) => {
          return (
            <tr>
              <td><Link to={`/meals/${meal.id}`} onClick={()=>{dispatch(changePage(1))}}>
                <img src={meal.image} alt="" key={meal.id} width={"150px"}/>
              </Link></td>
              <td key={meal.meal_name}>{meal.meal_name}</td>
              <td key={meal.meal_price}>{meal.meal_price}</td>
              
              <td><button onClick={()=>{addToCart(meal.id,1,meal.meal_price)}}>اضافة الى سلة المشتريات</button></td>
              {message}
            </tr>
          );
        })}
</table>
      <div style={{ display: "none" }}>
        {meal?(meal.length = Math.ceil(meal.length / 20)):""}
      </div>
      <div class="center">
        <div class="pagination">
          <Link
            to="#"
            onClick={() => {
              if (page < meal.length) {
                dispatch(changePage(page + 1));
              }
            }}
          >
            &raquo;
          </Link>

          {meal.length
            ? meal.map((element, index) => {
                return (
                  <Link
                    to=""
                    onClick={() => {
                      dispatch(changePage(index + 1));
                    }}
                  >
                    {index + 1}
                  </Link>
                );
              })
            : ""}
          <Link
            to="#"
            onClick={() => {
              if (page > 1) {
                dispatch(changePage(page - 1));
              }
            }}
          >
            &laquo;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllMenue;
