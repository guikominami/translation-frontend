import { useState, useEffect, useRef } from "react";
import { fetchTranslations } from "../api/translationApi";
import Button from "./Basic/Button";
import Title from "./Basic/Title";
import Input from "./Basic/Input";
import Modal from "./Basic/Modal";
import Error from "./Error";

// eslint-disable-next-line react/prop-types
export default function Translations({ wordId }) {
  const [translationsData, setTranslationsData] = useState([]);
  const [isFetching, setIsFetching] = useState();
  const [isAddingTranslation, setIsAddingTranslation] = useState();
  const [error, setError] = useState();
  
  const translation = useRef(null);
  
  useEffect(() => {
    async function fetchTranslationsData() {
      setIsFetching(true);

      try {
        const translation = await fetchTranslations();

        var i, j;
        for (i = 0; i < translation.length; i++) {
          for (j = 0; j < translation[i].words.length; j++) {
            if (translation[i].words[j]._id === wordId) {
              setTranslationsData(
                translation[i].words.sort((a, b) =>
                  a.word.localeCompare(b.word)
                )
              );
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
  
  function handleAddTranslation(){
    
  }
  
  function handleButtonClick() {
    setIsAddingTranslation(!isAddingTranslation);
  }
  
  function handleError() {
    setError(null);
  }

  let content = <p>There is no translations for this word.</p>;
  if (translationsData.length > 0) {
    content = (
      <ul>
        {translationsData.map(
          (translation) =>
            translation._id !== wordId && (
              <li key={translation._id}>
                {translation.word} - {translation.language.name}
              </li>
            )
        )}
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
          buttonName={isAddingTranslation ? "Close" : "Add"}
        />
        {isAddingTranslation && (
          <div className="add-list">
            <Input label="New word" ref={translation} />
            <Button id="save" onClick={handleAddTranslation}>
              Save
            </Button>
          </div>
        )}
        {!isFetching && content}
      </div>
    </>
  );
}
