/* eslint-disable react/prop-types */
import "./LanguageItem.css";

export default function LanguageItem({ languages, onLanguageItemClick }) {  
  return (
    <>
      {languages.map((item) => (
        <li
          className="item"
          key={item._id}
          onClick={() => onLanguageItemClick(item._id)}
        >
          {item.name} - {item.acronym}
        </li>
      ))}
    </>
  );
}
