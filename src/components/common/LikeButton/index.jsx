/* eslint-disable react/prop-types */
import "./index.scss";
import { likePost } from "../../../api/FirestoreAPI";
import { useMemo, useState } from "react";
import { postComment, getComment } from "../../../api/FirestoreAPI";
import { getCurrentTimeStamp } from "../../../helpers/useMoment";
import {
  thumbUpIconBlue,
  thumbUpIcon,
  commentIcon,
  repeatIcon,
  sendIcon,
} from "../../../assets";

export default function LikeButton({
  userId,
  postId,
  liked,
  currentUser,
  setCommentCount,
}) {
  const [commentVisible, setcommentVisible] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const handleVisibleClick = () => {
    setcommentVisible(!commentVisible);
  };

  console.log(currentUser);

  const addComment = () => {
    postComment(
      postId,
      comment,
      getCurrentTimeStamp("LLL"),
      currentUser?.name,
      currentUser?.headline,
      currentUser?.imageLink
    );
    setComment("");
  };

  const handleLikeClick = () => {
    likePost(userId, postId, liked);
  };

  useMemo(() => {
    getComment(postId, setComments, setCommentCount);
  }, [postId, setCommentCount]);

  return (
    <div>
      <div className="social-actions">
        <span className="social-action-like">
          <button
            className="social-action-like-btn feed-btn button"
            onClick={handleLikeClick}
          >
            <div className="social-like">
              <img
                src={liked ? thumbUpIconBlue : thumbUpIcon}
                alt=""
                className="social-like-icon"
              />
              <span className="social-like-text">Like</span>
            </div>
          </button>
        </span>

        <div className="social-action-like" onClick={handleVisibleClick}>
          <button className="social-action-like-btn feed-btn button">
            <div className="social-like">
              <img src={commentIcon} alt="" className="social-like-icon" />
              <span className="social-like-text">Comment</span>
            </div>
          </button>
        </div>

        <span className="social-action-like">
          <button className="social-action-like-btn feed-btn button">
            <div className="social-like">
              <img src={repeatIcon} alt="" className="social-like-icon" />
              <span className="social-like-text">Repost</span>
            </div>
          </button>
        </span>
        <span className="social-action-like">
          <button className="social-action-like-btn feed-btn button">
            <div className="social-like">
              <img src={sendIcon} alt="" className="social-like-icon" />
              <span className="social-like-text">Send</span>
            </div>
          </button>
        </span>
      </div>
      <div className={commentVisible ? "" : "hidden"}>
        <div className="comment-box-layout">
          <div className="comment-avatar-img">
            <img src={currentUser?.imageLink} alt="" className="comment-img" />
          </div>
          <div className="comment-input-layout">
            <input
              className="comment-input"
              type="text"
              placeholder="Add a comment..."
              autoFocus
              name="comment"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
          </div>
        </div>
        <button
          className={comment.length > 0 ? "comment-post-btn" : "hidden"}
          onClick={addComment}
        >
          post
        </button>

        {comments.length > 0 &&
          comments.map((comment) => {
            return (
              <div className="comment-box-layout" key={comment.id}>
                <div className="comment-avatar-img">
                  <img src={comment.imageLink} alt="" className="comment-img" />
                </div>
                <div className="comments">
                  <div className="comment-post-profile">
                    <div className="comment-post-profile-wrapper">
                      <span className="comment-post-profile-name">
                        {comment.name}
                      </span>
                      <span className="comment-post-profile-subheading">
                        {comment.headline}
                      </span>
                    </div>
                    <div className="comment-timestamp">
                      <span>{comment.timeStamp}</span>
                    </div>
                  </div>

                  <p className="comment-text">{comment.comment}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
