import "./LanguageItem.css";

/* eslint-disable react/prop-types */
export default function LanguageItem({ languages, onLanguageItemClick }) {
  return (
    <>
      {languages.map((item) => (
        <li
          className="item"
          key={item.id}
          onClick={() => onLanguageItemClick(item.id)}
        >
          {item.name} - {item.acronym}
        </li>
      ))}
    </>
  );
}
