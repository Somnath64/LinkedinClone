import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { SignUpAPI } from "../api/AuthAPI";
import { postUserData } from "../api/FirestoreAPI";
import "../Sass/SignUpComponent.scss";
import { linkedinLogo } from "../assets";
import Footer from "./Footer";
import Divider from "./common/Divider/index";

const SignUp = () => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({});
  const [showBtn, setShowBtn] = useState("password");

  const showPasswordHandler = () => {
    const text = showBtn == "text" ? "password" : "text";
    setShowBtn(text);
  };

  const register = async () => {
    try {
      let res = await SignUpAPI(credentials.email, credentials.password);
      console.log(res);
      postUserData({
        name: credentials.name,
        email: credentials.email,
        imageLink:
          "https://firebasestorage.googleapis.com/v0/b/linkedin-clone-f0fd6.appspot.com/o/defaultProfileImage%2FprofileImage.webp?alt=media&token=ae44c3e6-d31c-48d2-b3fb-d683244527fc",
      });
      toast.success("Account has been created successfully!");
      localStorage.setItem("userEmail", res.user.email);
    } catch (err) {
      console.log(err.message);
      console.log(err.code);

      toast.error("Cannot created your Account!");
      toast.error(err.code);
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-container">
        <header>
          <div className="signup-logo-container">
            <span
              onClick={() => {
                navigate("/");
              }}
            >
              <img
                src={linkedinLogo}
                alt="linkedin logo"
                className="signup-img"
              />
            </span>
          </div>
          <h1 className="signup-subtitle">
            Make the most of your professional life
          </h1>
        </header>
        <div className="join-form-wrapper">
          <section className="join-form_body">
            <div className="join-form_input">
              <label className="input__label">Name</label>
              <input
                className="input__input"
                type="text"
                required
                autoFocus
                autoComplete="Name"
                onChange={(event) =>
                  setCredentials({
                    ...credentials,
                    name: event.target.value,
                  })
                }
              />
              <label className="input__label">Email Id</label>
              <input
                className="input__input"
                type="email"
                required
                autoComplete="Email"
                onChange={(event) =>
                  setCredentials({
                    ...credentials,
                    email: event.target.value,
                  })
                }
              />
              <label className="input__label">
                Password (6+ more characters)
              </label>
              <div className="join-form_show-password">
                <input
                  type={showBtn}
                  className="input__input"
                  required
                  autoComplete="password"
                  onChange={(event) =>
                    setCredentials({
                      ...credentials,
                      password: event.target.value,
                    })
                  }
                />
                <button
                  className="join-form_show-btn"
                  onClick={showPasswordHandler}
                >
                  Show
                </button>
              </div>
              <span className="join-form_body-agreement">
                By clicking Agree & Join, you agree to the
                <span className="agreement-color">
                  {" "}
                  LinkedIn User Agreement, Privacy Policy,
                </span>{" "}
                and <span className="agreement-color">Cookie Policy.</span>
              </span>
              <button
                type="submit"
                onClick={register}
                className="join-form__submit-btn"
              >
                Agree & Join
              </button>
            </div>
            <Divider />
            <p className="main-signin-container">
              Already on LinkedIn?
              <span
                className="main-signin"
                onClick={() => {
                  navigate("/login");
                }}
              >
                {" "}
                Sign in
              </span>
            </p>
          </section>
          <p className="page-help_link-text">
            Looking to create a page for a business?
            <a href=""> Get help</a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
