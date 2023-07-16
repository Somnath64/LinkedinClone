/* eslint-disable react/prop-types */
import "./index.scss";
import ProfileModal from "../ProfileModal";
import UploadImage from "../UploadImage";
import {
  editProfile,
  getStatus,
  getSingleStatus,
  getSingleUser,
} from "../../../api/FirestoreAPI";
import { PostsCard } from "../PostCard";
import { useLocation } from "react-router-dom";
import { editIcon} from "../../../assets";
import { useState, useMemo } from "react";

export default function ProfilePage({ currentUser }) {
  let location = useLocation();
  const [modalOpen, setModalOpen] = useState(false);
  const [uploadImageModal, setUploadImageModal] = useState(false);
  const [editInput, setEditInput] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [allStatus, setAllStatus] = useState([]);
  const [currentProfile, setCurrentProfile] = useState({});

  const getInput = (event) => {
    let { name, value } = event.target;
    let input = { [name]: value };
    setEditInput({ ...editInput, ...input });
  };

  const updateProfileData = () => {
    setModalOpen(false);
    editProfile(currentUser?.id, editInput);
  };

  useMemo(() => {
    if (location?.state?.id) {
      getSingleStatus(setAllStatus, location?.state?.id);
    }

    if (location?.state?.email) {
      getSingleUser(setCurrentProfile, location?.state?.email);
    }
    setEditInput(currentUser);

    getStatus(setAllPosts);
  }, []);

  return (
    <>
      <div className="profile-layout">
        <div className="profile-component">
          <div className="profile-main-container">
            <main className="main__layout">
              <div className="top-card">
                <div className="hero-image">
                  {/* <div className="background-image-edit">
                    <button className="background-image-edit-btn button">
                      <img src={cameraIcon} alt="" />
                    </button>
                  </div> */}
                </div>
                <div className="p5">
                  <div className="flex">
                    <div className="card__photo">
                      <div className="card__photo-wrapper">
                        <div className="card__edit-photo">
                          <button
                            className="card__edit-btn button"
                            onClick={() => setUploadImageModal(true)}
                          >
                            {currentUser?.imageLink && (
                              <img
                                src={
                                  Object.values(currentProfile).length === 0
                                    ? currentUser?.imageLink
                                    : currentProfile?.imageLink
                                }
                                alt="profileImage"
                                className="card__Photo-img"
                              />
                            )}
                          </button>
                        </div>
                      </div>
                      <UploadImage
                        setUploadImageModal={setUploadImageModal}
                        uploadImageModal={uploadImageModal}
                        currentUser={currentUser}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="card__badge-wrap">
                        {Object.values(currentProfile).length === 0 && (
                          <button
                            className="card__badge-btn button "
                            onClick={() => setModalOpen(true)}
                          >
                            <img src={editIcon} alt="editIcon" />
                          </button>
                        )}

                        <ProfileModal
                          modalOpen={modalOpen}
                          setModalOpen={setModalOpen}
                          setEditProfile={setEditInput}
                          getInput={getInput}
                          updateProfileData={updateProfileData}
                          editInput={editInput}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="relative-mt2">
                    <div className="detail-panel">
                      <div>
                        <h1 className="text-heading">
                          {Object.values(currentProfile).length === 0
                            ? currentUser?.name
                            : currentProfile?.name}
                        </h1>
                      </div>
                      <div className="text-subheading">
                        {Object.values(currentProfile).length === 0
                          ? currentUser?.headline
                          : currentProfile?.headline}
                      </div>
                    </div>
                    <div className="detail-right-panel">
                      <p className="panel-text">
                        {" "}
                        {Object.values(currentProfile).length === 0
                          ? currentUser?.company
                          : currentProfile?.company}
                      </p>
                      <p className="panel-text">
                        {Object.values(currentProfile).length === 0
                          ? currentUser?.collage
                          : currentProfile?.collage}
                      </p>
                    </div>
                    <div className="detail-left-panel1">
                      <span className="text">
                        {Object.values(currentProfile).length === 0
                          ? currentUser?.city
                          : currentProfile?.city}
                        {currentUser?.city || currentProfile?.city ? ", " : ""}
                        {Object.values(currentProfile).length === 0
                          ? currentUser?.country
                          : currentProfile?.country}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="post-card">
                {Object.values(currentProfile).length === 0
                  ? allPosts &&
                    allPosts
                      .filter((item) => {
                        return (
                          item.userEmail === localStorage.getItem("userEmail")
                        );
                      })
                      .map((posts) => {
                        return (
                          <PostsCard key={posts.timestamp} posts={posts} />
                        );
                      })
                  : allStatus &&
                    allStatus.map((posts) => {
                      return <PostsCard key={posts.timestamp} posts={posts} />;
                    })}
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
