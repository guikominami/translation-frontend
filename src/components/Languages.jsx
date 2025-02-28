import { useQuery } from "@tanstack/react-query";
import { fetchLanguages } from "../utils/Language/https";

import LanguagesList from "../components/LanguagesList";
import NewLanguage from "../components/NewLanguage";
import ErrorBlock from "../UI/ErrorBlock";
import LoadingIndicator from "../UI/LoadingIndicator";

import "./Languages.css";

export default function Languages() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["languages"],
    queryFn: fetchLanguages,
    staleTime: 1000,
  });

  console.log(data);

  let content;

  if (isPending) {
    content = <LoadingIndicator />;
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
      />
    );
  }

  return (
    <div className="main">
      <h1>Languages</h1>
      <NewLanguage/>
      {content}
    </div>
  );
}
