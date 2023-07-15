import { useMemo, useState } from "react";
import Connections from "../Pages/Connections";
import TopBar from "../components/common/Topbar";
import { getCurrentUser } from "../api/FirestoreAPI";

export default function ConnectionLayout() {
  const [currentUser, setCurrentUser] = useState({});
  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  return (
    <div>
      <TopBar currentUser={currentUser} />
      <Connections currentUser={currentUser} />
    </div>
  );
}
