export async function fetchLanguages(){
  const response = await fetch("http://localhost:3000/api/languages");
  const responseData = await response.json();
  
  if (!response.ok){
    throw new Error ("Failed to fetch languages.")
  }
  
  return responseData;
}

export async function fetchWords(){
  const response = await fetch("http://localhost:3000/api/words");
  const responseData = await response.json();
  
  if (!response.ok){
    throw new Error ("Failed to fetch words.")
  }
  
  return responseData;
}

// app.use((req, res, next) => {
//   res.setHeader(); // allow all domains
//   res.setHeader('Access-Control-Allow-Methods', 'GET, PUT');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

//   next();
// });

// export async function fetchAvailablePlaces() {
//   const response = await fetch("http://localhost:3000/places");
//   const resData = await response.json();

//   if (!response.ok) {
//     throw new Error("Failed to fetch places");
//   }

//   return resData.places;
// }

// export async function fetchUserPlaces() {
//   const response = await fetch("http://localhost:3000/user-places");
//   const resData = await response.json();

//   if (!response.ok) {
//     throw new Error("Failed to fetch user places");
//   }

//   return resData.places;
// }

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
