const endpoint = "http://localhost:1337/";

async function getAllVisitedPlaces(){
  const response = await fetch(endpoint + 'api/visits');
  return response.json();
}

export {
  getAllVisitedPlaces,
} 
  