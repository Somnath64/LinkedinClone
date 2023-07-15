/* eslint-disable react/prop-types */
import { useState, useMemo } from "react";
import "../Sass/MainContent.scss";
import { postStatus, getStatus, updatePost } from "../api/FirestoreAPI";
import { getCurrentTimeStamp } from "../helpers/useMoment";
import { PostsCard } from "./common/PostCard";
import { imageIcon, videoIcon, articleIcon, eventIcon } from "../assets";
import ModalComponent from "./common/Modal";
import { getUniqueId } from "../helpers/getUniqueId";

export default function MainContent({ currentUser }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [currentPost, setCurrentPost] = useState({});
  const [postImage, setPostImage] = useState("");

  console.log(postImage);

  const sendStatus = async () => {
    let object = {
      status: status,
      timestamp: getCurrentTimeStamp("LLL"),
      userEmail: currentUser.email,
      userName: currentUser.name,
      postId: getUniqueId(),
      userId: currentUser.id,
      postImage: postImage,
    };
    await postStatus(object);
    await setModalOpen(false);
    await setStatus("");
    await setPostImage("");
  };

  const updateStatus = () => {
    updatePost(currentPost?.id, status, postImage);
    setModalOpen(false);
    setPostImage("");
  };

  const getEditData = (posts) => {
    setModalOpen(true);
    setStatus(posts?.status);
    setIsEdit(true);
    setCurrentPost(posts);
  };

  useMemo(() => {
    getStatus(setAllPosts);
  }, []);
  return (
    <div className="layout-main">
      <div>
        <div className="share-feed-box">
          <div className="share-feed-box__topbar">
            <div className="share-feed-avtar">
              <img
                src={currentUser?.imageLink}
                alt=""
                className="share-feed-img"
              />
            </div>
            <button
              className="share-feed-btn feed-btn"
              onClick={() => {
                setIsEdit(false);
                setModalOpen(true);
              }}
            >
              <span>Start a post</span>
            </button>
            <ModalComponent
              sendStatus={sendStatus}
              status={status}
              setStatus={setStatus}
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              isEdit={isEdit}
              updateStatus={updateStatus}
              setPostImage={setPostImage}
              postImage={postImage}
              setCurrentPost={setCurrentPost}
              currentPost={currentPost}
            />
          </div>
          <div className="share-feed-toolbar">
            <button className="share-feed-toolbar-btn feed-btn">
              <img src={imageIcon} alt="" className="img-icon" />
              <span className="toolbar-btn-text">Photo</span>
            </button>
            <button className="share-feed-toolbar-btn feed-btn">
              <img src={videoIcon} alt="" className="img-icon" />
              <span className="toolbar-btn-text">Video</span>
            </button>
            <button className="share-feed-toolbar-btn feed-btn">
              <img src={eventIcon} alt="" className="img-icon" />
              <span className="toolbar-btn-text">Event</span>
            </button>
            <button className="share-feed-toolbar-btn feed-btn">
              <img src={articleIcon} alt="" className="img-icon" />
              <span className="toolbar-btn-text">Write article</span>
            </button>
          </div>
        </div>
      </div>
      <div>
        {allPosts &&
          allPosts.map((posts) => {
            return (
              <PostsCard
                key={posts.timestamp}
                posts={posts}
                getEditData={getEditData}
              />
            );
          })}
      </div>
    </div>
  );
}
