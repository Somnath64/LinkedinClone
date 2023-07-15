/* eslint-disable react/prop-types */
import "./index.scss";
import { SignOutAPI } from "../../../api/AuthAPI";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { getCurrentUser } from "../../../api/FirestoreAPI";

export default function ProfilePopup() {
  let navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({});
  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);

  return (
    <div className="popupCard">
      <header className="header">
        <div className="header-top">
          <div className="header-img">
            <img className="img" src={currentUser?.imageLink} alt="" />
          </div>
          <div className="header-content">
            <div className="content-title">
              <span>{currentUser?.name}</span>
            </div>
            <div className="content-subtitle">
              <span>{currentUser?.headline}</span>
            </div>
          </div>
        </div>
        <div className="header-btn">
          <button
            className="header-view-btn"
            onClick={() => {
              navigate("/profile");
            }}
          >
            View Profile
          </button>
        </div>
      </header>
      <div className="main">
        <div className="main-divider">
          <ul className="main-list">
            <li
              onClick={() => {
                SignOutAPI();
                navigate("/");
              }}
            >
              Sign out
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
