import { useState, useEffect, useRef } from "react";
import { fetchWords, addWord } from "../api/wordApi";
import "./Words.css";
import Button from "./Basic/Button";
import Title from "./Basic/Title";
import Input from "./Basic/Input";
import Modal from "./Basic/Modal";
import Error from "./Error";

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
    
    let newWord = {
      word: enteredWord,
      languageId: languageId
    }
    
    try {
      const responseApi = await addWord(newWord);

      newWord = {
        _id: responseApi._id,
        word: enteredWord,
        languageId: languageId
      }
            
      setWordsData((prevState)=> [...prevState, newWord]);
      
      word.current.value = "";
      
    } catch (error) {
      setError("Failed to add word. " + error.message);
    }
  }

  function handleButtonClick() {
    setIsAddingWord(!isAddingWord);
  }
  
  function handleError() {
    setError(null);
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

  return (
    <>
      <Modal open={error} onClose={handleError}>
        {error && (
          <Error
            title="An error occurred!"
            message={error}
            onConfirm={handleError}
          />
        )}
      </Modal>
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
    </>
  );
}
