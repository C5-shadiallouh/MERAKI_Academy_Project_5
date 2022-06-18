import "./style.css";
import { setUser } from "../../../../../redux/reducers/users/usersReducer";
import { RiProductHuntFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { setMeals } from "../../../../../redux/reducers/meals/index";
import { MdLocalPharmacy } from "react-icons/md";
import { BsFillCartCheckFill } from "react-icons/bs";
import { FaUsers, FaMoneyBillAlt } from "react-icons/fa";
import cart from "../../../../../redux/reducers/cart/cart";

export default function FeaturedInfo() {
  const dispatch = useDispatch();
  const [allCart, setAllCart] = useState("");

  const { meals, users, carts, token } = useSelector((state) => {
    return {
      meals: state.meals.meals,
      users: state.users.users,
      carts: state.carts.carts,
      token: state.auth.token,
    };
  });
  useEffect(() => {
    axios
      .get("https://abedhamadarests.herokuapp.com/meals/")
      .then((result) => {
        dispatch(setMeals(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("https://abedhamadarests.herokuapp.com/users/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        dispatch(setUser(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("https://abedhamadarests.herokuapp.com/cart/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setAllCart(result.data.result.length);
        console.log(allCart);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">عدد الوجبات الحالية</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{meals.length}وجبة</span>
          <br />
          <br />
          <span className="featuredMoneyRate">
            +{meals.length}{" "}
            <MdLocalPharmacy className="featuredIcon negative" />
          </span>
        </div>
        <MdLocalPharmacy style={{ height: "20%", width: "20%" }} />
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">عدد السلات النشطة</span>
        <div className="featuredMoneyContainer">
          <br />
          <br />
          <span className="featuredMoney">{allCart}</span>
          <br />
          <br />
          <span className="featuredMoneyRate">
            +2 <BsFillCartCheckFill className="featuredIcon negative" />
          </span>
        </div>
        <BsFillCartCheckFill style={{ height: "20%", width: "20%" }} />
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">المبيعات الاجمالية</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">0دينار اردني</span>
          <span className="featuredMoneyRate">
            +2.4 <FaMoneyBillAlt className="featuredIcon" />
          </span>
        </div>
        <FaMoneyBillAlt style={{ height: "20%", width: "20%" }} />
      </div>

      <div className="featuredItem">
        <span className="featuredTitle">عدد الاشخاص في الموقع</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{users.length}شخص</span>
          <span className="featuredMoneyRate">
            +{users.length} <FaUsers className="featuredIcon" />
          </span>
        </div>
        <span className="featuredSub">
          <FaUsers style={{ height: "20%", width: "20%" }} />
        </span>
      </div>
    </div>
  );
}
