import { useState } from "react";
import asset0 from "../assets/asset0.png";
import { toast } from "react-toastify";
import Footer from "./Footer";
import NavBar from "./navBar";
// import GoogleLogo from "../assets/googleLogo.png";
import "../Sass/FirstPageComponent.scss";
import LoginApi, { GoogleSigninAPI } from "../api/AuthAPI";
import GoogleButton from "react-google-button";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
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
      await LoginApi(credentials.email, credentials.password);
      toast.success("Signed In to LinkedIn");
      navigate("/home");
    } catch (err) {
      toast.error("Please check your credentials!");
    }
  };

  const googleSignIn = async () => {
    await GoogleSigninAPI();
    navigate("/home");
  };

  return (
    <div className="login-wrapper">
      <NavBar />
      <main className="main_container">
        <section className="section">
          <div className="hero_content">
            <h1 className="hero_heading">
              Welcome to your professional community
            </h1>
            <div className="hero_cta-form">
              {/* <form action=""> */}
              {/* method="post" noValidate */}
              <input type="hidden" />
              <div className="flex flex-col">
                <div className="mt">
                  <div className="flex flex-col">
                    <label className="input-label"> Email Id</label>
                    <div className="text-input flex">
                      <input
                        type="text"
                        className="input"
                        required
                        autoComplete="username"
                        onChange={(event) =>
                          setCredentials({
                            ...credentials,
                            email: event.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="mt">
                  <div className="flex flex-col">
                    <label htmlFor="" className="input-label">
                      Password
                    </label>
                    <div className="text-input flex">
                      <input
                        type={showBtn}
                        required
                        autoComplete="current-password"
                        className="input"
                        onChange={(event) =>
                          setCredentials({
                            ...credentials,
                            password: event.target.value,
                          })
                        }
                      />
                      <button
                        className="input-btn"
                        type="button"
                        onClick={showPasswordHandler}
                      >
                        Show
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* ----------------------Sign in form footer----------- */}
              <div className="flex signin-form__footer flex-col">
                <a href="" className="signin-form__forget-password">
                  Forgot password?
                </a>
                <input type="hidden" />
                <button
                  // type="submit"
                  onClick={login}
                  className="signin-form_btn btn-md"
                >
                  Sign in
                </button>
              </div>
              <div className="flex signin-form__divider">
                <span className="form-divider-line"></span>
                <p className="form__divider-text">or</p>
                <span className="form-divider-line"></span>
              </div>
              {/* </form> */}
              <div className="google-auth-container">
                <GoogleButton onClick={googleSignIn} />
                {/* <div className="mb-16px">
                <div className="btn-md google-auth">
                  <img
                    src={GoogleLogo}
                    alt="Google Logo"
                    className="google-logo-img"
                  />
                  <button>Continue with Google</button>
                </div>
                </div> */}
              </div>
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
            src={asset0}
            alt="Welcome to your professional community"
            className="welcome-img"
          />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
