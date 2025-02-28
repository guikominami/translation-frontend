/* eslint-disable react/prop-types */
import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { createNewLanguage } from "../utils/Language/https";
import "./NewLanguage.css";
import ErrorBlock from "../UI/ErrorBlock";

export default function NewLanguage() {
  const enteredLanguage = useRef();
  const enteredAcronym = useRef()

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createNewLanguage,
  });

  function handleSubmit(event) {
    event.preventDefault();

    const language = enteredLanguage.current.value;
    const acronym = enteredAcronym.current.value;
    
    if (language.trim() === "" || acronym.trim() === "") {
      return;
    }
    
    let newLanguage = {
      name: language,
      acronym: acronym,
    };

    mutate(newLanguage);
  }

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        {isPending && "Submitting..."}
        {!isPending && (
          <>
            <label>Language</label>
            <input type="text" ref={enteredLanguage} />
            <label>Acronym</label>
            <input type="text" ref={enteredAcronym}/>
            <button>Add</button>
          </>
        )}
        {isError && (
          <ErrorBlock
            title="Failed to create language."
            message={
              error.info.message ||
              "Failed to create. Please check your input and try again later."
            }
          />
        )}
      </form>
    </>
  );
}
