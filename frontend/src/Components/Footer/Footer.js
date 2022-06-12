import { FaFacebook } from "@react-icons/all-files/fa/FaFacebook";
import { FaTwitter } from "@react-icons/all-files/fa/FaTwitter";
import { FaInstagram } from "@react-icons/all-files/fa/FaInstagram";
import { FaVk } from "@react-icons/all-files/fa/FaVk"
import { FaHome } from "@react-icons/all-files/fa/FaHome"




import "./style.css";
const Footer = () => {
  return (
    <footer className="footer-content">
      <h3> عبد حمادة</h3>
      <p>مؤسس مطاعم فلسطين من 1965</p>

      <ul className="social_icon">
        <li>
          <a href="#">
            <FaFacebook />
          </a>
        </li>
        <li>
          <a href="#">
            <FaTwitter />
          </a>
        </li>
        <li>
          <a href="#">
            <FaInstagram />
          </a>
        </li>
        <li>
          <a href="#">
            <FaVk />
          </a>
        </li>
      </ul>

      <ul className="menu">
        <li><FaHome/>الصفحة الرئيسية</li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </footer>
  );
};
export default Footer;
