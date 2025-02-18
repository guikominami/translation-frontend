export async function fetchLanguages(){
  const response = await fetch("http://localhost:3000/api/languages");
  const responseData = await response.json();
  
  if (!response.ok){
    throw new Error ("Failed to fetch languages.")
  }
  
  return responseData;
}

export async function addLanguage(newLanguage){
  const response = await fetch("http://localhost:3000/api/languages", {
    method: "POST",
    body: JSON.stringify(newLanguage),
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    console.log("error", response.error)
    throw new Error("Failed to update language.");
  }

  const responseData = await response.json();
  
  console.log(responseData);
  
  return responseData;  
}