/* eslint-disable react/prop-types */
import { useRef } from "react";
import "./NewLanguage.css";

export default function NewLanguage({onAddLanguage}) {
  const enteredLanguage = useRef();

  function submitHandler(event) {
    event.preventDefault();
    
    const newLanguage = enteredLanguage.current.value;

    if (newLanguage.trim() === "") {
      return;
    }
    onAddLanguage(newLanguage);
  }

  return (
    <form className="form" onSubmit={submitHandler}>
      <label>Add new language</label>
      <input type="text" ref={enteredLanguage} />
      <button>Add</button>
    </form>
  );
}
