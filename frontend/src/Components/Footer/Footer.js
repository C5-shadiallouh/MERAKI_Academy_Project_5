import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaVk } from "react-icons/fa";

import "./style.css";

const Footer = () => {
  return (
    <div class="main-footer">
      {localStorage.getItem("isAdmin")=="false" || localStorage.getItem("isAdmin")==null?
      <>     <div class="logoinfo" data-aos="fade-up">
        <h2>مطعم عبد حماده</h2>
        <p>مؤسس مطاعم فلسطين من عام 1956</p>

        <div class="contact-details">
          <h1>للتواصل</h1>
          <li>
            <div class="fa fa-phone"></div>
            <a href="#">+962 799999</a>
          </li>
          <li>
            <div class="fa fa-envelope"></div>
            <a href="#">abed.hamada.rest@gmail.com</a>
          </li>
        </div>
      </div>
      <div class="com" data-aos="fade-up">
        <h1>الموقع</h1>
        <ul>
          <li>
            {" "}
            <a href="#">الصفحة الرئيسية</a>
          </li>
          <li>
            {" "}
            <a href="#">من نحن</a>
          </li>
          <li>
            {" "}
            <a href="#">الفروع</a>
          </li>
          <li>
            {" "}
            <a href="#">تواصل معنا</a>
          </li>
        </ul>
      </div>
      <div class="info" data-aos="fade-up">
        <h1>وسائل التواصل الاجتماعي</h1>
        <div class="sociallogos">
          <div class="logobox">
            <a href="#">
              <FaFacebook />
            </a>
            <a href="#">
              <FaTwitter />
            </a>
            <a href="#">
              <FaInstagram />
            </a>
            <a href="#">
              <FaVk />
            </a>
          </div>
        </div>
      </div>
      <footer>&copy;All Rights Reserved Abed Hamada Restaurants</footer></>:""}
    </div>
 
  );
};
export default Footer;

