import linkedinLogo from "../assets/linkedinLogo.png";
import "../Sass/ForgetPassword.scss";

const ForgetPassword = () => {
  return (
    <div>
      <header>
        <a href="" className="linkedin-logo">
          <img src={linkedinLogo} alt="" className="signin-logo" />
        </a>
      </header>
      <main className="signin-main-container mh-87">
        <div className="signin-card">
          <div>
            <div className="signin-header_content">
              <h1 className="signin-header_content-heading">
                Forgot password?
              </h1>
              <p className="signin-header_content-subheading">
                Reset password in two quick steps
              </p>
            </div>
            <form action="" method="post" className="signin-form">
              <div className="signin-form_input--floating mb-24">
                <input
                className="forget-form-input"
                  type="text"
                  autoFocus
                  required
                  placeholder="Email or Phone"
                />
              </div>

              <div className="flex signin-form__footer flex-col">
                <input type="hidden" />
                <button type="submit" className="signin-form_btn btn-md">
                  Reset password
                </button>
              </div>
              <div><a href="" className="back-button">Back</a></div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ForgetPassword;
