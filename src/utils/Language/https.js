export async function fetchLanguages() {
  const response = await fetch("http://localhost:3000/api/languages");

  console.log("response", response);

  if (!response.ok) {
    const error = new Error("An error occurred while fetch the languages.");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const languages = await response.json();

  console.log("languages", languages);

  return languages;
}

export async function createNewLanguage(newLanguage) {
  const response = await fetch("http://localhost:3000/api/languages", {
    method: "POST",
    body: JSON.stringify(newLanguage),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = new Error("An error occurred while fetch the languages.");
    error.code = response.status;
    error.info = await response.json();
    
    console.log(error.info.error);
    
    throw error;
  }

  const language = await response.json();

  console.log("newlanguage", language);

  return language ;
}

export async function deleteLanguage(id){
  await fetch("http://localhost:3000/api/languages/" & id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}