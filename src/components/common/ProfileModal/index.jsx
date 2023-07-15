/* eslint-disable react/prop-types */
import { Modal, Button } from "antd";
import "./index.scss";

const ProfileModal = ({
  modalOpen,
  setModalOpen,
  getInput,
  updateProfileData,
  editInput,
}) => {
  return (
    <>
      <Modal
        title="Edit Intro"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={[
          <Button key="submit" type="primary" onClick={updateProfileData}>
            Save
          </Button>,
        ]}
      >
        <hr />
        <div className="modal-layout">
          <div className="modal-input-field">
            <p className="heading-text">Basic Info</p>
            <label className="modal-label">Full name *</label>
            <input
              type="text"
              className="modal-text-input"
              required
              placeholder="First Name"
              name="name"
              value={editInput.name}
              onChange={getInput}
            />
          </div>

          <div className="modal-input-field">
            <label className="modal-label">Headline *</label>
            <input
              type="text"
              className="modal-text-input"
              required
              placeholder="Headline"
              name="headline"
              value={editInput.headline}
              onChange={getInput}
            />
          </div>
          <div className="modal-input-field">
            <label className="modal-label">Company</label>
            <input
              type="text"
              className="modal-text-input"
              required
              placeholder="Ex.Google Inc"
              name="company"
              value={editInput.company}
              onChange={getInput}
            />
          </div>
          <div className="modal-input-field">
            <p className="heading-text">Current Position</p>
            <label className="modal-label">Position *</label>
            <input
              type="text"
              className="modal-text-input"
              required
              placeholder="Position"
              name="position"
              value={editInput.position}
              onChange={getInput}
            />
          </div>
          <div className="modal-input-field">
            <label className="modal-label">Industry *</label>
            <input
              type="text"
              className="modal-text-input"
              required
              placeholder="Ex.IT"
              name="industry"
              value={editInput.industry}
              onChange={getInput}
            />
          </div>
          <div className="modal-input-field">
            <p className="heading-text">Location</p>
            <label className="modal-label">Country *</label>
            <input
              type="text"
              className="modal-text-input"
              required
              placeholder="Ex.India"
              name="country"
              value={editInput.country}
              onChange={getInput}
            />
          </div>
          <div className="modal-input-field">
            <label className="modal-label">City *</label>
            <input
              type="text"
              className="modal-text-input"
              required
              placeholder="Ex.Pune"
              name="city"
              value={editInput.city}
              onChange={getInput}
            />
          </div>
          <div className="modal-input-field">
            <p className="heading-text">Education</p>
            <label className="modal-label">Collage/University</label>
            <input
              type="text"
              className="modal-text-input"
              required
              placeholder="Collage/ University"
              name="collage"
              value={editInput.collage}
              onChange={getInput}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};
export default ProfileModal;
