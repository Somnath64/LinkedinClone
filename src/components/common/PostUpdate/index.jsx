import "./index.scss";
import SideBar from "../../SideBar";
import MainContent from "../../MainContent";

// eslint-disable-next-line react/prop-types
export default function PostStatus({ currentUser }) {
  return (
    <div className="home-layout">
      <div className="home-layout__main-container">
        <div className="home-layout-content">
          <SideBar currentUser={currentUser}/>
          <MainContent currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
}
