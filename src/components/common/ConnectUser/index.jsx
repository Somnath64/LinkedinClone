/* eslint-disable react/prop-types */
import "./index.scss";
import { useEffect, useState } from "react";
import { getConnections } from "../../../api/FirestoreAPI";

export default function ConnectedUsers({ currentUser, users, getCurrentUser }) {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    getConnections(currentUser.id, users.id, setIsConnected);
  }, [currentUser.id, users.id]);



  return (
    !isConnected && (
      <li className="flex connection-main-card-li ">
        <div className="connection-card">
          <div className="connection-card-header">
            <div className="connection-card-header--container">
              <img
                src={users?.imageLink}
                alt=""
                className="connection-card-header--img"
              />
              <span className="connection-card-header--title">
                {users?.name}
              </span>
              <span className="connection-card-header--subtitle">
                {users?.headline}
              </span>
            </div>
          </div>
        </div>
        <div className="connection-card-buttom">
          <button
            className="connection-card-buttom-btn"
            onClick={() => getCurrentUser(users.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              data-supported-dps="16x16"
              fill="#0a66c2"
              width="16"
              height="16"
              focusable="false"
            >
              <path d="M9 4a3 3 0 11-3-3 3 3 0 013 3zM6.75 8h-1.5A2.25 2.25 0 003 10.25V15h6v-4.75A2.25 2.25 0 006.75 8zM13 8V6h-1v2h-2v1h2v2h1V9h2V8z"></path>
            </svg>
            <span className="connect-text">Connect</span>
          </button>
        </div>
      </li>
    )
  );
}
