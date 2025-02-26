/* eslint-disable react/prop-types */
import LanguageItem from "./LanguageItem";
import "./LanguagesList.css";

export default function LanguagesList({languages, onRemoveLanguage}) {
  return (
    <>
      <ul className="languages">
        <LanguageItem languages={languages} onLanguageItemClick={onRemoveLanguage}/>
      </ul>
    </>
  );
}
