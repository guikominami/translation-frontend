import { useEffect } from "react";
import { fetchLanguages } from "../api/https";
import { useState } from "react";
import { log } from "../log.js";

export default function Languages({ onLanguageClick }) {
  const [languagesData, setLanguagesData] = useState([]);
  const [isFetching, setIsFetching] = useState();

  useEffect(() => {
    async function fetchLanguagesData() {
      log("fetch entered");
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

  return (
    <div className="list-area">
      <h3>Language</h3>
      <ul>
        {languagesData.map((language) => (
          <li
            key={language._id}
            onClick={() => onLanguageClick(language._id)}
          >
            {language.name}
          </li>
        ))}
        <li></li>
      </ul>
    </div>
  );
}
