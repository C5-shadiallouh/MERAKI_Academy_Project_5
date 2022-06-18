import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addNewMeal } from "../../../redux/reducers/meals";

const AddMeal = () => {
  const dispatch = useDispatch();
  const [meal_name, setName] = useState("");
  const [meal_price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  const handleAddMeale = () => {
    try {
      const res = axios.post(
        `https://abedhamadarests.herokuapp.com/meals/addmeal`,
        {
          meal_name,
          meal_price,
          image,
          category,
        }
      );
      if (res) {
        setStatus(true);
        setMessage("تم اضافة وجبة جديدة الى القائمة");
        dispatch(
          addNewMeal({
            meal_name,
            meal_price,
            image,
            category,
          })
        );
      } else throw Error;
    } catch (error) {
      setStatus(false);
      if (error.response && error.response.data) {
        return setMessage(error.response.data.message);
      }
      setMessage("حدث خطأ والرجاء المحاولة مرة اخرى");
    }
  };

  return (
    <div>
      <form onSubmit={handleAddMeale}>
        <input
          placeholder="name"
          type={"text"}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          placeholder="price"
          type={"text"}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />

        <input
          placeholder="category"
          type={"text"}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        />

        <input
          placeholder="image"
          type={"file"}
          accept="image/png, image/jpeg, image/jpg"
          name="image"
          onChange={(e) => {
            setImage(e.target.value);
          }}
        />

        <button>submit</button>
      </form>
      {status
        ? message && <div className="SuccessMessage">{message}</div>
        : message && <div className="ErrorMessage">{message}</div>}
    </div>
  );
};

export default AddMeal;
