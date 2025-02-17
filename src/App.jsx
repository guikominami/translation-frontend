import { useState } from "react";
import { log } from "./log.js";

import Languages from "./components/Languages.jsx";
import Words from "./components/Words.jsx";
import Translations from "./components/Translations.jsx";

import "./App.css";

function App() {
  log("<App /> rendered");
  const [languageId, setLanguageId] = useState();
  const [wordId, setWordId] = useState();

  function handleLanguageSelect(id) {
    log("<select language id changed /> ", id);
    setLanguageId(id);
    setWordId(undefined);
  }

  function handleWordSelect(id) {
    log("<select word id changed /> ", id);
    setWordId(id);
  }

  return (
    <section className="main-area">
      <Languages onLanguageClick={handleLanguageSelect} />
      {languageId !== undefined && (
        <Words languageId={languageId} onWordClick={handleWordSelect} />
      )}
      {languageId !== undefined && wordId !== undefined && (
        <Translations wordId={wordId} languageId={languageId}/>
      )}
    </section>
  );
}

export default App;
