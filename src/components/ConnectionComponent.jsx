/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "../Sass/ConnectionComponent.scss";
import {
  getAllUsers,
  addConnection,
  deleteConnection,
} from "../api/FirestoreAPI";

import ConnectedUsers from "./common/ConnectedUsers";
import ConnectUser from "./common/ConnectUser";

export default function ConnectionComponent({ currentUser }) {
  const [users, setUsers] = useState([]);
  const [seeConnectedUsers, setSeeConnectedUsers] = useState(false);
  // const [count,setCount] = useState(0);

  const getCurrentUser = (id) => {
    addConnection(currentUser.id, id);
  };

  const deleteCurrentUser = (id) => {
    deleteConnection(currentUser.id, id);
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
              <div
                className="sidebar-connection"
                onClick={() => {
                  setSeeConnectedUsers(!seeConnectedUsers);
                }}
              >
                <div className="sidebar-connection-name">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="20"
                    fill="none"
                    focusable="false"
                    aria-busy="false"
                  >
                    <path
                      d="M9 14v6H0v-6c0-1.7 1.3-3 3-3h3c1.7 0 3 1.3 3 3Zm5.5-3c1.9 0 3.5-1.6 3.5-3.5S16.4 4 14.5 4 11 5.6 11 7.5s1.6 3.5 3.5 3.5Zm1 2h-2c-1.4 0-2.5 1.1-2.5 2.5V20h7v-4.5c0-1.4-1.1-2.5-2.5-2.5ZM4.5 0C2 0 0 2 0 4.5S2 9 4.5 9 9 7 9 4.5 7 0 4.5 0Z"
                      fill="currentColor"
                    />
                  </svg>{" "}
                  <span>Connected Users</span>
                </div>
              </div>
            </div>
          </section>
          <main className="connection-main-layout">
            <div
              className={
                seeConnectedUsers ? "connection-main-conent" : "hidden"
              }
            >
              <h2 className="connection-main-header">Connected users</h2>
              <ul className="connection-main-card ">
                {users.map((users) => {
                  return (
                    users.id !== currentUser.id && (
                      <ConnectedUsers
                        key={users.id}
                        currentUser={currentUser}
                        users={users}
                        deleteCurrentUser={deleteCurrentUser}
                      />
                    )
                  );
                })}
              </ul>
            </div>
            <div className="connection-main-conent">
              <h2 className="connection-main-header">People you may know</h2>
              <ul className="connection-main-card ">
                {users.map((users) => {
                  return (
                    users.id !== currentUser.id && (
                      <ConnectUser
                        key={users.id}
                        currentUser={currentUser}
                        users={users}
                        getCurrentUser={getCurrentUser}
                      />
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
