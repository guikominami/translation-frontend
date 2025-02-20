import { useEffect, useState, useRef } from "react";
import { fetchLanguages, addLanguage } from "../api/languageApi";

import Modal from "./Basic/Modal";
import Error from "./Error";
import Button from "./Basic/Button";
import Title from "./Basic/Title";
import Input from "./Basic/Input";

import "./Languages.css";

// eslint-disable-next-line react/prop-types
export default function Languages({ onLanguageClick }) {
  const [languagesData, setLanguagesData] = useState([]);
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();
  const [isAddingLanguage, setIsAddingLanguage] = useState(false);

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

    if (enteredLanguage.trim() === "" || enteredAcronym.trim() === "") {
      setError("Looks like you forgot to enter a value.");
      return;
    }
    
    let newLanguage = {
      name: enteredLanguage,
      acronym: enteredAcronym,
    };

    try {    
      const responseApi = await addLanguage(newLanguage);
      
      newLanguage = {
        _id: responseApi._id,
        name: enteredLanguage,
        acronym: enteredAcronym,
      };
      
      setLanguagesData((prevState) => [...prevState, newLanguage]);
      
      language.current.value = "";
      acronym.current.value = "";
      
    } catch (error) {
      setError("Failed to add language. " + error.message);
    }
  }

  function handleError() {
    setError(null);
  }
  
  function handleButtonClick(){
    setIsAddingLanguage(!isAddingLanguage)
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
        <Title
          title="Language"
          onButtonClick={handleButtonClick}
          buttonName={isAddingLanguage ? "Close" : "Add"}
        />
        {isAddingLanguage && (
          <div className="add-list">
            <Input label="New Language" ref={language} />
            <Input label="Acronym" ref={acronym} id="acronym" />
            <Button id="save" onClick={handleAddLanguage}>
              Save
            </Button>
          </div>
        )}
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
