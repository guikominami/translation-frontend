/* eslint-disable react/prop-types */
import "./Error.css";

export default function Error({ title, message, onConfirm }) {
  return (
    <div className="error">
      <h2>{title}</h2>
      <p>{message}</p>
      {onConfirm && (
        <div id="confirmation-actions">
          <button onClick={onConfirm} className="button">
            Ok
          </button>
        </div>
      )}
    </div>
  );
}
