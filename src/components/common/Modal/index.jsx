/* eslint-disable react/prop-types */
import { Modal, Button, Progress } from "antd";
// import imageIcon from "../../../assets/imageIcon.png";
import { imageIcon } from "../../../assets";
import { useState } from "react";
import { uploadPostImage } from "../../../api/UploadImage";
import ReactQuill from "react-quill";
import "./index.scss";

const ModalComponent = ({
  modalOpen,
  setModalOpen,
  sendStatus,
  setStatus,
  status,
  isEdit,
  updateStatus,
  postImage,
  setPostImage,
  setCurrentPost,
  currentPost,
}) => {

  const [progress, setProgress] = useState(0);
  return (
    <>
      <Modal
        title={isEdit ? "Update Post" : "Create Post"}
        centered
        open={modalOpen}
        onOk={() => {
          setPostImage("");
          setStatus("");
          setModalOpen(false);
          setCurrentPost({});
        }}
        onCancel={() => {
          setPostImage("");
          setStatus("");
          setModalOpen(false);
          setCurrentPost({});
        }}
        footer={[
          <Button
            key="submit"
            type="primary"
            disabled={status.length > 0 ? false : true}
            onClick={isEdit ? updateStatus : sendStatus}
          >
            {isEdit ? "Update" : "Post"}
          </Button>,
        ]}
      >
        <div className="post-body">
          <ReactQuill
            className="modal-input"
            theme="snow"
            value={status}
            onChange={setStatus}
          />
          ;
          {progress === 0 || progress === 100 ? (
            <></>
          ) : (
            <div>
              <Progress type="circle" percent={progress} />
            </div>
          )}
          {postImage.length > 0 || currentPost?.postImage?.length ? (
            <img
              src={postImage || currentPost?.postImage}
              alt="postImage"
              className="preview-image"
            />
          ) : (
            <></>
          )}
        </div>
        <label htmlFor="pic-upload">
          <img src={imageIcon} alt="" className="upload-image" />
        </label>
        <input
          type="file"
          name=""
          id="pic-upload"
          hidden
          onChange={(e) =>
            uploadPostImage(e.target.files[0], setPostImage, setProgress)
          }
        />
      </Modal>
    </>
  );
};
export default ModalComponent;
