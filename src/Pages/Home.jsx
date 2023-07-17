import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomePage from "../components/HomePage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import Loader from "../components/common/Loader";

// eslint-disable-next-line react/prop-types
export default function Home({ currentUser }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if (!res?.accessToken) {
        navigate("/login");
      } else {
        setLoading(false);
      }
    });
  }, []);

  return loading ? <Loader /> : <HomePage currentUser={currentUser} />;
}
