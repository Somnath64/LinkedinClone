/* eslint-disable react/prop-types */
import "../Sass/SideBar.scss";
import { useNavigate } from "react-router-dom";

export default function SideBar({ currentUser }) {
  const navigate = useNavigate();
  return (
    <div className="sidebar-layout">
      <div className="sidebar-identity">
        <div
          className="sidebar-identity-main"
          onClick={() => {
            navigate("/profile");
          }}
        >
          <div className="sidebar-identity-bg-img"></div>
          <div className="sidebar-identity-block">
            <div>
              <img
                src={currentUser?.imageLink}
                alt=""
                className="sidebar-identity-photo"
              />
            </div>
            <div className="sidebar-identity-name">{currentUser?.name}</div>
          </div>
          <p className="identity-headline">{currentUser?.headline}</p>
        </div>
        <div className="sidebar-widgets">
          <div className="entity-list-wrapper">
            <ul className="entity-list-row">
              <li className="entity-list-item">
                <div className="item-full-width">
                  <div className="item-baseline">
                    <div className="item-name"> Connection</div>
                    <div className="item-count">1</div>
                  </div>
                </div>
              </li>

              {/* <li className="entity-list-item">
                <div className="item-full-width">
                  <div className="item-baseline">
                    <div className="item-name">Invitation</div>
                    <div className="item-count">1</div>
                  </div>
                </div>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
