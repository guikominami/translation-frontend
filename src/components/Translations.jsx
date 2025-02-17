import { useState, useEffect } from "react";
import { fetchTranslations } from "../api/https";

// eslint-disable-next-line react/prop-types
export default function Translations({ wordId }) {
  const [translationsData, setTranslationsData] = useState([]);
  const [isFetching, setIsFetching] = useState();

  useEffect(() => {
    async function fetchTranslationsData() {
      
      setIsFetching(true);

      try {
        const translation = await fetchTranslations();
        
        var i, j
        for(i = 0; i < translation.length; i++){
          for(j = 0; j < translation[i].words.length; j++){
            if (translation[i].words[j]._id === wordId){
              setTranslationsData(translation[i].words);
            }
          }
        }
      } catch (error) {
        console.log("error: ", error.message);
      }
      setIsFetching(false);
    }

    fetchTranslationsData();
  }, [wordId]);
  
  let content = <p>There is no translations for this word.</p>
  if (translationsData.length > 0){
    content = 
    (
      <ul>
        {translationsData.map((translation) => (translation._id !== wordId &&
          <li key={translation._id}>{translation.word} - {translation.language.name}</li>
        ))}
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
