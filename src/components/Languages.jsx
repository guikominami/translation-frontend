import { useQuery } from "@tanstack/react-query";
import { fetchLanguages } from "../utils/https";

import LanguagesList from "../components/LanguagesList";
import NewLanguage from "../components/NewLanguage";
import ErrorBlock from "../UI/ErrorBlock";

import Language from "../models/language";

export default function Languages() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["languages"],
    queryFn: fetchLanguages,
    staleTime: 5000,
  });

  console.log(data);

  function addLanguageHandler(language) {
    // const newLanguage = new Language(language);
    // setLanguages((prevState) => {
    //   return prevState.concat(newLanguage);
    // });
  }

  function removeLanguageHandler(id) {
    // console.log(id);
    // setLanguages((prevState) => {
    //   return prevState.filter((language) => language.id !== id);
    // });
  }

  let content;

  if (isPending) {
    content = <p>Loading</p>;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occurred"
        message={error.info?.message || "Failed to fetch events."}
      />
    );
  }

  if (data) {
    content = (
      <LanguagesList
        languages={data}
        onRemoveLanguage={removeLanguageHandler}
      />
    );
  }

  return (
    <div>
      <NewLanguage onAddLanguage={addLanguageHandler} />
      {content}
    </div>
  );
}
