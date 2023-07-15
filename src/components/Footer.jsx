import linkedinLogo from "../assets/linkedinLogo.png";
import "../Sass/Footer.scss";

const Footer = () => {
  return (
    <footer className="footer-container">
      <ul className="li-footer__list flex">
        <li className="li-footer__item flex">
          {/* <span className="li-footer-text">LinkedIn</span> */}
          <img src={linkedinLogo} alt="" className="li-footer-logo" />
          <span className="li-footer__text flex">&copy; 2023</span>
        </li>
        <li className="li-footer__item">
          <a href="" className="flex li-footer__link">
            About
          </a>
        </li>
        <li className="li-footer__item">
          <a href="" className="flex li-footer__link">
            Accessibility
          </a>
        </li>
        <li className="li-footer__item">
          <a href="" className="flex li-footer__link">
            User Agreement
          </a>
        </li>
        <li className="li-footer__item">
          <a href="" className="flex li-footer__link">
            Privacy Policy
          </a>
        </li>
        <li className="li-footer__item">
          <a href="" className="flex li-footer__link">
            Cookie Policy
          </a>
        </li>
        <li className="li-footer__item">
          <a href="" className="flex li-footer__link">
            Copyright Policy
          </a>
        </li>
        <li className="li-footer__item">
          <a href="" className="flex li-footer__link">
            Brand Policy
          </a>
        </li>
        <li className="li-footer__item">
          <a href="" className="flex li-footer__link">
            Guest Controls
          </a>
        </li>
        <li className="li-footer__item">
          <a href="" className="flex li-footer__link">
            Community Guidelines
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
