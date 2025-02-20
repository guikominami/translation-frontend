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
  const [isAddingWord, setIsAddingWord] = useState();
  const [error, setError] = useState();
  
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

  async function handleAddWord(){
    const enteredWord = word.current.value;
    
    if (enteredWord.trim() === "") {
      setError("Looks like you forgot to enter a value.");
      return;
    }
    
    const newWord = {
      word: enteredWord,
      languageId: languageId
    }

    console.log("newWord", newWord)
    
    try {
      await addWord(newWord);
      setWordsData((prevState)=> [...prevState, newWord]);
    } catch (error) {
      setError("Failed to add word. " + error.message);
    }
  }

  function handleButtonClick() {
    setIsAddingWord(!isAddingWord);
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
      <Title
        title="Words"
        onButtonClick={handleButtonClick}
        buttonName={isAddingWord ? "Close" : "Add"}
      />
      {isAddingWord && (
        <div className="add-list">
          <Input label="New word" ref={word} />
          <Button id="save" onClick={handleAddWord}>
            Save
          </Button>
        </div>
      )}
      {!isFetching && content}
    </div>
  );
}
