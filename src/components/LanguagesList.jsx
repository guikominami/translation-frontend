/* eslint-disable react/prop-types */
import { useMutation } from "@tanstack/react-query";
import { deleteLanguage } from "../utils/Language/https";
import LanguageItem from "./LanguageItem";
import ErrorBlock from "../UI/ErrorBlock";
import "./LanguagesList.css";

export default function LanguagesList({languages}) {
  
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: deleteLanguage
  })
  
  function deleteLanguageHandler(id){
    console.log(id);
    
    mutate(id)
  }
  
  return (
    <>
      <ul className="languages">
        <LanguageItem languages={languages} onLanguageItemClick={deleteLanguageHandler}/>
      </ul>
    </>
  );
}
