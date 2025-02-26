/* eslint-disable react/prop-types */
import "./ErrorBlock.css";

export default function ErrorBlock({ title, message }) {
  return (
    <div className="error-block">
      <div className="error-block-icon">!</div>
      <div>
        <h2>{title}</h2>
        <p>{message}</p>
      </div>
    </div>
  );
}
