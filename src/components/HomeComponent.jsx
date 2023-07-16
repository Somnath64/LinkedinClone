import "../Sass/HomeComponent.scss";
import { useState } from "react";
import LoginApi from "../api/AuthAPI";
import { toast } from "react-toastify";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import {
  linkedinLogo,
  articleLogo,
  peopleLogo,
  learningLogo,
  jobsLogo,
  heroImage,
} from "../assets/index";
import Divider from "./common/Divider/index";

const HomeComponent = () => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({});
  const [showBtn, setShowBtn] = useState("password");

  const showPasswordHandler = () => {
    const text = showBtn == "text" ? "password" : "text";
    console.log(text);
    setShowBtn(text);
  };

  const login = async () => {
    try {
      await LoginApi(credentials.email, credentials.password);
      toast.success("Signed In to LinkedIn");
      navigate("/home");
    } catch (err) {
      toast.error("Please check your credentials!");
    }
  };

  return (
    <div className="home-wrapper">
      <nav className="nav">
        <span
          onClick={() => {
            navigate("/");
          }}
          className="logo"
        >
          <img src={linkedinLogo} alt="svg" className="logo-img" />
        </span>
        <div className="navleft ">
          <ul className="navlist">
            <li className="nav-li">
              <a href="/" className="navlink">
                <img src={articleLogo} alt="img" className="li-img" />
                <span>Article</span>
              </a>
            </li>

            <li className="nav-li">
              <a href="/" className="navlink">
                <img src={peopleLogo} alt="img" className="li-img" />
                <span>People</span>
              </a>
            </li>
            <li className="nav-li">
              <a href="/" className="navlink">
                <img src={learningLogo} alt="img" className="li-img" />
                <span>Learning</span>
              </a>
            </li>
            <li className="nav-li">
              <a href="/" className="navlink">
                <img src={jobsLogo} alt="img" className="li-img" />
                <span>Job</span>
              </a>
            </li>
            <span className="hline"></span>
          </ul>
          <div className="nav_cta">
            <button
              onClick={() => {
                navigate("/signup");
              }}
              className="sign-btn btn_join"
            >
              Join now
            </button>
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="sign-btn btn_signin"
            >
              Sign in
            </button>
          </div>
        </div>
      </nav>

      <main className="main_container">
        <section className="section">
          <div className="hero_content">
            <h1 className="hero_heading">
              Welcome to your professional community
            </h1>
            <div className="hero_cta-form">
              <label className="input-label"> Email Id</label>
              <input
                type="text"
                className="input-text"
                required
                autoFocus
                autoComplete="username"
                onChange={(event) =>
                  setCredentials({
                    ...credentials,
                    email: event.target.value,
                  })
                }
              />

              <label className="input-label">Password</label>
              <div className="input-wrapper">
                <input
                  type={showBtn}
                  required
                  autoComplete="current-password"
                  className="input-text"
                  onChange={(event) =>
                    setCredentials({
                      ...credentials,
                      password: event.target.value,
                    })
                  }
                />
                <button
                  className="input-show-btn"
                  type="button"
                  onClick={showPasswordHandler}
                >
                  Show
                </button>
              </div>
              <button onClick={login} className="signin-form_btn btn-md">
                Sign in
              </button>
              <Divider />

              <span
                onClick={() => {
                  navigate("/signup");
                }}
                className="signin-join-cta btn-md"
              >
                New to LinkedIn? Join now
              </span>
            </div>
          </div>
          <img
            src={heroImage}
            alt="Welcome to your professional community"
            className="welcome-img"
          />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomeComponent;
