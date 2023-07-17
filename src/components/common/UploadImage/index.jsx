/* eslint-disable react/prop-types */
import { useState } from "react";
import "./index.scss";
import { Modal, Button, Progress } from "antd";
import { uploadImage as uploadImageAPI } from "../../../api/UploadImage";

export default function UploadImage({
  setUploadImageModal,
  uploadImageModal,
  currentUser,
}) {
  const [currentImage, setCurrentImage] = useState({});

  const [progress, setProgress] = useState(0);

  const uploadImage = () => {
    uploadImageAPI(
      currentImage,
      currentUser?.id,
      setUploadImageModal,
      setProgress,
      setCurrentImage
    );
  };

  const getImage = (event) => {
    setCurrentImage(event.target.files[0]);
  };

  return (
    <>
      <Modal
        title="Profile Photo"
        centered
        open={uploadImageModal}
        onOk={() => setUploadImageModal(false)}
        onCancel={() => setUploadImageModal(false)}
        footer={[
          <Button
            key="submit"
            type="primary"
            onClick={uploadImage}
            disabled={currentImage?.name ? false : true}
          >
            Upload
          </Button>,
        ]}
      >
        <div className="profile-upload-image">
          <img src={currentUser?.imageLink} alt="" className="profile-image" />
          <label htmlFor="upload-image" className="upload-label">
            Add a Image
          </label>
          {currentImage?.name}
          {progress === 0 ? (
            <></>
          ) : (
            <div className="progress-bar">
              <Progress type="circle" percent={progress} />
            </div>
          )}
          <input hidden id="upload-image" type={"file"} onChange={getImage} />
        </div>
      </Modal>
    </>
  );
}
