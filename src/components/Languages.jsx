import { useEffect, useState, useRef } from "react";
import { fetchLanguages } from "../api/https";
import { addLanguage } from "../api/languageApi";

// eslint-disable-next-line react/prop-types
export default function Languages({ onLanguageClick }) {
  const [languagesData, setLanguagesData] = useState([]);
  const [isFetching, setIsFetching] = useState();
  
  const language = useRef(null);
  const acronym = useRef(null);
  
  useEffect(() => {
    async function fetchLanguagesData() {
      setIsFetching(true);
      
      try {
        const languages = await fetchLanguages();
        setLanguagesData(languages);
      } catch (error) {
        console.log("error: ", error.message);
      }
      
      setIsFetching(false);
    }

    fetchLanguagesData();
  }, []);
  
  async function handleAddLanguage(){
    const enteredLanguage = language.current.value;
    const enteredAcronym = acronym.current.value;
    
    console.log("enteredLanguage", enteredLanguage)
    console.log("enteredAcronym", enteredAcronym)
    
    const newLanguage = {
      name: enteredLanguage,
      acronym: enteredAcronym
    }
    
    try {
      await addLanguage(newLanguage);      
    } catch (error) {
      console.log("Error trying to add language: ", error)
    }
  }  

  return (
    <div className="list-area">
      <h3>Language</h3>
      <div>
        <input ref={language} label="add a language" />
        <input ref={acronym} label="add a acronym" />
        <button onClick={handleAddLanguage}>Save</button>
      </div>
      <ul>
        {!isFetching &&
          languagesData.map((language) => (
            <li
              key={language._id}
              onClick={() => onLanguageClick(language._id)}
            >
              {language.name}
            </li>
          ))}
      </ul>
    </div>
  );
}
