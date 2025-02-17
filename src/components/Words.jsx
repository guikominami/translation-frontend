import { useState, useEffect } from "react";
import { fetchWords } from "../api/https";
import { log } from "../log";

export default function Words({ languageId }) {
  
  const [wordsData, setWordsData] = useState([]);
  const [isFetching, setIsFetching] = useState();
  
  useEffect(() => {
    async function fetchWordsData() {
      log("fetch words entered");

      setIsFetching(true);

      try {
        const words = await fetchWords();

        setWordsData(words.filter((word) => word.language._id === languageId));
      } catch (error) {
        console.log("error: ", error.message);
      }
    }

    fetchWordsData();
  }, [languageId]);

  console.log(wordsData.length);
  
  let content = <p>There is no words for this language.</p>
  if (wordsData.length > 0){
    content = 
    (
      <ul>
        {wordsData.map((word) => (
          <li key={word._id}>{word.word}</li>
        ))}
        <li></li>
      </ul>
    )
  }
  
  return (
    <div className="list-area">
      <h3>Words</h3>
      {content}
    </div>
  );
}
