/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../../../api/FirestoreAPI";
import "./index.scss";
import ProfilePopup from "../ProfilePopup";
import { useEffect, useState } from "react";
import {
  linkedinSmallLogo,
  homeLogo,
  searchIcon,
  peopleLogo,
  jobsIcon,
  messageIcon,
  notificationIcon,
} from "../../../assets";

export default function TopBar({ currentUser }) {
  const [popup, setPopup] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [searchUsers, setSearchUsers] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  

  const navigate = useNavigate();

  const handleCardClick = () => {
    setPopup(!popup);
    setIsPopupOpen(!isPopupOpen);
  };

  const handleSearch = () => {
    if (searchUsers !== "") {
      let searched = users.filter((user) => {
        return Object.values(user)
          .join("")
          .toLowerCase()
          .includes(searchUsers.toLowerCase());
      });

      setFilteredUsers(searched);
    } else {
      setFilteredUsers(users);
    }
  };

  const openProfile = (user) => {
    navigate("/profile", {
      state: {
        id: user.id,
        email: user.email,
      },
    });
  };

  const goto = (route) => {
    navigate(route);
  };

  useEffect(() => {
    getAllUsers(setUsers);
  }, []);

  useEffect(() => {
    let debounced = setTimeout(() => {
      handleSearch();
    }, 1000);

    return () => clearTimeout(debounced);
  }, [searchUsers]);


  return (
    <header className="global-topbar">
      <div className="global-topbar-content">
        <span className="global-topbar-logo-container">
          <img
            src={linkedinSmallLogo}
            alt="linkedinlogo"
            className="topbar-logo"
          />
        </span>

        <div className="global-search">
          <div className="global-search-head">
            <input
              className="global-search-head-input"
              placeholder="Search users..."
              onChange={(e) => {
                setSearchUsers(e.target.value);
              }}
            />
          </div>
          <div className="global-search-icon-container">
            <img src={searchIcon} alt="" />
          </div>
        </div>
        <nav className="global_nav">
          <ul className="global_nav-primary-items">
            <li className="global_nav-primary-item">
              <div
                className="global_nav-primary-link global_nav-primary-link--active "
                onClick={() => goto("/home")}
              >
                <div className="global_nav-icon">
                  <img src={homeLogo} alt="homeicon" />
                </div>
                <div className="global_nav-primary-text ">
                  <span className="global_nav-text">Home</span>
                </div>
              </div>
            </li>
            <li className="global_nav-primary-item">
              <div
                className="global_nav-primary-link global_nav-primary-link--active "
                onClick={() => goto("/mynetwork")}
              >
                <div className="global_nav-icon">
                  <img src={peopleLogo} alt="peoplrIcon" />
                </div>
                <div className="global_nav-primary-text">
                  <span className="global_nav-text">My Network</span>
                </div>
              </div>
            </li>
            <li className="global_nav-primary-item">
              <div
                className="global_nav-primary-link global_nav-primary-link--active "
                onClick={() => goto("")}
              >
                <div className="global_nav-icon">
                  <img src={jobsIcon} alt="brifcase" />
                </div>
                <div className="global_nav-primary-text">
                  <span className="global_nav-text">Jobs</span>
                </div>
              </div>
            </li>
            <li className="global_nav-primary-item">
              <div
                className="global_nav-primary-link global_nav-primary-link--active "
                onClick={() => goto("")}
              >
                <div className="global_nav-icon">
                  <img src={messageIcon} alt="messageIcon" />
                </div>
                <div className="global_nav-primary-text">
                  <span className="global_nav-text ">Messaging</span>
                </div>
              </div>
            </li>
            <li className="global_nav-primary-item">
              <div
                className="global_nav-primary-link global_nav-primary-link--active "
                onClick={() => goto("")}
              >
                <div className="global_nav-icon">
                  <img src={notificationIcon} alt="bellIcon" />
                </div>
                <div className="global_nav-primary-text">
                  <span className="global_nav-text">Notifications</span>
                </div>
              </div>
            </li>
            {isPopupOpen && <ProfilePopup currentUser={currentUser} />}
            <li className="global_nav-primary-item" onClick={handleCardClick}>
              <div className="global_nav-primary-link global_nav-primary-link--active ">
                <div className="global_nav-icon">
                  <img
                    src={currentUser?.imageLink}
                    alt=""
                    className="global_nav-me-photo"
                  />
                </div>
                <div className="global_nav-primary-text">
                  <span className="global_nav-text">me</span>
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </div>
      {searchUsers && (
        <div className="search-result">
          {filteredUsers.length === 0 ? (
            <div className="search-header-top bg">No Result Found...!</div>
          ) : (
            filteredUsers.map((user) => (
              <div
                className="search-header-top"
                key={user.id}
                onClick={() => openProfile(user)}
              >
                <div className="search-header-img">
                  <img className="img" src={user?.imageLink} alt="" />
                </div>
                <div className="search-header-content">
                  <div className="content-title">
                    <span>{user?.name}</span>
                  </div>
                  <div className="content-subtitle">
                    <span>{user?.headline}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </header>
  );
}
