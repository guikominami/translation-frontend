import { useEffect, useState, useRef } from "react";
import { fetchLanguages, addLanguage } from "../api/languageApi";
import Modal from "./Basic/Modal";
import Error from "./Error";
import Button from "./Basic/Button";

import "./Language.css";

// eslint-disable-next-line react/prop-types
export default function Languages({ onLanguageClick }) {
  const [languagesData, setLanguagesData] = useState([]);
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();

  const language = useRef(null);
  const acronym = useRef(null);

  useEffect(() => {
    async function fetchLanguagesData() {
      setIsFetching(true);

      try {
        const languages = await fetchLanguages();
        setLanguagesData(languages);
      } catch (error) {
        console.log("error: ", error);
      }

      setIsFetching(false);
    }

    fetchLanguagesData();
  }, []);

  async function handleAddLanguage() {
    const enteredLanguage = language.current.value;
    const enteredAcronym = acronym.current.value;

    console.log("enteredLanguage", enteredLanguage);
    console.log("enteredAcronym", enteredAcronym);

    const newLanguage = {
      name: enteredLanguage,
      acronym: enteredAcronym,
    };

    try {
      await addLanguage(newLanguage);
    } catch (error) {
      console.log(error.message);
      setError("Failed to add language. " + error.message);
    }
  }

  function handleError() {
    setError(null);
  }

  return (
    <>
      <Modal open={error} onClose={handleError}>
        {error && (
          <Error
            title="An error occurred!"
            message={error}
            onConfirm={handleError}
          />
        )}
      </Modal>
      <div className="list-area">
        <div className="title">
          <h3>Language</h3>
          <Button>Add</Button>
        </div>
        <div className="add-list">
          <input
            ref={language}
            placeholder="Language"
            
          />
          <input 
            ref={acronym} 
            placeholder="Acronym" 
            id="acronym"
          />
          <Button onClick={handleAddLanguage}>
            Save
          </Button>
        </div>
        <ul>
          {!isFetching &&
            languagesData.map((language) => (
              <li
                key={language._id}
                onClick={() => onLanguageClick(language._id)}
              >
                {language.name} - {language.acronym.toUpperCase()}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}
