import "./index.scss";

export default function Divider() {
  return (
    <div className="form-divider">
      <div className="form-divider-line" />
      <p className="form-divider-text">or</p>
      <div className="form-divider-line" />
    </div>
  );
}
