/* eslint-disable react/prop-types */
import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "./index.scss";
import LikeButton from "../LikeButton";
import {
  getCurrentUser,
  getLikesByUser,
  getAllUsers,
  deletePost,
  getConnections,
} from "../../../api/FirestoreAPI";
import { worldIcon, editIcon, deleteIcon } from "../../../assets";

export const PostsCard = ({ posts, getEditData }) => {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  useMemo(() => {
    getCurrentUser(setCurrentUser);
    getLikesByUser(currentUser?.id, posts?.id, setLiked, setLikeCount);
    getAllUsers(setAllUsers);
  }, [currentUser?.id, posts?.id]);

  useEffect(() => {
    getConnections(currentUser.id, posts.userId, setIsConnected);
  }, [currentUser.id, posts.userId]);

  return currentUser.id === posts.userId || isConnected ? (
    <div className="feed-layout">
      <div className="feed">
        <div className="feed-component">
          <div className="feed-component-top">
            <div className="feed-component-absolute"></div>
            <div className="feed-component-img-related">
              <img
                src={
                  allUsers
                    .filter((item) => item.id === posts.userId)
                    .map((item) => item.imageLink)[0]
                }
                alt="profile-image"
                className="feed-component-image"
              />
            </div>
            <div className="feed-component-meta">
              <span className="feed-component-title">
                <div className="feed-component-name">
                  <span
                    className="component-name"
                    onClick={() => {
                      currentUser.id !== posts.userId
                        ? navigate("/profile", {
                            state: {
                              id: posts?.userID,
                              email: posts.userEmail,
                            },
                          })
                        : navigate("/profile");
                    }}
                  >
                    {
                      allUsers.filter((item) => item.id === posts.userId)[0]
                        ?.name
                    }
                  </span>
                </div>
                <div className="feed-component-description">
                  <span>
                    {
                      allUsers.filter((item) => item.id === posts.userId)[0]
                        ?.headline
                    }
                  </span>
                </div>
                <div className="feed-component-sub-decsription">
                  <span>
                    {moment().startOf("day").fromNow(posts.timestamp)} •{" "}
                    <img src={worldIcon} alt="" />
                  </span>
                </div>
              </span>
            </div>
          </div>
        </div>
        {currentUser.id === posts.userId && (
          <div className="share-feed-menu">
            <div className="dropdown">
              <button
                className="dropdown-btn feed-btn"
                onClick={() => getEditData(posts)}
              >
                <img src={editIcon} alt="" className="img-editIcon" />
              </button>
            </div>
            <div className="dropdown">
              <button
                className="dropdown-btn feed-btn"
                onClick={() => deletePost(posts.id)}
              >
                <img src={deleteIcon} alt="" className="img-deleteIcon" />
              </button>
            </div>
          </div>
        )}
        <div className="share-feed-description-wrapper">
          <div className="feed-show-more-text">
            <div className="update-text">
              <span className="break-words">
                <div dangerouslySetInnerHTML={{ __html: posts.status }}></div>
              </span>
            </div>
          </div>
        </div>
        {posts.postImage && (
          <div className="update-component-img">
            <div className="relative">
              <div className="update-component-img_container">
                <button className="update-component-img-link">
                  <div className="img-link">
                    <img
                      src={posts.postImage}
                      alt="postImage"
                      className="component-image"
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="social-details">
          <ul className="social-counts">
            <li className="social-counts-item">
              <button className="social-counts-value button">
                <img
                  src="https://static.licdn.com/sc/h/8ekq8gho1ruaf8i7f86vd1ftt"
                  alt=""
                  className="social-counts-icon"
                />
                <img
                  src="	https://static.licdn.com/sc/h/b1dl5jk88euc7e9ri50xy5qo8"
                  alt=""
                  className="social-counts-icon icons"
                />
                <img
                  src="https://static.licdn.com/sc/h/cpho5fghnpme8epox8rdcds22"
                  alt=""
                  className="social-counts-icon icons"
                />
                <span className="social-reaction-counts">{likeCount}</span>
              </button>
            </li>
            <li className="social-comment-counts">
              <button className="social-comment-counts-value button">
                <span>{commentCount} comments</span>
              </button>
            </li>
          </ul>

          <LikeButton
            userId={currentUser?.id}
            postId={posts?.id}
            liked={liked}
            currentUser={currentUser}
            setCommentCount={setCommentCount}
          />
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};
