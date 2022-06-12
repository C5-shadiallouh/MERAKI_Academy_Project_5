import axios from "axios";
import {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateMeal } from "../../../redux/reducers/meals";

const Edit = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const [meal_name, setName] = useState();
  const [meal_price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  const handleEditMeal = () => {
    try {
      const res = axios.put(`http://localhost:5000/meals/update/${id}`, {
        meal_name,
        meal_price,
        image,
      });
      if (res) {
        setStatus(true);
        setMessage("تم تعديل الوجبة   ");
        dispatch(
          updateMeal({
            meal_name,
            meal_price,
            image,
          })
        );
      } else throw Error;
    } catch (error) {
      setStatus(false);
      if (error.response && error.response.data) {
        return setMessage(error.response.data.message);
      }
      setMessage("حدث خطأ ..الرجاء المحاولة مرة اخرى");
    }
  }; 

  return (
    <div>
      <form onSubmit={handleEditMeal}>
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

export default Edit;
