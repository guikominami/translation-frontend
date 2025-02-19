import { useState, useEffect, useRef } from "react";
import { fetchWords, addWord } from "../api/wordApi";
import "./Word.css";
import Button from "./Basic/Button";
import Title from "./Basic/Title";
import Input from "./Basic/Input";

// eslint-disable-next-line react/prop-types
export default function Words({ languageId, onWordClick }) {
  const [wordsData, setWordsData] = useState([]);
  const [isFetching, setIsFetching] = useState();
  
  const word = useRef(null);

  useEffect(() => {
    async function fetchWordsData() {
      setIsFetching(true);

      try {
        const words = await fetchWords();

        setWordsData(
          words
            .filter((word) => word.language._id === languageId)
            .sort((a, b) => a.word.localeCompare(b.word))
        );
      } catch (error) {
        console.log("error: ", error.message);
      }

      setIsFetching(false);
    }

    fetchWordsData();
  }, [languageId]);
  
  // async function addWord(){
  //   const enteredWord = word.current.value;
    
  //   console.log("enteredWord", enteredWord)
    
  //   try {
  //     await addWord(enteredWord);      
  //   } catch (error) {
  //     console.log("Error trying to add word: ", error)
  //   }
  // }

  
  function handleAddWord(){
    
  }
  
  let content = <p>There is no words for this language.</p>;
  if (wordsData.length > 0) {
    content = (
      <ul>
        {wordsData.map((word) => (
          <li key={word._id} onClick={() => onWordClick(word._id)}>
            {word.word}
          </li>
        ))}
      </ul>
    );
  }
  
  // function handleChange(event){
  //   console.log(event.target.value);
  //   word = event.target.value;
  // }

  return (
    <div className="list-area">
      <Title title="Words"></Title>
      <div className="add-list">
        <Input label="New word" ref={word}/>    
        <Button id="save" onClick={handleAddWord}>Save</Button>
      </div>
      {!isFetching && content}
    </div>
  );
}