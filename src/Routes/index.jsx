import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import FirstPage from "../Pages/FirstPage";
import HomeLayout from "../Layouts/HomeLayout";
import ProfileLayout from "../Layouts/ProfileLayout";
import ConnectionLayout from "../Layouts/ConnectionLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <FirstPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/home",
    element: <HomeLayout />,
  },
  {
    path: "/profile",
    element: <ProfileLayout />,
  },
  {
    path: "/mynetwork",
    element: <ConnectionLayout />,
  },
]);
