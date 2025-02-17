import { useState, useEffect } from "react";
import { fetchTranslations } from "../api/https";
import { log } from "../log";

export default function Translations(wordId) {
  const [translationsData, setTranslationsData] = useState([]);
  const [isFetching, setIsFetching] = useState();

  useEffect(() => {
    async function fetchTranslationsData() {
      log("fetch translation entered");

      setIsFetching(true);

      try {
        const translation = await fetchTranslations();
        
        setTranslationsData(
          translation
        );

        // setTranslationsData(
        //   translation.filter((translation) => word.language._id === languageId)
        // );
      } catch (error) {
        console.log("error: ", error.message);
      }
    }

    fetchTranslationsData();
  }, [wordId]);

  let content = <p>There is no translations for this word.</p>
  if (translationsData.length > 0){
    content = 
    (
      <ul>
        {translationsData.map((translation) => (
          <li key={translation._id}>{translation.words}</li>
        ))}
        <li></li>
      </ul>
    )
  }

  return (
    <>
      <div className="list-area">
        <h3>Translations</h3>
        {content}
      </div>
    </>
  );
}
