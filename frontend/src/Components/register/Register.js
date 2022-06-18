import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Register = () => {
  const [firstName, setFirstName] = useState(``);
  const [lastName, setLastName] = useState(``);
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);
  const [city, setCity] = useState(``);
  const [message, setMessage] = useState(``);
  const [messageEmail, setMessageEmail] = useState("");
  const [messagefName, setMessagefName] = useState("");
  const [messagelName, setMessagelName] = useState("");
  const [messageCity, setMessageCity] = useState("");
  const [message2, setMessage2] = useState(``);
  const [messagePass, setMessagePass] = useState(``);

  const [status, setStatus] = useState(``);

  const { isLoggedIn } = useSelector((state) => {
    return {
      isLoggedIn: state.auth.isLoggedIn,
    };
  });
  //this fuction to add new user
  const addNewUser = () => {
    try {
      const res = axios.post(
        `https://abedhamadarestaurant.herokuapp.com/register`,
        {
          firstName,
          lastName,
          city,
          email,
          password,
          role_id: 2,
        }
      );
      if (
        res &&
        firstName.replaceAll(" ", "").length != 0 &&
        lastName.replaceAll(" ", "").length != 0 &&
        city.replaceAll(" ", "").length != 0 &&
        email.includes("@", ".com") &&
        password.length > 4
      ) {
        setStatus(true);
        setMessage("The user has been created successfully");
      } else throw Error;
    } catch (error) {
      console.log(error);
      setStatus(false);
      if (error.response && error.response.data) {
        return setMessage(error.response.data.message);
      }
      setMessage("حدث خطأ خلال التسجيل ... الرجاء إعادة المحاولة");
    }
  };

  return (
    <>
      <div className="login">
        {!isLoggedIn ? (
          <>
            <h2 className="active"> تسجيل مستخدم جديد : </h2>
            <form onSubmit={addNewUser}>
              <br />
              <input
                type="text"
                className="text"
                placeholder="الإسم الأول ..."
                onChange={(e) => {
                  if (e.target.value == " " || e.target.value.includes(" ")) {
                    return setMessagefName(
                      "  الرجاء إدخال الإسم الأول من مقطع واحد"
                    );
                  } else if (
                    e.target.value != " " &&
                    !e.target.value.includes(" ")
                  ) {
                    return setMessagefName("");
                  } else {
                    setFirstName(e.target.value);
                  }
                }}
              />
              <p className="messageP">{messagefName}</p>
              <br />

              <input
                type="text"
                className="text"
                placeholder="الإسم الأخير ..."
                onChange={(e) => {
                  if (e.target.value == " " || e.target.value.includes(" ")) {
                    return setMessagelName(
                      "  الرجاء إدخال الإسم الأخير من مقطع واحد"
                    );
                  } else if (
                    e.target.value != " " &&
                    !e.target.value.includes(" ")
                  ) {
                    return setMessagelName("");
                  } else {
                    setLastName(e.target.value);
                  }
                }}
              />
              <p className="messageP">{messagelName}</p>
              <br />
              <input
                type="text"
                className="text"
                placeholder="المدينة ..."
                onChange={(e) => {
                  if (e.target.value == " ") {
                    return setMessageCity("الرجاء إدخال إسم المدينة");
                  } else if (e.target.value != " ") {
                    return setMessageCity("");
                  } else {
                    setCity(e.target.value);
                  }
                }}
              />
              <br />
              <p className="messageP">{messageCity}</p>
              <input
                type="email"
                className="text"
                placeholder="الإيميل ..."
                onChange={(e) => {
                  if (
                    e.target.value == " " ||
                    e.target.value == "" ||
                    !e.target.value.includes("@") ||
                    !e.target.value.includes(".com")
                  ) {
                    return setMessageEmail(
                      " @ / .com  يجب أن يحتوي الإيميل على "
                    );
                  } else if (
                    e.target.value != " " &&
                    e.target.value != "" &&
                    e.target.value.includes("@") &&
                    e.target.value.includes(".com")
                  ) {
                    setMessageEmail("");
                  } else {
                    setEmail(e.target.value);
                  }
                }}
              />
              <p className="messageP">{messageEmail}</p>
              <br />
              <input
                type="password"
                className="text"
                placeholder="كلمة السر ..."
                onChange={(e) => {
                  if (
                    e.target.value.length < 4 ||
                    e.target.value == " " ||
                    e.target.value == ""
                  ) {
                    return setMessagePass(
                      " الرجاء إدخال كلمة سر صحيحة لا تقل عن 4 أحرف "
                    );
                  } else if (
                    e.target.value.length > 4 &&
                    e.target.value != " " &&
                    e.target.value != ""
                  ) {
                    setMessage("");
                  } else {
                    setPassword(e.target.value);
                  }
                }}
              />
              <p className="messageP">{messagePass}</p>
              <br />

              <button className="login_button">تسجيل</button>
              <br />
            </form>
            {status
              ? message && <div className="SuccessMessage">{message}</div>
              : message && <div className="ErrorMessage">{message}</div>}
          </>
        ) : (
          <p>من فضلك ... قم بتسجيل الخروج أولا ..</p>
        )}
      </div>
    </>
  );
};

export default Register;
