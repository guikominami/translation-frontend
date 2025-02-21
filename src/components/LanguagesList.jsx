import { useState, useEffect } from "react";
import { fetchLanguages } from "../api/languageApi";

export default function LanguagesList({isAddingLanguage, onListClick}) {
  
  const [languagesData, setLanguagesData] = useState([]);
  const [isFetching, setIsFetching] = useState();
  
  console.log("Carregou lista");
  
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

  return (
    <>
      <div
        className={!isAddingLanguage ? "div-list" : "div-list div-list-reduced"}
      >
        <ul className="list">
          {!isFetching &&
            languagesData.map((language) => (
              <li
                key={language._id}
                onClick={() => onListClick(language._id)}
              >
                {language.name} - {language.acronym.toUpperCase()}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}
