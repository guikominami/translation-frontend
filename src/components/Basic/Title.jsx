import Button from "./Button";
import "./Title.css";

// eslint-disable-next-line react/prop-types
export default function Title({ title, onButtonClick, buttonName }) {
  
  return (
    <div className="title">
      <h1>{title}</h1>
      <Button className="button" onClick={onButtonClick}>
        {buttonName}
      </Button>
    </div>
  );
}
