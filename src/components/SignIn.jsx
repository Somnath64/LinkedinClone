import linkedinLogo from "../assets/linkedinLogo.png";
// import GoogleLogo from "../assets/googleLogo.png";
import { toast } from "react-toastify";
import { useState } from "react";

import "../Sass/SignIn.scss";
import Footer from "./Footer";
import LoginApi, { GoogleSigninAPI } from "../api/AuthAPI";
import GoogleButton from "react-google-button";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({});
  const [showBtn, setShowBtn] = useState("password");

  const showPasswordHandler = () => {
    const text = showBtn == "text" ? "password" : "text";
    console.log(text);
    setShowBtn(text);
  };

  const login = async () => {
    // event.preventdefault;
    try {
      let res = await LoginApi(credentials.email, credentials.password);
      // console.log(res?.user);
      toast.success("Signed In to LinkedIn");
      localStorage.setItem("userEmail", res.user.email);
      navigate("/home");
    } catch (err) {
      // console.log(err);
      toast.error("Please check your credentials!");
    }
  };

  const googleSignIn = async () => {
    let res = await GoogleSigninAPI();
    console.log(res);
  };

  return (
    <div className="signin-wrapper">
      <header>
        <span
          onClick={() => {
            navigate("/");
          }}
          className="linkedin-logo"
        >
          <img src={linkedinLogo} alt="" className="signin-logo" />
        </span>
      </header>
      <main className="signin-main-container">
        <div className="signin-card">
          <div>
            <div className="signin-header_content">
              <h1 className="signin-header_content-heading">Sign in</h1>
              <p className="signin-header_content-subheading">
                Stay updated on your professional world
              </p>
            </div>
            <div className="signin-form">
              <div className="signin-form_input--floating">
                <input
                  type="text"
                  autoFocus
                  required
                  placeholder="Email"
                  onChange={(event) =>
                    setCredentials({
                      ...credentials,
                      email: event.target.value,
                    })
                  }
                />
                {/* <label className="" aria-hidden="true">Email or Phone</label> */}
              </div>
              <div className="signin-form_input--floating">
                <input
                  type={showBtn}
                  autoFocus
                  required
                  placeholder="Password"
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
              <div className="flex signin-form__footer flex-col">
                <a href="" className="signin-form__forget-password">
                  Forgot password?
                </a>
                <input type="hidden" />
                <button onClick={login} className="signin-form_btn btn-md">
                  Sign in
                </button>
              </div>
            </div>
            <div className="flex  signin-form_divider">
              <span className="form-divider-line"></span>
              <p className="form__divider-text p-20">or</p>
              <span className="form-divider-line"></span>
            </div>
            <div className="google-auth-container">
              <GoogleButton onClick={googleSignIn} />

              {/* <div className="mb-16px">
                <div className="btn-md google-auth">
                  <img
                    src={GoogleLogo}
                    alt="Google Logo"
                    className="google-logo-img"
                  />
                  <span>Continue with Google</span>
                </div>
              </div> */}
            </div>
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
