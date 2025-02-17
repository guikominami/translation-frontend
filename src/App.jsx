import { useEffect } from "react";
import { fetchWords } from "./api/https";
import { useState } from "react";
import { log } from './log.js';

import Languages from "./components/Languages.jsx";
import Words from "./components/Words.jsx";
import Translations from "./components/Translations.jsx";

import "./App.css";

function App() {
  
  log('<App /> rendered');
  
  const [translationData, setTranslationData] = useState([]);
  const [languageId, setLanguageId] = useState();
  
  function handleLanguageSelect(id){
    log('<select id changed /> ', id);
    setLanguageId(id);
  }
  
  console.log("languageId", languageId);
  
  return (
    <section className="main-area">
      <Languages onLanguageClick={handleLanguageSelect}/>
      {languageId !== undefined && 
        <Words languageId={languageId}/>
      }
      <Translations />
    </section>
  );
}

export default App;
