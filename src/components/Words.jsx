import { useState, useEffect } from "react";
import { fetchWords } from "../api/https";
import { log } from "../log";

// eslint-disable-next-line react/prop-types
export default function Words({ languageId, onWordClick }) {
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
      
      setIsFetching(false);
    }

    fetchWordsData();
  }, [languageId]);

  console.log(wordsData.length);

  let content = <p>There is no words for this language.</p>;
  if (wordsData.length > 0) {
    content = (
      <ul>
        {wordsData.map((word) => (
          <li 
            key={word._id} 
            onClick={() => onWordClick(word._id)}
          >
            {word.word}
          </li>
        ))}
        <li></li>
      </ul>
    );
  }

  return (
    <div className="list-area">
      <h3>Words</h3>
      {content}
    </div>
  );
}
