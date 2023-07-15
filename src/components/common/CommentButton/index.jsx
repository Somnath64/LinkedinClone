/* eslint-disable react/prop-types */
import "./index.scss";
import { useState } from "react";
import commentIcon

export default function CommentButton() {
  const [commentVisible, setCommentVisible] = useState(false)

  const handleClick = () => {
    setCommentVisible(!commentVisible);
  };

  return (
    <div className="social-action-comment" onClick={handleClick}>
      <button className="social-action-comment-btn feed-btn button">
        <div className="social-comment">
          <img src={commentIcon} alt="" className="social-comment-icon" />
          <span className="social-comment-text">Comment</span>
        </div>
      </button>
    </div>
  );
}
