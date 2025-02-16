import { useEffect } from "react";
import { fetchLanguages, fetchWords } from "../api/https";
import { useState } from "react";
import "./MainArea.css";

export default function MainArea() {
  const [isFetching, setIsFetching] = useState();
  const [wordsData, setWordsData] = useState([]);
  const [languagesData, setLanguagesData] = useState([]);
  const [translationData, setTranslationData] = useState([]);

  useEffect(() => {
    async function fetchLanguagesData() {
      setIsFetching(true);
      try {
        const languages = await fetchLanguages();
        setLanguagesData(languages);
      } catch (error) {
        console.log("error: ", error.message);
      }
    }

    fetchLanguagesData();
  }, []);

  async function handleLanguageClick(languageId) {
    console.log(languageId);

    setIsFetching(true);
    try {
      const words = await fetchWords();
      setWordsData(words.filter((word) => word.language._id === languageId));
      
    } catch (error) {
      console.log("Error: ", error.message);
    }
    setIsFetching(false);
  }

  console.log(languagesData);
  console.log(wordsData);

  return (
    <section className="main-area">
      <div className="list-area">
        <h3>Language</h3>
        <ul>
          {languagesData.map((language) => (
            <li
              key={language._id}
              onClick={() => handleLanguageClick(language._id)}
            >
              {language.name}
            </li>
          ))}
          <li></li>
        </ul>
      </div>
      {wordsData.length > 0 && (
        <div className="list-area">
          <h3>Words</h3>
          <ul>
            {wordsData.map((word) => (
              <li key={word._id}>{word.word}</li>
              
            ))}
            <li></li>
          </ul>
        </div>
      )}
      {translationData.length > 0 && (
        <div className="list-area">
          <h3>Translations</h3>
          <ul>
            {languagesData.map((language) => (
              <li key={language._id}>{language.name}</li>
            ))}
            <li></li>
          </ul>
        </div>
      )}
    </section>
  );
}
