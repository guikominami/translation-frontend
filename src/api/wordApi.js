export async function fetchWords(){
  const response = await fetch("http://localhost:3000/api/words");
  const responseData = await response.json();
  
  if (!response.ok){
    throw new Error ("Failed to fetch words.")
  }
  
  return responseData;
}

export async function addWord(newWord){ 
  const response = await fetch("http://localhost:3000/api/words", {
    method: "POST",
    body: JSON.stringify( newWord ),
    headers: {
      "Content-Type": "application/json",
    },
  })

  const responseData = await response.json();
  
  if (!response.ok) {
    throw new Error(responseData.error);
  }

  return responseData;  
}

// export async function updateUserPlaces(places) {
//   const response = await fetch("http://localhost:3000/user-places", {
//     method: "PUT",
//     body: JSON.stringify({ places }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   const resData = await response.json();

//   if (!response.ok) {
//     throw new Error("Failed to update user data.");
//   }

//   return resData.message;
// }