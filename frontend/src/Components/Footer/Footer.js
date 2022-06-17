import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaVk } from "react-icons/fa";

import "./style.css";

const Footer = () => {
  return (
    <div class="main-footer">
      
           <div class="logoinfo" data-aos="fade-up">
        <h2>مطعم عبد حماده</h2>
        <p>مؤسس مطاعم فلسطين من عام 1956</p>

     
      </div>
     
      <div className="info" data-aos="fade-up">
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
      <footer>&copy;All Rights Reserved Abed Hamada Restaurants</footer>
      </div>
    
 
  );
};
export default Footer;

