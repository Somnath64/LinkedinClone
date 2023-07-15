/* eslint-disable react/prop-types */
import "./index.scss";
import thumbUpIconBlue from "../../../assets/thumbUpIconBlue.svg";
import thumbUpIcon from "../../../assets/thumbUpIcon.svg";
import { likePost } from "../../../api/FirestoreAPI";
import commentIcon from "../../../assets/commentIcon.png";
import repeatIcon from "../../../assets/repeatIcon.png";
import sendIcon from "../../../assets/sendIcon.png";
import { useMemo, useState } from "react";
import { postComment, getComment } from "../../../api/FirestoreAPI";
import { getCurrentTimeStamp } from "../../../helpers/useMoment";

// import commentIcon from "../../../assets/commentIcon.png";

export default function LikeButton({
  userId,
  postId,
  liked,
  currentUser,
  setCommentCount,
}) {
  // const [input, setInput] = useState("");
  const [commentVisible, setcommentVisible] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  // const [seeMore, setSeeMore] = useState(false);

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

  // const handleSeeMoreClick = () => {
  //   setSeeMore(true);
  // };

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
        {/* <LikeButton
          userId={currentUser?.userId}
          postId={posts?.id}
          liked={liked}
        /> */}

        <div className="social-action-like" onClick={handleVisibleClick}>
          <button className="social-action-like-btn feed-btn button">
            <div className="social-like">
              <img src={commentIcon} alt="" className="social-like-icon" />
              <span className="social-like-text">Comment</span>
            </div>
          </button>
        </div>
        {/* <CommentButton /> */}

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
              // onClick={handleCommentClick}
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
              // eslint-disable-next-line react/jsx-key
              <div className="comment-box-layout">
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
                  {/* <div className="comment-see-more">
                    <button
                      className={seeMore ? "hidden" : "comment-see-more-btn"}
                      onClick={handleSeeMoreClick}
                    >
                      ...see more
                    </button>
                  </div> */}
                </div>
              </div>
            );
          })}

        {/* <div className="comment-box-layout">
          <div className="comment-avatar-img">
            <img src="" alt="" className="comment-img" />
          </div>
          <div className="comments">
            <div className="comment-post-profile-wrapper">
              <span className="comment-post-profile-name">Somnath Bhosale</span>
              <span className="comment-post-profile-subheading">
                Full stack developer
              </span>
            </div>
            <p className={seeMore ? "comment-text" : "comment-text-h"}>
              Thats fantastic news to hear about Axtrias expansion plans in
              India! With the increasing demand for data science, software
              development, and data engineering expertise in the life sciences
              industry, its great to see that Axtria is taking proactive steps
              to meet those needs. The companys focus on using AI-driven
              approaches to create healthcare solutions demonstrates its
              commitment to innovation and leveraging technology for positive
              impact. This growth not only provides exciting opportunities for
              professionals in the field but also contributes to the overall
              development of the IT and life sciences sectors in India. Best of
              luck to Axtria and the new hires in their future endeavors!
              LinkedIn News India | Preethi Ramamoorthy
            </p>
            <div className="comment-see-more">
              <button
                className={seeMore ? "hidden" : "comment-see-more-btn"}
                onClick={handleSeeMoreClick}
              >
                ...see more
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
