/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "../Sass/ConnectionComponent.scss";
import { getAllUsers, addConnection } from "../api/FirestoreAPI";

import ConnectedUsers from "./common/ConnectedUsers";
import peopleIcon from "../assets/signin/peopleIcon.svg";

export default function ConnectionComponent({ currentUser }) {
  const [users, setUsers] = useState([]);

  const getCurrentUser = (id) => {
    addConnection(currentUser.id, id);
  };

  useEffect(() => {
    getAllUsers(setUsers);
  }, []);

  return (
    <div className="connection-layout">
      <div className="connection-layout-container">
        <div className="connection-layout-content">
          <section className="connection-sidebar-layout">
            <div className="connection-sidebar-content">
              <h2 className="connection-sidebar-header">Manage my network</h2>
              <div className="sidebar-connection">
                <img
                  src={peopleIcon}
                  alt="icon"
                  className="sidebar-image-icon"
                />
                <div className="sidebar-connection-name"> Connections</div>
                <span className="sidebar-connection-count">200</span>
              </div>
            </div>
          </section>
          <main className="connection-main-layout">
            <div className="connection-main-conent">
              <h2 className="connection-main-header">People you may know</h2>
              <ul className="connection-main-card">
                {users.map((users) => {
                  return (
                    users.id !== currentUser.id && (
                      <>
                        <ConnectedUsers
                          currentUser={currentUser}
                          users={users}
                          getCurrentUser={getCurrentUser}
                        />
                      </>
                    )
                  );
                })}
              </ul>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
