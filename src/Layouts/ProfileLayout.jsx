import { useMemo, useState } from "react";
import Profile from "../Pages/Profile";
import TopBar from "../components/common/Topbar";
import { getCurrentUser } from "../api/FirestoreAPI";

export default function ProfileLayout() {
  const [currentUser, setCurrentUser] = useState({});
  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  return (
    <div>
      <TopBar currentUser={currentUser} />
      <Profile currentUser={currentUser} />
    </div>
  );
}
