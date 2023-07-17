import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import Loader from "../components/common/Loader";

import SignUpComponent from "../components/SignUpComponent";

export default function SignUp() {
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if (res?.accessToken) {
        navigate("/home");
      } else {
        setLoading(false);
      }
    });
  }, []);

  return loading ? <Loader /> : <SignUpComponent  />;
}
