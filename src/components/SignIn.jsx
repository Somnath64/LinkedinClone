import { useState } from "react";
import "../Sass/SignIn.scss";
import { toast } from "react-toastify";
import LoginApi from "../api/AuthAPI";
import { useNavigate } from "react-router-dom";
import { linkedinLogo } from "../assets";
import Footer from "./Footer";

const SignIn = () => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({});
  const [showBtn, setShowBtn] = useState("password");

  const showPasswordHandler = () => {
    const text = showBtn == "text" ? "password" : "text";
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
    <div className="signin-wrapper">
      <header className="signin-nav">
        <span
          onClick={() => {
            navigate("/");
          }}
        >
          <img src={linkedinLogo} alt="" className="signin-logo" />
        </span>
      </header>
      <main className="signin-main-container">
        <div className="signin-card">
          <div>
            <h1 className="signin-header_content-heading">Sign in</h1>
            <p className="signin-header_content-subheading">
              Stay updated on your professional world
            </p>
            <input
              type="text"
              autoFocus
              required
              placeholder="Email"
              className="signin-form_input"
              onChange={(event) =>
                setCredentials({
                  ...credentials,
                  email: event.target.value,
                })
              }
            />
            <div className="signin-show-button">
              <input
                type={showBtn}
                required
                placeholder="Password"
                className="signin-form_input"
                onChange={(event) =>
                  setCredentials({
                    ...credentials,
                    password: event.target.value,
                  })
                }
              />
              <span
                className="signin-form_password-btn"
                onClick={showPasswordHandler}
              >
                Show
              </span>
            </div>
            {/* <div className="flex signin-form__footer flex-col"> */}
            <a href="" className="signin-form__forget-password">
              Forgot password?
            </a>
            <button onClick={login} className="signin-form_btn btn-md">
              Sign in
            </button>
          </div>
        </div>
        <div className="join-now">
          New to LinkedIn?
          <span
            onClick={() => {
              navigate("/signup");
            }}
            className="join-now_link"
          >
            {" "}
            Join Now
          </span>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignIn;
