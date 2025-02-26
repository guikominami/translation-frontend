export async function fetchLanguages(){
  
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