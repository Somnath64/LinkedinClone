import "../Sass/NavBar.scss";
import linkedinLogo from "../assets/linkedinLogo.png";
import jobLogo from "../assets/asset7.png";
import peopleLogo from "../assets/asset5.png";
import learningLogo from "../assets/asset6.png";
import articleLogo from "../assets/asset4.png";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  let navigate = useNavigate();
  return (
    <nav className="nav">
      <span
        onClick={() => {
          navigate("/");
        }}
        className="logo"
      >
        <img src={linkedinLogo} alt="svg" className="img" />
      </span>
      <div className="navleft">
        <ul className="navlist">
          <li>
            <a href="" className="navlink">
              <img src={articleLogo} alt="img" className="li-img" />
              <span>Article</span>
            </a>
          </li>

          <li>
            <a href="" className="navlink">
              <img src={peopleLogo} alt="img" className="li-img" />
              <span>People</span>
            </a>
          </li>
          <li>
            <a href="" className="navlink">
              <img src={learningLogo} alt="img" className="li-img" />
              <span>Learning</span>
            </a>
          </li>
          <li>
            <a href="" className="navlink">
              <img src={jobLogo} alt="img" className="li-img" />
              <span>Job</span>
            </a>
          </li>
        </ul>
        <div className="nav_cta">
          <span className="hline"></span>
          <span
            onClick={() => {
              navigate("/signup");
            }}
            className="btn btn_join"
          >
            Join now
          </span>
          <span
            onClick={() => {
              navigate("/login");
            }}
            className="btn btn_signin"
          >
            Sign in
          </span>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
